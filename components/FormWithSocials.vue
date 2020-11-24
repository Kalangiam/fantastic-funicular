<template>
  <div ref="popup_pray" class="FormWithSocials">
    <div class="FormWithSocials__window" @click="closePopup">
      <div class="FormWithSocials__close"></div>
    </div>
    <div class="FormWithSocials__modal">
      <div class="FormWithSocials__wrap">
        <template v-if="!isSuccess">
          <div class="FormWithSocials__title">
            {{ getContent(popupContent.title) }}
          </div>
          <div class="FormWithSocials__description">
            {{ getContent(popupContent.desc) }}
          </div>
          <div id="registration" class="FormWithSocials__register">
            <template v-if="state === 'request'">
              <div class="form-group">
                <textarea
                  id="textarea"
                  v-model.trim="subject"
                  name="textarea"
                  class="input_textarea"
                  :class="{ 'input__has-error': !isInputValid }"
                  rows="3"
                  max-rows="3"
                  :placeholder="getContent(popupContent.placeholder)"
                  @blur="
                    subject ? (isInputValid = true) : (isInputValid = false)
                  "
                ></textarea>
                <div v-if="!isInputValid" class="error-message">
                  {{ getContent(popupContent.placeholder) }}
                </div>
              </div>

              <div class="top__button">
                <a @click="onNext">
                  {{ getContent(popupContent.btnText) }}
                </a>
              </div>
            </template>

            <template v-else-if="state === 'send'">
              <div v-show="!isRegistered" class="form-group">
                <input
                  v-model.trim="firstName"
                  class="input"
                  :placeholder="
                    getContent('main.groups.registration.input.name_plac')
                  "
                  @keyup.enter="onSubmit"
                />
                <input
                  v-model.trim="email"
                  class="input"
                  :class="{ isValid: !isValid }"
                  :placeholder="
                    getContent('main.groups.registration.input.email_pla')
                  "
                  @blur="checkForm"
                  @keydown.enter.prevent="onSubmit"
                />
                <span
                  v-if="!isValid"
                  class="not__valid"
                  :class="{ notValid: !isValid }"
                >
                  {{ getContent("main.groups.registration.input.not_valid") }}
                </span>
              </div>

              <socials
                :items="socials"
                :description="popupContent.question"
                :value.sync="messengerType"
                :translate-lang="translateLang"
              />
              <div class="top__button" @click="onSubmit">
                <a>
                  {{ getContent("action-popup.recieve.btn") }}
                  {{ getContent(activeSocial.title) }}
                </a>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div v-if="isSuccess" class="FormWithSocials__is-success">
            <img
              src="../assets/svg/successfully-reg.svg"
              alt="You have successfully registered for this group!"
            />
            <div class="FormWithSocials__title">
              <p>{{ getContent("action-popup.success") }}</p>
            </div>
            <div class="FormWithSocial__button">
              <a @click="closePopup">
                {{ getContent("form_with_socials.okay") }}
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from "./Socials.vue";

export default {
  components: {
    Socials,
  },

  props: {
    popupContent: {
      type: Object,
      default: () => ({}),
    },
    translateLang: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      state: "request",
      isRegistered: false,
      firstName: "",
      email: "",
      subject: "",
      agreed: true,
      messengerType: "email",
      countryCode: "",
      activeSocial: {
        id: "email",
        title: "Email",
        icon: "email",
        activeIcon: "email-active",
      },
      isInputValid: true,
      isSuccess: false,
      isValid: true,
    };
  },

  computed: {
    errorTextMessage() {
      if (this.popupContent.type === "pray") {
        return this.getContent("registration.error.pray");
      } else if (this.popupContent.type === "question") {
        return this.getContent("registration.error.question");
      }

      return this.getContent("registration.error.request");
    },

    socials() {
      const collection = [
        {
          id: "email",
          title: "Email",
          icon: "email",
          activeIcon: "email-active",
        },
        {
          id: "whatsApp",
          title: "WhatsApp",
          icon: "whatsApp",
          activeIcon: "whatsApp-active",
          url: "https://api.whatsapp.com/send?phone=19498607007&text=",
        },
        {
          id: "messanger",
          title: "Messenger",
          icon: "fb-messanger",
          activeIcon: "fb-messanger-active",
          url: "http://m.me/Inspire360Now?message=1111",
        },
        {
          id: "viber",
          title: "Viber",
          icon: "viber",
          activeIcon: "viber-active",
          url: "viber://pa?chatURI=Inspire360Now&text=",
        },
        {
          id: "telegram",
          title: "Telegram",
          icon: "telegram",
          activeIcon: "telegram-active",
          url: "https://t.me/r360bot/?text=",
        },
      ];

      if (this.countryCode === "US" || this.countryCode === "CA") {
        collection.splice(1, 0, {
          id: "sms",
          title: "SMS",
          icon: "sms",
          activeIcon: "sms-active",
          url: "sms:+1(949)8607007",
        });
      }

      return collection;
    },
  },

  watch: {
    messengerType(value) {
      const social = this.socials.find((social) => social.id === value);
      if (social && social.id) {
        this.activeSocial = social;
      }
    },
  },

  mounted() {
    if (localStorage.getItem("name") && localStorage.getItem("email")) {
      this.isRegistered = true;
    }
  },

  methods: {
    checkForm() {
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    },

    async onNext() {
      if (!this.isInputValid) return;
      try {
        const text = await (
          await fetch("https://www.cloudflare.com/cdn-cgi/trace")
        ).text();

        let data = text.replace(/[\r\n]+/gu, '","').replace(/[=]+/gu, '":"');
        data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
        const jsondata = JSON.parse(data);
        this.countryCode = jsondata.loc;
      } catch (e) {
        console.error(e);
      }

      this.state = "send";
    },

    onSubmit() {
      if (!this.name) this.name = localStorage.name;
      if (!this.email) this.email = localStorage.email;
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.isValid) return;

      const fullName = this.isRegistered ? localStorage.name : this.firstName;
      const email = this.isRegistered ? localStorage.email : this.email;

      let languageCode = "eng";
      const lang = localStorage.lang;
      if (lang === "spa") {
        languageCode = "spa";
      }

      let requestType = "";
      if (this.popupContent.type === "pray") {
        requestType = "prayer";
      } else if (this.popupContent.type === "question") {
        requestType = "question";
      }

      const payload = {
        firstName: fullName,
        email,
        subject: this.subject,
        communicationMode: this.activeSocial.title,
      };

      this.$emit("on-submit", payload);

      if (this.messengerType !== "email") {
        let { url } = this.activeSocial;
        if (this.activeSocial.id !== "sms") {
          const query = `{request:${requestType}} {name:${fullName}} {lang:${languageCode}} {campaign:ubp2}{email: ${email}}`; //eslint-disable-line
          url = `${url}${this.subject} ${query}`;
        }
        window.open(url, "_blank");
      }

      if (!this.isRegistered) {
        localStorage.setItem("name", this.firstName);
        localStorage.setItem("email", this.email);
      }

      this.isSuccess = true;
    },

    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : key;
    },

    closePopup() {
      this.$refs.popup_pray.classList.add("FormWithSocials--close");
      setTimeout(this.q, 400);
    },

    q() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.FormWithSocials {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}

.FormWithSocials__window {
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.FormWithSocials__modal {
  max-height: 70%;
  overflow: auto;
  width: 60%;
  position: relative;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: #f8f8ff;
  padding: 20px;
  border-radius: 60px;
  text-align: center;
}

.FormWithSocials__register {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin: 0 auto 20px;
  width: 60%;
  max-width: 370px;
}

.FormWithSocials__wrap {
  margin: 0 auto;
  width: 100%;
}

.FormWithSocials__title {
  margin: 20px 0;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  color: #0f46c1;
  @apply font-light;
}

.FormWithSocials__description {
  font-family: Roboto;
  opacity: 0.6;
  font-size: 15px;
  line-height: 23px;
  @apply mb-5 text-black;
}

.input_textarea {
  height: auto;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgba(234, 238, 247, 0.6);
  color: rgba(0, 0, 0, 0.6) !important;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  padding: 17px 21px;
  outline: 0 !important;
}
.input_textarea:focus {
  border: 1px solid rgba(15, 70, 193, 0.26);
}
.input {
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 32px;
  background-color: rgba(234, 238, 247, 0.6);
  outline: none;
  font-family: Roboto;
  font-size: 15px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
  caret-color: #0f46c1;
}
.input::placeholder,
.input_textarea::placeholder {
  font-family: Roboto;
  font-size: 15px;
  line-height: 24px;
  color: #000;
  opacity: 0.4;
}
.input:focus {
  border: 1px solid rgba(15, 70, 193, 0.26);
  border-radius: 32px;
}
.input__has-error {
  color: #f79483;
  border: 1px solid #f79483;
}
.error-message {
  color: #f79483;
  text-align: left;
  font-size: 13px;
}

.top__button {
  margin: 30px 0;
}
.top__button a {
  cursor: pointer;
  padding: 15px 30px;
  color: #fff;
  background: #0099ff;
  border: none;
  border-radius: 32px;
  box-sizing: border-box;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}
.top__button a:focus {
  outline: none;
}
.top__button a:hover {
  background: #0f46c1;
}
.top__button a:active {
  background: #feabb3;
}

.FormWithSocials--close {
  opacity: 0;
}
.FormWithSocials__close {
  width: 50px;
  height: 50px;
  background: #f6f7fb;
  position: absolute;
  top: 20px;
  right: 30px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.FormWithSocials__close:hover {
  background: rgba(246, 247, 251, 0.4);
}
.FormWithSocials__close::after {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #0f46c1;
  border-radius: 3px;
}
.FormWithSocials__close::before {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: #0f46c1;
  border-radius: 3px;
}

.FormWithSocials__is-success {
  display: flex;
  flex-direction: column;
}
.FormWithSocials__is-success .FormWithSocials__title {
  width: 90%;
  margin: 20px auto;
}
.FormWithSocial__button {
  margin: 50px 0 20px;
}
.FormWithSocial__button a {
  background: #fff;
  border: 1px dashed #0f46c1;
  border-radius: 20px;
  padding: 5px 20px;
  color: #0f46c1;
  transition: all 0.4s;
  cursor: pointer;

  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #0f46c1;
  outline: none;
}
.FormWithSocial__button a:hover {
  border: 1px solid #0f46c1;
}
.FormWithSocial__button a:active {
  color: #fff;
  background: #0f46c1;
}

@media (max-width: 800px) {
  .FormWithSocials__title {
    font-size: 35px;
  }
  .form-group {
    width: 70%;
  }
}

@media (max-width: 700px) {
  .FormWithSocials__modal {
    width: 85%;
  }
  .FormWithSocials__title {
    font-size: 30px;
  }
  .form-group {
    width: 75%;
  }
}

@media (max-width: 550px) {
  .FormWithSocials__modal {
    width: 90%;
  }
  .form-group {
    width: 80%;
  }
}

@media (max-width: 400px) {
  .FormWithSocials__modal {
    width: 100%;
  }
  .FormWithSocials__title {
    font-size: 20px;
  }
  .form-group {
    width: 90%;
  }
}
.isValid {
  color: #f79483;
  border: 1px solid #f79483;
}
.notValid {
  display: block;
  color: #f79483;
  font-size: 10px;
  text-align: left;
  margin-top: -20px;
}
</style>
