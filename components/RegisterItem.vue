<template>
  <div class="item__block">
    <div class="item" :class="{ itemLarge }">
      <div class="item__wrap">
        <div class="item__about">
          <div class="item__time">
            <div class="group-clock" :class="{ morning, afternoon, evening }">
              <GroupClock
                :morning="morning"
                :afternoon="afternoon"
                :evening="evening"
                :start-time="group.startTime"
              />
            </div>
            <div class="time__date">
              <div v-if="group.schedule" class="day_every">
                <span>Every {{ group.schedule }}</span>
              </div>
              <div class="date__hours">{{ getHour(group.startTime) }}</div>
              <div class="date__time">
                <span>{{ getMonthDay(group["startDate"]) }}</span> -
                <span>{{ getMonthDay(group["stopDate"]) }}</span>
              </div>
            </div>
          </div>
          <div class="item__description">
            <div class="description__title">
              {{ group.name }}
            </div>
            <div class="description__content">
              {{ group.description }}
            </div>
            <div class="description__button">
              <span @click="openGroup">{{
                itemLarge
                  ? getContent("main.groups.buttons.less")
                  : getContent("main.groups.buttons.more")
              }}</span>
            </div>
          </div>
        </div>
        <div class="item__enroll">
          <form
            v-if="itemLarge && !isRegister"
            class="enroll__form"
            @submit.prevent="onRegister"
          >
            <div class="form__title">
              {{ getContent("main.groups.registration.title") }}
            </div>
            <input
              v-model="name"
              class="form__input input__name"
              :placeholder="
                getContent('main.groups.registration.input.name_plac')
              "
              @keydown.enter.prevent="onRegister"
            />
            <input
              v-model="email"
              class="form__input input__email"
              :class="{ isValid: !isValid }"
              :placeholder="
                getContent('main.groups.registration.input.email_pla')
              "
              @blur="isValid = true"
              @keydown.enter.prevent="onRegister"
            />
            <span class="not__valid" :class="{ notValid: !isValid }">
              {{ getContent("main.groups.registration.input.not_valid") }}
            </span>
            <div class="reg__button">
              <button type="submit">
                {{ getContent("main.groups.registration.button_text") }}
              </button>
            </div>
          </form>
          <div v-if="!itemLarge" class="enroll__button">
            <a v-if="!isRegister" class="btn__enroll" @click="enrollNow">
              <span>{{ getContent("main.groups.buttons.enroll") }}</span>
            </a>
            <a
              v-if="isRegister"
              class="btn__zoom"
              :href="group.locator"
              target="_blank"
            >
              <img src="../assets/svg/zoom-icon.svg" alt="zoom" />
              <span>{{ getContent("main.groups.buttons.zoom") }}</span>
            </a>
          </div>
          <div v-if="itemLarge && isRegister" class="item__enroll-is-register">
            <div class="item__enroll-is-register__icon">
              <img
                src="../assets/svg/successfully-reg.svg"
                alt="You have successfully registered for this group!"
              />
            </div>
            <div class="item__enroll-is-register__text">
              <p>{{ getContent("main.groups.register_succ.title") }}</p>
            </div>
            <a
              v-if="isRegister"
              class="btn__zoom_is_reg"
              :href="group.locator"
              target="_blank"
            >
              <img src="../assets/svg/zoom-icon.svg" alt="zoom" />
              <span>{{ getContent("main.groups.buttons.zoom") }}</span>
            </a>
            <div class="item__enroll-is-register__button">
              <button @click="onUnregister">
                {{ getContent("main.groups.register_succ.button_text") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!itemLarge && isRegister" class="item_is_register"></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "RegisterItem",
  components: {
    GroupClock: () => import("@/components/GroupClock"),
  },

  props: {
    morning: {
      type: Boolean,
    },
    afternoon: {
      type: Boolean,
    },
    evening: {
      type: Boolean,
    },
    group: {
      type: Object,
      default: () => ({}),
    },
    participantGroups: {
      type: Array,
      default: () => [],
    },
    translateLang: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    itemLarge: false,
    description: null,
    name: null,
    email: null,
    isValid: true,
    isRegister: false,
  }),

  computed: {
    utc() {
      return moment.parseZone().local().format("Z");
    },
  },
  watch: {
    participantGroups(val) {
      val.forEach((item) => {
        if (item === this.group.id) this.isRegister = true;
      });
    },
  },
  methods: {
    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : "";
    },

    openGroup() {
      this.itemLarge = !this.itemLarge;
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
    },

    enrollNow() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");

      if (this.name && this.email) {
        this.onRegister();
      } else {
        this.itemLarge = !this.itemLarge;
      }
    },

    getHour(date) {
      return moment(date, "YYYY-MM-DD hh:mm:ss").format("LT");
    },

    getMonthDay(date) {
      return moment(date, "YYYY-MM-DD").format("MMMM D");
    },

    async onRegister() {
      if (!this.email) {
        this.isValid = false;
        return;
      }
      this.isValid = this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.isValid) return;

      this.isRegister = await this.$axios.$post(this.$config.orionApiEndpoint, {
        cmd: "registerParticipant",
        groupId: this.group.id,
        utcOffset: this.utc,
        firstname: this.name,
        email: this.email,
        token: this.$config.orionApiClientSecret,
      });

      localStorage.setItem("name", this.name);
      localStorage.setItem("email", this.email);
    },
    async onUnregister() {
      this.isRegister = await this.$axios.$post(this.$config.orionApiEndpoint, {
        cmd: "unregisterParticipant",
        groupId: this.group.id,
        email: this.email,
        token: this.$config.orionApiClientSecret,
      });
      this.itemLarge = false;
      this.isRegister = false;
    },
  },
};
</script>

<style scoped>
.item__block {
  position: relative;
}
.item {
  overflow: hidden;
  transition: all 0.3s;
  height: 120px;
  background: #fff;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.03);
  border-radius: 60px;
  grid-column: 2 / 12;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 20px;
}
.item_is_register {
  background: url("../assets/svg/group-is-reg.svg");
  top: 0;
  right: 0;
  position: absolute;
  width: 31px;
  height: 31px;
}
.item__wrap {
  grid-column: 1 / 11;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 5px;
  text-align: left;
}
.item .item__about {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
.item .item__time {
  max-width: 380px;
  width: 100%;
  grid-column: 1 / 5;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
.item .group-clock {
  grid-column: 1 / 5;
  border-radius: 60px;
  margin: 5px;
  width: 110px;
  height: 110px;
  transition: all 0.3s ease-in-out;
}
.item .time__clock {
  grid-column: 1 / 5;
  width: 110px;
  height: 110px;
  opacity: 0.6;
  border-radius: 50%;
  margin: 5px;
}
.item .time__date {
  grid-column: 5 / 11;
  margin-top: 7%;
}
.day_every {
  width: min-content;
  padding: 2px 10px;
  background: rgba(15, 70, 193, 0.1);
  border-radius: 12px;
  display: grid;
  margin-bottom: 2px;
}
.day_every span {
  font-family: Kanit;
  font-style: normal;
  font-weight: normal;
  font-size: 13.5px;
  line-height: 19px;
  text-align: center;
  color: #0f46c1;
  white-space: nowrap;
}
.item .date__hours {
  font-family: Kanit;
  font-weight: 300;
  font-size: 40px;
  line-height: 44px;
  color: #0f46c1;
  text-transform: lowercase;
}
.item .date__time {
  font-family: Kanit;
  font-weight: normal;
  font-size: 17px;
  line-height: 25px;
  color: #000;
  opacity: 0.6;
  margin-right: 10px;
}
.item .date__time span {
  width: max-content;
  display: inline-block;
}
.item .item__description {
  grid-column: 5 / 9;
  display: grid;
  grid-template-rows: 32px 21px 20px;
  padding-top: 20px;
}
.item .description__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Kanit;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 31px;
  color: #0f46c1;
}
.item .description__content {
  font-family: Roboto;
  font-size: 15px;
  line-height: 21px;
  color: #000000;
  opacity: 0.6;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .description__button span {
  font-family: Roboto;
  font-size: 15px;
  line-height: 21px;
  color: #0f46c1;
  cursor: pointer;
  text-decoration: dashed;
}
.item .description__button span:hover {
  text-decoration: underline;
}
.item .item__enroll {
  grid-column: 9 / 11;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: center;
}
.item .enroll__button {
  grid-column: 1 / 11;
  text-align: center;
}
.item .btn__enroll {
  border: 1px dashed #0f46c1;
  border-radius: 20px;
  padding: 10px 25px;
  color: #0f46c1;
  transition: all 0.4s;
  cursor: pointer;
}
.item .btn__enroll:hover {
  border: 1px solid #0f46c1;
}
.item .btn__enroll:active {
  color: #fff;
  background: #0f46c1;
}

.itemLarge {
  opacity: 1;
  height: 380px;
  align-items: start;
}
.itemLarge .item__wrap {
  height: 100%;
}
.itemLarge .item__about {
  grid-column: 1 / 6;
  grid-template-rows: 110px 1fr;
}
.itemLarge .item__time {
  grid-row: 1;
  grid-column: 1 / 8;
}
.itemLarge .group-clock {
  border-radius: 55px 0;
}
.itemLarge .time__clock {
  border-radius: 54px 0;
}
.itemLarge .item__description {
  grid-row: 2;
  grid-column: 2 / 8;
  grid-template-rows: min-content;
  margin-top: 10px;
  align-items: unset;
}
.itemLarge .description__title {
  white-space: normal;
  overflow: unset;
  text-overflow: unset;
}
.itemLarge .description__content {
  overflow: auto;
  max-height: 220px;
  white-space: normal;
}
.itemLarge .item__enroll {
  border: 2px solid #b4dde9;
  border-radius: 60px;
  grid-column: 6 / 11;
}
.itemLarge .enroll__form {
  grid-column: 2 / 10;
  text-align: center;
}
.itemLarge .form__title {
  font-family: Kanit;
  font-size: 21px;
  line-height: 31px;
  text-align: center;
  color: #0f46c1;
  margin-bottom: 30px;
  box-sizing: border-box;
}
.itemLarge .form__input {
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
.itemLarge .form__input::placeholder {
  font-family: Roboto;
  font-size: 15px;
  line-height: 24px;
  color: #000;
  opacity: 0.4;
}
.itemLarge .form__input:focus {
  border: 1px solid rgba(15, 70, 193, 0.26);
  border-radius: 32px;
}
.itemLarge .reg__button {
  text-align: left;
  margin-top: 20px;
}
.itemLarge .reg__button button {
  width: 150px;
  height: 50px;
  text-align: center;
  color: #fff;
  background: #0099ff;
  border-radius: 32px;
  border: none;
  transition: all 0.4s;
}
.itemLarge .reg__button button:focus {
  outline: none;
}
.itemLarge .reg__button button:hover {
  background: #0f46c1;
}
.itemLarge .reg__button button:active {
  background: #feabb3;
}

.morning {
  background: rgba(180, 221, 233, 0.6);
}
.afternoon {
  background: rgba(255, 225, 118, 0.5);
}
.evening {
  background: rgba(254, 171, 179, 0.4);
}
.not__valid {
  display: none;
}
.notValid {
  display: block;
  color: #f79483;
  font-size: 10px;
  text-align: left;
  margin-top: -20px;
}
.isValid {
  color: #f79483;
  border: 1px solid #f79483;
}

.item__enroll-is-register {
  grid-column: 3 / 9;
  text-align: center;
}
.item__enroll-is-register__icon img {
  margin: 0 auto;
}
.item__enroll-is-register__text p {
  font-family: Kanit;
  font-size: 21px;
  line-height: 31px;
  text-align: center;
  color: #000;
}
.item__enroll-is-register__button button {
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
.item__enroll-is-register__button button:hover {
  border: 1px solid #0f46c1;
}
.item__enroll-is-register__button button:active {
  color: #fff;
  background: #0f46c1;
}
.item__enroll-is-register div {
  margin: 15px 0;
}
.item__enroll-is-register .btn__zoom_is_reg {
  margin-left: 50%;
  transform: translateX(-50%);

  display: grid;
  grid-template-columns: 40px 76px;
  align-items: center;
  cursor: pointer;
}
.btn__zoom_is_reg span {
  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  color: #0f46c1;
}

.btn__zoom {
  display: grid;
  grid-template-columns: 48px 100px;
  align-items: center;
  cursor: pointer;
}
.btn__zoom span {
  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  color: #0f46c1;
  text-align: left;
}

@media (max-width: 880px) {
  .item {
    height: 100%;
    max-height: 300px;
  }
  .item .date__hours {
    font-size: 32px;
    line-height: 29px;
  }
  .item .date__time {
    font-size: 17px;
    line-height: 25px;
  }
  .item .time__date {
    margin-top: -7px;
  }
  .item .item__about {
    grid-column: 1 /11;
    grid-row: 1 / 3;
    display: grid;
    grid-template-rows: 120px auto;
  }
  .item .item__time {
    grid-row: 1;
    grid-column: 1 / 10;
    align-items: center;
  }
  .item .group-clock {
    grid-column: 1 / 3;
    border-radius: 55px 0;
  }
  .item .item__description {
    grid-row: 2;
    grid-column: 2 / 8;
    margin: 10px 0;
    grid-template-rows: auto auto;
  }
  .item .item__enroll {
    grid-row: 3;
    grid-column: 1 / 11;
  }
  .item .enroll__button {
    height: 60px;
    text-align: left;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
  .item .btn__enroll {
    grid-column: 2 / 4;
    width: max-content;
    padding: 7px 20px;
    margin: 5px 10px 20px;
  }
  .item__enroll-is-register {
    text-align: -webkit-center;
  }
  .item__enroll-is-register .btn__zoom_is_reg {
    margin-left: 0;
    transform: none;
    width: max-content;
  }

  .itemLarge {
    height: 100%;
    max-height: 800px;
  }
  .itemLarge .enroll__form {
    margin: 20px 0;
  }

  .btn__zoom {
    grid-column: 2 / 6;
    display: grid;
    grid-template-columns: 50px 100px;
  }
}
</style>
