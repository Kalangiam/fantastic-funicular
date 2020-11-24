<template>
  <div class="header">
    <div class="header__wrap wrap">
      <div class="header__top smallScreen top">
        <div class="top__description">
          <div class="top__logo">
            <img
              src="../assets/logo/header-logo.svg"
              alt="Interactive Online Bible Studio"
            />
            <LanguageSelect @changeLang="onChangeLang" />
          </div>
          <div class="top__title">
            <p>
              {{ getContent("header.title.first_part") }}
            </p>
            <p>
              {{ getContent("header.title.second_part") }}
            </p>
          </div>
          <div class="top__summary">
            {{ getContent("header.subtitle") }}
          </div>
          <div class="top__button">
            <a @click="scrollToGroups">
              {{ getContent("header.button_text") }}
            </a>
          </div>
        </div>
        <div class="top__video">
          <div class="preview">
            <img src="../assets/people/preview.gif" alt="preview" />
          </div>
          <div class="top__block">
            <div class="top__block--bg">
              <img src="../assets/header-bg.png" alt="header-bg" />
            </div>
            <div class="svg">
              <div class="camera"></div>
              <div class="bible"></div>
              <div class="heart"></div>
            </div>
            <div class="jamaica">
              <div class="block-person">
                <img src="../assets/people/jamaica/jamaica.png" alt="jamaica" />
              </div>
              <div class="block-person__name">
                <b>{{ getContent("header.people.jamaica.name") }},</b>
                <span>
                  {{ getContent("header.people.jamaica.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/jamaica/vector.svg" alt="vector" />
              </div>
            </div>
            <div
              v-if="
                screenWidth >= 1300 ||
                (screenWidth <= 970 && screenWidth >= 490)
              "
              class="kenya"
            >
              <div class="block-person">
                <img src="../assets/people/kenya/kenya.png" alt="kenya" />
              </div>
              <div class="block-person__name">
                <b> {{ getContent("header.people.kenya.name") }},</b>
                <span>
                  {{ getContent("header.people.kenya.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/kenya/vector.svg" alt="vector" />
              </div>
            </div>
            <div
              v-if="
                screenWidth >= 1300 ||
                (screenWidth <= 970 && screenWidth >= 490)
              "
              class="germany"
            >
              <div class="block-person">
                <img src="../assets/people/germany/germany.png" alt="germany" />
              </div>
              <div class="block-person__name">
                <b>{{ getContent("header.people.germany.name") }},</b>
                <span>
                  {{ getContent("header.people.germany.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/germany/vector.svg" alt="vector" />
              </div>
            </div>
            <div class="japan">
              <div class="block-person">
                <img src="../assets/people/japan/japan.png" alt="japan" />
              </div>
              <div class="block-person__name">
                <b>{{ getContent("header.people.japan.name") }},</b>
                <span>
                  {{ getContent("header.people.japan.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/japan/vector.svg" alt="vector" />
              </div>
            </div>
            <div class="belarus">
              <div class="block-person">
                <img src="../assets/people/belarus/belarus.png" alt="belarus" />
              </div>
              <div class="block-person__name">
                <b>{{ getContent("header.people.belarus.name") }},</b>
                <span>
                  {{ getContent("header.people.belarus.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/belarus/vector.svg" alt="vector" />
              </div>
            </div>
            <div class="america">
              <div class="block-person">
                <img src="../assets/people/america/usa.png" alt="usa" />
              </div>
              <div class="block-person__name">
                <b>{{ getContent("header.people.usa.name") }},</b>
                <span>
                  {{ getContent("header.people.usa.country_name") }}
                </span>
              </div>
              <div class="vector">
                <img src="../assets/people/america/vector.svg" alt="vector" />
              </div>
            </div>
            <div class="laptop">
              <img src="../assets/people/laptop.png" alt="laptop" />
            </div>
            <div class="popup">
              <img
                src="../assets/svg/popup_play.svg"
                alt="play"
                @click="showHideVideo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {
    LanguageSelect: () => import("~/components/LanguageSelect"),
  },
  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    screenWidth: null,
    smallScreen: false,
  }),
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    addEventListener("resize", () => {
      this.screenWidth = document.documentElement.clientWidth;
    });
  },
  methods: {
    showHideVideo() {
      this.$emit("openVideo");
    },
    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : "";
    },
    scrollToGroups() {
      this.$emit("scrollToGroups");
    },
    onChangeLang(item) {
      this.$emit("changeLang", item);
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  overflow-x: hidden;
  height: 800px;
}
.header__top {
  @apply grid grid-cols-12 gap-5;
}

.top__logo {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.top__description {
  margin: 40px 0 40px;
  padding: 0 20px;
  @apply col-span-4;
}
.top__title {
  margin: 115px 0 50px 0;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  @apply font-light;
}
.top__title p:first-child {
  color: #000;
}
.top__title p:not(:first-child) {
  color: #0f46c1;
}
.top__summary {
  font-family: Roboto;
  opacity: 0.6;
  font-size: 15px;
  line-height: 23px;
  @apply mb-16 text-black;
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

.top__video {
  @apply col-span-8;
  position: relative;
}
.top__block {
  position: absolute;
  height: 800px;
  width: 910px;
}
.top__block--bg {
  position: absolute;
  top: -92px;
}
.laptop {
  position: absolute;
  top: 22.2%;
  left: 17.5%;
  transform: scale(1.2);
  width: 660px;
  height: 480px;
}

.jamaica {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: end;
  width: 100px;
  height: 95px;
}
.jamaica .block-person {
  width: 110px;
  height: 110px;
}
.jamaica .vector {
  margin: 20px 0 0 50%;
  transform: translateX(-50%);
  width: 59px;
  height: 83px;
}
.jamaica::after {
  content: "";
  background: url("../assets/svg/small-vector_3.svg");
  width: 15px;
  height: 15px;
  position: absolute;
  top: 95%;
  left: 110%;
  animation: zoom-large 9s ease-in-out 4s infinite;
}

.kenya {
  position: absolute;
  top: 20%;
  left: 85%;
  transform: translateX(-50%);
  text-align: end;
  width: 100px;
  height: 95px;
}
.kenya .block-person {
  width: 110px;
  height: 110px;
}
.kenya .vector {
  margin: 0 0 0 10%;
  transform: translateX(-50%);
  width: 80px;
  height: 70px;
}
.kenya::before {
  content: "";
  background: url("../assets/svg/small-vector_4.svg") no-repeat;
  width: 10px;
  height: 9px;
  position: absolute;
  animation: zoom-large 9s ease-in-out 5s infinite;
}

.germany {
  position: absolute;
  top: 55%;
  left: 90%;
  transform: translateX(-50%);
  text-align: end;
  width: 100px;
  height: 95px;
}
.germany .block-person {
  width: 110px;
  height: 110px;
}
.germany .vector {
  margin: -100px 0 0 -90%;
  width: 93px;
  height: 10px;
}
.germany::before {
  content: "";
  background: url("../assets/svg/small-vector_5.svg") no-repeat;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 65%;
  animation: zoom-large 9s ease-in-out 8s infinite;
}

.japan {
  position: absolute;
  top: 80%;
  left: 60%;
  transform: translateX(-50%);
  text-align: end;
  width: 100px;
  height: 95px;
}
.japan .block-person {
  width: 110px;
  height: 110px;
}
.japan .vector {
  margin: -215px 0 0 -70%;
  width: 95px;
  height: 110px;
}
.japan::after {
  content: "";
  background: url("../assets/svg/small-vector_6.svg") no-repeat;
  width: 13px;
  height: 13px;
  position: absolute;
  top: 120%;
  left: 120%;
  animation: zoom-large 9s ease-in-out 7s infinite;
}

.belarus {
  position: absolute;
  top: 65%;
  left: 10%;
  transform: translateX(-50%);
  text-align: end;
  width: 100px;
  height: 95px;
}
.belarus .block-person {
  width: 110px;
  height: 110px;
}
.belarus .vector {
  margin: -95px 0 0 105%;
  width: 114px;
  height: 16px;
}
.belarus::before {
  content: "";
  background: url("../assets/svg/small-vector_1.svg") no-repeat;
  width: 12px;
  height: 13px;
  position: absolute;
  top: 5%;
  left: 10%;
  animation: zoom-large 9s ease-in-out 1s infinite;
}

.america {
  position: absolute;
  top: 30%;
  left: 15%;
  transform: translateX(-50%);
  width: 100px;
  height: 95px;
}
.america .block-person {
  width: 90px;
  height: 104px;
}
.america .vector {
  margin: -50px 0 0 95%;
  width: 120px;
  height: 70px;
}
.america::after {
  content: "";
  background: url("../assets/svg/small-vector_2.svg") no-repeat;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 180%;
  left: 100%;
  animation: zoom-large 9s ease-in-out 6s infinite;
}

.preview {
  width: 350px;
  height: 250px;
  position: absolute;
  top: 250px;
  left: 330px;
}

.preview img {
  transform: rotateY(60deg) rotateX(-10deg) rotateZ(3deg) translateX(-218px)
    translateY(20px);
  width: 583px;
  height: 209px;
  max-width: unset;
}

.popup {
  position: absolute;
  top: 41%;
  left: 51%;
  z-index: 1;
  cursor: pointer;
  transform: scale(0.8);
}
.popup img {
  transition: all 0.2s ease-in-out;
}
.popup img:hover {
  transform: scale(1.2);
}

.camera {
  position: absolute;
  width: 60px;
  height: 60px;
  background: url("../assets/svg/Component_1.svg");
  top: 12%;
  left: 12%;
  animation: zoom 9s ease-in-out 0s infinite;
}
.bible {
  position: absolute;
  width: 61px;
  height: 61px;
  background: url("../assets/svg/Component_2.svg");
  top: 81%;
  left: 25%;
  animation: zoom 9s ease-in-out 3s infinite;
}
.heart {
  position: absolute;
  width: 60px;
  height: 60px;
  background: url("../assets/svg/Component_3.svg");
  top: 40%;
  left: 97%;
  animation: zoom 9s ease-in-out 6s infinite;
}
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes zoom-large {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
.block-person__name {
  font-family: Roboto, serif;
  font-size: 13.3179px;
  line-height: 16px;
  text-align: center;
  color: #000;
  opacity: 0.6;
}
.block-person__name b {
  font-weight: 700;
}

/* #############
    Small Screen
############# */

@media (max-width: 970px) {
  .smallScreen .top__video {
    @apply col-span-12;
    height: 520px;
  }
  .smallScreen .top__block {
    top: -70px;
    right: 50%;
    transform: translateX(50%);
    height: 500px;
    width: 550px;
  }
  .smallScreen .top__block--bg {
    top: 0;
  }
  .smallScreen .laptop {
    top: 36%;
    left: 22%;
    transform: scale(1.35);
    width: 350px;
    height: 240px;
  }

  .smallScreen .jamaica {
    top: 4%;
    left: 50%;
    width: 80px;
  }
  .smallScreen .jamaica .block-person {
    width: 78px;
    height: 65px;
  }
  .smallScreen .jamaica .vector {
    width: 32px;
    height: 45px;
  }

  .smallScreen .kenya {
    width: 80px;
  }
  .smallScreen .kenya .block-person {
    width: 78px;
    height: 65px;
  }
  .smallScreen .kenya .vector {
    width: 50px;
    height: 45px;
  }

  .smallScreen .germany {
    top: 58%;
    width: 80px;
  }
  .smallScreen .germany .block-person {
    width: 78px;
    height: 65px;
  }
  .smallScreen .germany .vector {
    margin: -63px 0 0 -62%;
    width: 50px;
    height: 45px;
  }
  .smallScreen .germany::before {
    content: "";
    top: 67%;
    left: -10%;
  }

  .smallScreen .japan {
    top: 88%;
    left: 65%;
    width: 80px;
  }
  .smallScreen .japan .block-person {
    width: 78px;
    height: 65px;
  }
  .smallScreen .japan .vector {
    margin: -130px 0 0 -60%;
    width: 51px;
    height: 58px;
  }
  .smallScreen .japan::after {
    content: "";
    top: 100%;
    left: 80%;
  }

  .smallScreen .belarus {
    top: 77%;
    left: 15%;
    width: 80px;
  }
  .smallScreen .belarus .block-person {
    width: 78px;
    height: 65px;
  }
  .smallScreen .belarus .vector {
    margin: -85px 0 0 90%;
    width: 60px;
  }
  .smallScreen .belarus::before {
    content: "";
    top: -5%;
    left: 0;
  }

  .smallScreen .america {
    left: 16%;
    width: 80px;
  }
  .smallScreen .america .block-person {
    width: 70px;
    height: 70px;
  }
  .smallScreen .america .vector {
    margin: -35px 0 0 95%;
    width: 65px;
    height: 37px;
  }
  .smallScreen .america::after {
    content: "";
    top: 100%;
    left: 65%;
  }

  .smallScreen .preview {
    width: 480px;
    top: 75px;
    right: 47%;
    transform: translateX(50%) scale(0.5);
    left: unset;
  }
  .smallScreen .preview img {
    width: 708px;
    height: 256px;
  }
  .smallScreen .popup {
    top: 49%;
    left: 48.5%;
    transform: scale(0.5);
    z-index: 1;
  }

  .smallScreen .camera {
    transform: scale(0.6);
  }
  .smallScreen .bible {
    top: 85%;
    left: 33%;
    transform: scale(0.6);
  }
  .smallScreen .heart {
    top: 45%;
    left: 93%;
  }

  .header {
    height: 1100px;
  }
  .header__top {
    grid-template-rows: 560px auto;
  }
  .top__description {
    grid-column: span 12;
    grid-row: 1;
  }
  .block-person__name {
    font-size: 9px;
    line-height: 25px;
  }
}
@media (max-width: 775px) {
  .header {
    height: 1130px;
  }
  .smallScreen .top__block {
    position: absolute;
    top: 0;
    height: 500px;
    width: 550px;
  }
  .smallScreen .preview {
    top: 150px;
    left: unset;
  }
  .smallScreen .popup {
    left: 49%;
  }
  .smallScreen .preview img {
    transform: rotateY(60deg) rotateX(-10deg) rotateZ(3deg) translateX(-173px)
      translateY(10px);
  }
}
@media (max-width: 560px) {
  .header {
    height: 1130px;
  }
  .smallScreen .preview {
    right: 45%;
  }
  .smallScreen .preview img {
    transform: rotateY(60deg) rotateX(-10deg) rotateZ(3deg) translateX(-210px)
      translateY(10px);
  }
}
@media (max-width: 490px) {
  .smallScreen .top__block {
    right: 38%;
  }
  .smallScreen .preview {
    right: 34%;
  }
  .smallScreen .preview img {
    transform: rotateY(60deg) rotateX(-10deg) rotateZ(3deg) translateX(-185px)
      translateY(10px);
  }
}
@media (max-width: 410px) {
  .smallScreen .top__block {
    right: 37%;
  }
  .smallScreen .preview {
    right: 30%;
  }
  .smallScreen .japan {
    left: 65%;
  }
  .smallScreen .belarus {
    left: 17%;
  }
  .smallScreen .america {
    left: 17%;
  }
  .smallScreen .camera {
    left: 20%;
  }
}
</style>
