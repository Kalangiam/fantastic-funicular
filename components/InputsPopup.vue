<template>
  <div ref="inputs_popup" class="InputsPopup">
    <div class="InputsPopup__window" @click="closePopup">
      <div class="InputsPopup__close"></div>
    </div>
    <div class="InputsPopup__wrap">
      <template v-if="popup === 'reg'">
        <div class="InputsPopup__Title">
          <p>Request Baptismal Coach</p>
        </div>
        <div class="InputsPopup__about">
          <p>Still have questions or doubts before Baptism?</p>
          <p>Request a Baptismal Coach to help you!</p>
        </div>
        <div class="RequestCoach__Inputs">
          <input
            v-model="name"
            class="form__input"
            placeholder="Please enter your name"
            @keydown.enter.prevent="onRegister"
          />
          <input
            v-model="email"
            class="form__input"
            :class="{ isValid: !isValid }"
            placeholder="Please enter a valid email"
            @blur="checkForm"
            @keydown.enter.prevent="onRegister"
          />
          <span
            v-if="!isValid"
            class="not__valid"
            :class="{ notValid: !isValid }"
          >
            Please enter a valid email address
          </span>
        </div>
        <div class="InputsPopup_button">
          <a @click="onRegister">Submit</a>
        </div>
      </template>
      <template v-if="popup === 'success'">
        <div class="InputsPopup__Title">
          <p>Thank you for your request</p>
        </div>
        <div class="InputsPopup__icon">
          <img
            src="../assets/svg/successfully-reg.svg"
            alt="You have successfully registered for this group!"
          />
        </div>
        <div></div>
        <div class="InputsPopup_success-button">
          <a @click="closePopup">Okay</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputsPopup",

  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
    page: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    name: "",
    email: "",
    isValid: true,
    popup: "",
  }),

  created() {
    this.popup = this.page;
  },

  methods: {
    checkForm() {
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    },

    async onRegister() {
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.isValid) return;

      localStorage.name = this.name;
      localStorage.email = this.email;

      this.isRegister = await this.$axios.$post(this.$config.orionApiEndpoint, {
        cmd: "requestCoach",
        firstname: this.name,
        email: this.email,
        token: this.$config.orionApiClientSecret,
      });
      this.popup = "success";
    },

    closePopup() {
      this.$refs.inputs_popup.classList.add("InputsPopup--close");
      setTimeout(this.q, 400);
    },

    q() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.InputsPopup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}
.InputsPopup__window {
  width: 100%;
  height: 100vh;
  z-index: 1;
}
.InputsPopup--close {
  opacity: 0;
}
.InputsPopup__close {
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
.InputsPopup__close:hover {
  background: rgba(246, 247, 251, 0.4);
}
.InputsPopup__close::after {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #db4150;
  border-radius: 3px;
}
.InputsPopup__close::before {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: #db4150;
  border-radius: 3px;
}

.InputsPopup__wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 60%;
  height: 400px;
  overflow: auto;
  border-radius: 60px;
  text-align: center;
  padding: 20px;
  display: grid;
  grid-template-rows: auto 1fr 1fr 50px;
}
.InputsPopup__Title {
  margin: 20px 0;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  color: #0267b5;
  @apply font-light;
}
.InputsPopup__about {
  font-family: Roboto;
  opacity: 0.6;
  font-size: 15px;
  line-height: 23px;
  @apply mb-5 text-black;
}
.RequestCoach__Inputs {
  width: 50%;
  margin: 0 auto 20px;
}
.form__input {
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
.form__input::placeholder {
  font-family: Roboto;
  font-size: 15px;
  line-height: 24px;
  color: #000;
  opacity: 0.4;
}
.form__input:focus {
  border: 1px solid rgba(15, 70, 193, 0.26);
  border-radius: 32px;
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
.InputsPopup_button a {
  background: #fff;
  border: 1px dashed #db4150;
  border-radius: 20px;
  padding: 5px 20px;
  color: #db4150;
  transition: all 0.4s;
  cursor: pointer;

  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  outline: none;
}
.InputsPopup_button a:hover {
  border: 1px solid #db4150;
}
.InputsPopup_button a:active {
  color: #fff;
  background: #db4150;
}
.InputsPopup__icon img {
  margin: 20px auto;
}
.InputsPopup_success-button a {
  background: #fff;
  border: 1px dashed #db4150;
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
  color: #db4150;
  outline: none;
}
.InputsPopup_success-button a:hover {
  border: 1px solid #db4150;
}
.InputsPopup_success-button a:active {
  color: #fff;
  background: #db4150;
}

@media (max-width: 800px) {
  .RequestCoach__Inputs {
    width: 70%;
  }
  .InputsPopup__Title {
    font-size: 35px;
  }
}

@media (max-width: 700px) {
  .InputsPopup__wrap {
    width: 80%;
  }
  .InputsPopup__Title {
    font-size: 30px;
  }
}

@media (max-width: 400px) {
  .InputsPopup__wrap {
    width: 80%;
  }
  .InputsPopup__Title {
    font-size: 20px;
  }
}
</style>
