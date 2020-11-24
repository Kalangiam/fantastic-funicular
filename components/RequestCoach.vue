<template>
  <div class="RequestCoach">
    <div class="RequestCoach__wrap">
      <div class="RequestCoach__item">
        <div class="RequestCoach__image">
          <img src="../assets/requestCoach.jpg" alt="Coach" />
        </div>
        <div class="RequestCoach__description">
          <div class="RequestCoach__Title">
            {{ getContent("request_coach.request_baptismal_coach") }}
          </div>
          <div class="RequestCoach__about">
            <p>{{ getContent("request_coach.still_have_questions") }}</p>
            <p>{{ getContent("request_coach.baptismal_coach_help_you") }}</p>
          </div>
        </div>
        <div class="RequestCoach__button">
          <a @click="openCoach">{{ getContent("request_coach.coach_me") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isRegister: false,
    isLarge: false,
    name: "",
    email: "",
    isValid: true,
  }),
  methods: {
    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : key;
    },
    openCoach() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");

      if (this.name && this.email) {
        this.$emit("openPopup", "success");
        this.onRegister();
      } else {
        this.$emit("openPopup", "reg");
      }
    },

    async onRegister() {
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.isValid) return;

      this.isRegister = await this.$axios.$post(this.$config.orionApiEndpoint, {
        cmd: "requestCoach",
        firstname: this.name,
        email: this.email,
        token: this.$config.orionApiClientSecret,
      });

      localStorage.setItem("name", this.name);
      localStorage.setItem("email", this.email);
    },
  },
};
</script>

<style scoped>
.RequestCoach {
  padding-top: 70px;
}
.RequestCoach__wrap {
  max-width: 1140px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
}
.RequestCoach__item {
  grid-column: 2 / 12;
  height: 166px;
  background: #fff;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
}
.RequestCoach__image {
  min-width: 300px;
}
.RequestCoach__image img {
  border-radius: 0 80px 90px 0;
  height: 166px;
}
.RequestCoach__description {
  padding: 0 20px;
  width: 100%;
}
.RequestCoach__about p {
  font-family: Roboto;
  font-size: 15px;
  line-height: 21px;
  color: #000000;
  opacity: 0.6;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.RequestCoach__Title {
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Kanit;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 2;
  color: #0f46c1;
}
.RequestCoach__button {
  margin-right: 30px;
}

.RequestCoach__Inputs {
  display: flex;
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

.RequestCoach__button a {
  border: 1px dashed #0f46c1;
  border-radius: 20px;
  padding: 10px 25px;
  color: #0f46c1;
  transition: all 0.4s;
  cursor: pointer;
}
.RequestCoach__button a:hover {
  border: 1px solid #0f46c1;
}
.RequestCoach__button a:active {
  color: #fff;
  background: #0f46c1;
}

@media (max-width: 950px) {
  .RequestCoach__item {
    grid-column: 4 / 10;
    height: auto;
    flex-direction: column;
  }

  .RequestCoach__image {
    width: 100%;
    order: 3;
  }
  .RequestCoach__image img {
    border-radius: 0 80px 0 0;
    height: 166px;
    width: auto;
    max-height: 200px;
  }

  .RequestCoach__description {
    margin: 20px;
    padding: 10px 30px;
  }
  .RequestCoach__button {
    margin: 30px 0;
    width: 100%;
    padding-left: 30px;
  }
  .RequestCoach__Inputs {
    width: 100%;
    padding: 0 20px;
    flex-direction: column;
  }
}

@media (max-width: 780px) {
  .RequestCoach__item {
    grid-column: 3 / 11;
  }
}

@media (max-width: 500px) {
  .RequestCoach__item {
    grid-column: 2 / 12;
  }
  .RequestCoach__image img {
    border-radius: 50% 50% 0 0;
    width: 100%;
  }
}

.RequestCoach__LargeItem {
  grid-column: 2 / 12;
  height: 366px;
  background: #fff;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
}

.isValid {
  color: #f79483;
  border: 1px solid #f79483;
}
</style>
