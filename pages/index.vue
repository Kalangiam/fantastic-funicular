<template>
  <div>
    <FormWithSocials
      v-if="showPopup"
      :popup-content="popupContent"
      @closePopup="openCloseForm"
      @on-submit="onSubmit"
    />
    <Header />
    <CallToActions @show-popup="openCloseForm" />
    <Footer />
  </div>
</template>

<script>
import { format } from "date-fns";
import HttpClient from "@deepvision/http-client";

const http = new HttpClient({
  endpoint: "https://api.hsforms.com",
  getAccessToken: () => "",
});

export default {
  components: {
    Header: () => import("~/components/Header"),
    Footer: () => import("~/components/Footer"),
    CallToActions: () => import("~/components/CallToActions.vue"),
    FormWithSocials: () => import("~/components/FormWithSocials"),
  },
  data: () => ({
    email: null,

    showPopup: false,
    popupContent: "",
    showInputsPopup: false,
    inputsPopupPage: "",
  }),

  mounted() {
    if (this.$route.query.firstName)
      localStorage.setItem("name", this.$route.query.firstName);
    if (this.$route.query.email)
      localStorage.setItem("email", this.$route.query.email);

    this.email = localStorage.getItem("email");

    if (!localStorage.activeIndex) {
      localStorage.activeIndex = 0;
    }
  },

  methods: {
    openCloseForm(item) {
      this.popupContent = item;
      this.showPopup = !this.showPopup;
    },

    async onSubmit(payload) {
      if (this.popupContent.hubspotId) {
        if (this.popupContent.id === "bibleStudy") {
          payload.bibleschools = format(new Date(), "yyyy-MM-dd HH:mm");
          await this.send(this.popupContent.hubspotId, payload);
        } else if (this.popupContent.id === "decision") {
          const { email } = payload;
          const num = localStorage.activeIndex + 1;
          try {
            await this.send(this.popupContent.hubspotId, {
              email,
              [`ubp_e_${num < 10 ? "0" : ""}${num}`]: true,
            });
          } catch (error) {
            console.error(error);
          }
        } else if (
          this.popupContent.id === "prayRequest" ||
          this.popupContent.id === "askQuestion"
        ) {
          const { email, firstName, subject, communicationMode } = payload;

          const requestType =
            this.popupContent.id === "prayRequest" ? "prayer" : "question";

          try {
            await this.send(this.popupContent.hubspotId, {
              orion_request: subject,
              firstName,
              email,
              orion_request_type: requestType,
              orion_request_language: "eng",
              orion_request_campaign: "UBP2",
              orion_request_source: "form",
              communication_mode: communicationMode,
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          try {
            await this.send(this.popupContent.hubspotId, payload);
          } catch (error) {
            console.error(error);
          }
        }
      }

      this.$emit("submit", payload);

      this.state = "success";
    },

    async send(formId, fields) {
      const response = await http.post(
        `/submissions/v3/integration/submit/4189584/${formId}`,
        {
          submittedAt: Date.now(),
          fields: [
            ...Object.entries(fields).map(([name, value]) => ({
              name: /\./u.test(name) ? name : name.toLowerCase(),
              value,
            })),
            {
              name: "TICKET.partner",
              value: "AWR Evangelism",
            },
          ],
          context: {
            hutk: this.getCookie("hubspotutk"),
            pageUri: this.$route.fullPath,
            pageName: "awr-zoom",
          },
          skipValidation: true,
        }
      );

      return response;
    },

    getCookie(cname) {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  },
};
</script>
