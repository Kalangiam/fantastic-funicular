<template>
  <div>
    <PopupVideo v-if="showVideo" @closePopup="openClosePopup" />
    <InputsPopup
      v-if="showInputsPopup"
      :translate-lang="translateLang.translation"
      :page="inputsPopupPage"
      @closePopup="openCloseInputsPopup"
    />
    <FormWithSocials
      v-if="showPopup"
      :translate-lang="translateLang.translation"
      :popup-content="popupContent"
      @closePopup="openCloseForm"
      @on-submit="onSubmit"
    />
    <Header
      :translate-lang="translateLang.translation"
      @scrollToGroups="scrollToGroups"
      @changeLang="getTranslation"
      @openVideo="openClosePopup"
    />
    <RequestCoach
      :translate-lang="translateLang.translation"
      @openPopup="openCloseInputsPopup"
    />
    <CallToActions
      :translate-lang="translateLang.translation"
      @show-popup="openCloseForm"
    />
    <Benefits :translate-lang="translateLang.translation" />
    <RegisterItems
      :groups-list="groupsList"
      :participant-groups="participantGroups.groupIds"
      :scroll="scroll"
      :translate-lang="translateLang.translation"
      @scrollFalse="scrollToGroups"
    />
    <Footer :translate-lang="translateLang.translation" />
  </div>
</template>

<script>
import moment from "moment";
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
    Benefits: () => import("~/components/Benefits"),
    RegisterItems: () => import("~/components/RegisterItems"),
    PopupVideo: () => import("~/components/PopupVideo"),
    CallToActions: () => import("~/components/CallToActions.vue"),
    FormWithSocials: () => import("~/components/FormWithSocials"),
    RequestCoach: () => import("~/components/RequestCoach"),
    InputsPopup: () => import("~/components/InputsPopup"),
  },
  data: () => ({
    scroll: false,
    showVideo: false,
    email: null,
    participantGroups: [],

    groupsListLang: null,
    groupsList: {
      groups: [],
    },

    translateLang: [],
    showPopup: false,
    popupContent: "",
    showInputsPopup: false,
    inputsPopupPage: "",
  }),

  async mounted() {
    await this.getTranslation();
    await this.getGroupsList();

    if (this.$route.query.firstName)
      localStorage.setItem("name", this.$route.query.firstName);
    if (this.$route.query.email)
      localStorage.setItem("email", this.$route.query.email);

    this.email = localStorage.getItem("email");
    if (this.email) await this.getParticipantGroups();

    if (!localStorage.activeIndex) {
      localStorage.activeIndex = 0;
    }
  },

  methods: {
    openClosePopup() {
      this.showVideo = !this.showVideo;
    },
    openCloseInputsPopup(val) {
      if (val) this.inputsPopupPage = val;
      this.showInputsPopup = !this.showInputsPopup;
    },
    openCloseForm(item) {
      this.popupContent = item;
      this.showPopup = !this.showPopup;
    },
    changeLang(lang) {
      this.$axios
        .$post(this.$config.orionApiEndpoint, {
          cmd: "getGroups",
          language: lang,
          token: this.$config.orionApiClientSecret,
        })
        .then((res) => {
          this.translatedLang = res.translate;
        });
    },

    async getTranslation(lang) {
      let langCode;
      lang
        ? (langCode = lang)
        : (langCode = localStorage.getItem("lang") || "eng");
      this.translateLang = await this.$axios.$post(
        this.$config.orionApiEndpoint,
        {
          cmd: "getLanguageTranslation",
          language: langCode,
          token: this.$config.orionApiClientSecret,
        }
      );
      await this.getGroupsList();
    },
    async getGroupsList() {
      this.groupsList = await this.$axios.$post(this.$config.orionApiEndpoint, {
        cmd: "getGroups",
        language: localStorage.getItem("lang") || "eng",
        utcOffset: moment.parseZone().local().format("Z"),
        token: this.$config.orionApiClientSecret,
      });
    },
    async getParticipantGroups() {
      this.participantGroups = await this.$axios.$post(
        this.$config.orionApiEndpoint,
        {
          cmd: "getParticipant",
          email: this.email,
          token: this.$config.orionApiClientSecret,
        }
      );
    },

    scrollToGroups() {
      this.scroll = !this.scroll;
    },

    async onSubmit(payload) {
      if (this.popupContent.hubspotId) {
        if (this.popupContent.id === "bibleStudy") {
          payload.bibleschools = format(new Date(), "yyyy-MM-dd HH:mm");
          try {
            await this.send(this.popupContent.hubspotId, payload);
          } catch (error) {
            console.error(error);
          }
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

          const languageCode = localStorage.lang === "spa" ? "spa" : "eng";

          try {
            await this.send(this.popupContent.hubspotId, {
              orion_request: subject,
              firstName,
              email,
              orion_request_type: requestType,
              orion_request_language: languageCode,
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
