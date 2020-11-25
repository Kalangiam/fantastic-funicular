<template>
  <div class="Card" :class="[`item-${index}`]">
    <div class="Card__left">
      <svg class="Card__icon" :class="[`Card__icon--${icon}`]">
        <use
          :xlink:href="require('../assets/svg/actionIcons.svg') + `#${icon}`"
        ></use>
      </svg>
    </div>
    <div class="Card__right">
      <div class="Card__title">{{ title }}</div>
      <div class="Card__description">{{ desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.Card {
  width: 280px;
  min-width: 255px;
  min-height: 285px;
  border-radius: 30px;
  background: #fff;
  padding: 40px;
  display: grid;
  grid-template-rows: auto 100px;
  align-items: baseline;
  text-align: left;
  cursor: pointer;
  flex-grow: 1;
  flex-basis: 0;
  transition: all 0.1s ease-in;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}
.Card:hover {
  border: 2px solid #f8d9dc;
}

.Card__left {
  margin-right: 37px;
  position: relative;
}

.Card__icon {
  font-size: 52px;
  color: #2469c7;
  position: relative;
  transform: scale(0.9);
}

.Card__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Kanit;
  color: #0267b5;
  @apply text-xl leading-loose;
}

.Card__description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  font-family: Roboto;
  opacity: 0.6;
  max-width: 220px;
  font-size: 15px;
  line-height: 23px;
  @apply text-black;
}

.Card__icon--pray-hands {
  width: 83px;
  height: 84px;
}
.Card__icon--bible-closed {
  width: 85px;
  height: 84px;
}
.Card__icon--answers {
  width: 83px;
  height: 84px;
}

@media (max-width: 600px) {
  .Card__description {
    max-width: 220px;
  }
}
</style>
