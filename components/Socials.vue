<template>
  <div class="socials">
    <div class="title">
      {{ description }}
    </div>
    <div class="items">
      <div
        v-for="item in items"
        :key="item.id"
        class="item"
        @click="$emit('update:value', item.id)"
      >
        <svg class="socials__icon" :class="[`Card__icon--${item.icon}`]">
          <use
            :xlink:href="
              require('../assets/svg/actionIcons.svg') +
              `#${item.id === value ? item.activeIcon : item.icon}`
            "
          ></use>
        </svg>
        <div class="name">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    translateLang: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 17px;
  font-family: Roboto;
  opacity: 0.6;
  font-size: 15px;
  line-height: 23px;
  @apply text-black;
}

.items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.item {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 13px;
}

.item:not(:first-child) {
  margin-left: 27px;
}

.socials__icon {
  width: 49px;
  height: 49px;
  font-size: 48px;
  flex-shrink: 0;
  margin-bottom: 10px;
}

.name {
  font-family: Roboto;
  opacity: 0.6;
  font-size: 15px;
  line-height: 23px;
  @apply text-black;
}
@media (max-width: 400px) {
  .item:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
