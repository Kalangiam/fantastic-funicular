<template>
  <div class="benefits">
    <div class="wrap">
      <div class="benefits__header">
        <div class="header__title">
          {{ getContent("main.benefits.title") }}
        </div>
        <div class="header__subtitle">
          {{ getContent("main.benefits.subtitle") }}
        </div>
      </div>
      <div class="benefits__content">
        <div class="benefits__item small-groups">
          <div class="item__logo">
            <img src="../assets/groups/small_groups.svg" alt="Small groups" />
          </div>
          <div class="item__title">
            {{ getContent("main.benefits.small_groups.title") }}
          </div>
          <div class="item__description">
            {{ getContent("main.benefits.small_groups.subtitle") }}
          </div>
        </div>
        <div class="benefits__item friendly-atmosphere">
          <div class="item__logo">
            <img
              src="../assets/groups/friendly_atmosphere.svg"
              alt="Friendly atmosphere"
            />
          </div>
          <div class="item__title">
            {{ getContent("main.benefits.friendly_atmosphere.title") }}
          </div>
          <div class="item__description">
            {{ getContent("main.benefits.friendly_atmosphere.subtit") }}
          </div>
        </div>
        <div class="benefits__item experienced-teachers">
          <div class="item__logo">
            <img
              src="../assets/groups/experienced_teachers.svg"
              alt="Experienced teachers"
            />
          </div>
          <div class="item__title">
            {{ getContent("main.benefits.experienced_teachers.title") }}
          </div>
          <div class="item__description">
            {{ getContent("main.benefits.experienced_teachers.subti") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Benefits",
  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : "";
    },
  },
};
</script>

<style scoped>
.benefits {
  position: relative;
  z-index: 0;
}
.benefits::before {
  content: "";
  background: url("../assets/svg/benefits-svg/big-left-vector_1.svg") no-repeat;
  position: absolute;
  width: 649px;
  height: 689px;
  left: -300px;
  top: -34px;
}
.benefits__header {
  @apply text-center my-10;
}
.header__title {
  color: #0f46c1;
  padding: 0 30px;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  @apply font-light;
}
.header__subtitle {
  font-family: Roboto;
  font-size: 15px;
  line-height: 23px;
  padding: 0 30px;
  @apply text-center text-black text-opacity-50;
}
.benefits__content {
  @apply mt-24 grid grid-cols-12;
}
.benefits__item {
  @apply .col-span-4;
  text-align: -webkit-center;
}
.benefits__item:nth-child(2) {
  position: relative;
  top: -30%;
}
.item__logo {
  position: relative;
}
.small-groups .item__logo::before {
  content: "";
  background: url("../assets/svg/benefits-svg/small-vector_1.svg");
  position: absolute;
  width: 17px;
  height: 17px;
  top: 0;
  left: 23%;
}
.experienced-teachers .item__logo::after {
  content: "";
  background: url("../assets/svg/benefits-svg/small-vector_2.svg");
  position: absolute;
  width: 16px;
  height: 16px;
  top: 70%;
  left: 70%;
}
.item__title {
  font-family: Kanit;
  color: #0f46c1;
  @apply text-xl leading-loose text-center;
}
.item__description {
  font-family: Roboto;
  opacity: 0.6;
  max-width: 260px;
  font-size: 15px;
  line-height: 23px;
  @apply text-center text-black;
}
@media (max-width: 980px) {
  .benefits::before {
    left: -400px;
  }
}
@media (max-width: 800px) {
  .benefits::before {
    left: -300px;
    top: 220px;
  }
  .benefits__content {
    grid-template-rows: repeat(3, 1fr);
  }
  .benefits__item.small-groups {
    grid-column: 3 / 8;
  }
  .benefits__item.friendly-atmosphere {
    top: 0;
    grid-column: 7 / 11;
  }
  .benefits__item.experienced-teachers {
    grid-column: 4 / 9;
  }
}
@media (max-width: 640px) {
  .benefits::before {
    left: -400px;
  }
  .benefits__item.small-groups {
    grid-column: 3 / 9;
  }
  .benefits__item.friendly-atmosphere {
    top: 0;
    grid-column: 6 / 13;
  }
  .benefits__item.experienced-teachers {
    grid-column: 3 / 9;
  }
}
@media (max-width: 400px) {
  .benefits__item.small-groups {
    grid-column: 2 / 10;
  }
  .benefits__item.friendly-atmosphere {
    top: 0;
    grid-column: 5 / 13;
  }
  .benefits__item.experienced-teachers {
    grid-column: 2 / 10;
  }
}
</style>
