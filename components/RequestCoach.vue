<template>
  <div class="RequestCoach">
    <div class="RequestCoach__image">
      <img src="../assets/requestCoach.jpg" alt="Coach" />
    </div>
    <div class="RequestCoach__description">
      <div class="RequestCoach__title">Request Baptismal Coach</div>
      <div class="RequestCoach__about">
        <p>Still have questions or doubts before Baptism?</p>
        <p>Request a Baptismal Coach to help you!</p>
      </div>
    </div>
    <div class="RequestCoach__button">
      <a @click="openCoach">Request</a>
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
  grid-column: 2 / 12;
  height: 166px;
  background: #fff;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
}
.RequestCoach__image {
  min-width: 300px;
}
.RequestCoach__image img {
  border-radius: 0 70px 112px 0;
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
}
.RequestCoach__title {
  opacity: 1;
  font-family: Kanit;
  font-weight: 300;
  font-size: 40px;
  line-height: 44px;
  color: #0267b5;
  margin-bottom: 10px;
}
.RequestCoach__button {
  margin-right: 30px;
  white-space: nowrap;
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
  border: 1px dashed #db4150;
  border-radius: 20px;
  padding: 10px 25px;
  color: #db4150;
  transition: all 0.4s;
  cursor: pointer;
  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
}
.RequestCoach__button a:hover {
  border: 1px solid #db4150;
}
.RequestCoach__button a:active {
  color: #fff;
  background: #db4150;
}

@media (max-width: 950px) {
  .RequestCoach {
    grid-column: 4 / 10;
    height: auto;
    flex-direction: column;
  }

  .RequestCoach__title {
    margin-bottom: 30px;
  }

  .RequestCoach__image {
    width: 100%;
    order: 3;
    text-align: right;
  }
  .RequestCoach__image img {
    display: inline-block;
    height: 300px;
    width: auto;
    max-height: 1000px;
    border-radius: 80% 0 0 0;
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
  .RequestCoach {
    grid-column: 3 / 11;
  }
}
@media (max-width: 650px) {
  .RequestCoach__image img {
    height: auto;
    width: 100%;
    max-height: 1000px;
  }
}

@media (max-width: 500px) {
  .RequestCoach {
    grid-column: 2 / 12;
  }
}

.isValid {
  color: #f79483;
  border: 1px solid #f79483;
}
</style>
