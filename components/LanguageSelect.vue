<template>
  <div class="select">
    <div class="select__input" :class="{ selectOpen }" @click="hideOpenSelect">
      <div class="select__input-field" style="text-transform: capitalize">
        {{ selectItem }}
      </div>
      <div
        class="select__input-icon"
        :class="selectOpen ? 'arrow_up' : 'arrow_down'"
      ></div>
    </div>
    <div v-if="selectOpen" class="select__items-block">
      <template v-for="(lang, index) in langList">
        <div :key="index" class="select_item" @click="selectLang">
          <p>{{ lang.language }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    langList: null,
    selectOpen: false,
    selectItem: "eng",
  }),
  watch: {
    selectOpen(val) {
      if (val) {
        document.addEventListener("click", this.hideOpenSelect);
      }
    },
  },
  mounted() {
    this.$axios
      .$post(this.$config.orionApiEndpoint, {
        cmd: "getLanguages",
        email: this.email,
        token: this.$config.orionApiClientSecret,
      })
      .then((res) => {
        this.langList = res.languages;
      });
    localStorage.getItem("lang")
      ? (this.selectItem = localStorage.getItem("lang"))
      : localStorage.setItem("lang", this.selectItem.toLowerCase());
  },
  methods: {
    hideOpenSelect() {
      this.selectOpen = !this.selectOpen;

      if (this.selectOpen) {
        document.addEventListener(
          "click",
          () => {
            this.selectOpen = false;
          },
          { once: true }
        );
      } else {
        document.removeEventListener("click", this.hideOpenSelect);
      }
    },
    selectLang(e) {
      this.hideOpenSelect();
      this.selectItem = e.target.textContent;
      localStorage.setItem("lang", this.selectItem.toLowerCase());
      this.$emit("changeLang", this.selectItem.toLowerCase());
    },
  },
};
</script>

<style scoped>
.select {
  position: relative;
  transition: all 0.4s;
}
.select__input {
  cursor: pointer;
  position: relative;
  width: 70px;
}
.select__input-field {
  cursor: pointer;
  background: #fff;
  border: 1px dashed #0f46c1;
  border-radius: 12px;
  width: inherit;
  padding-left: 5px;

  font-family: Kanit;
  font-size: 17px;
  line-height: 25px;
  color: #0f46c1;
}
.select__input-field::first-letter {
  text-transform: uppercase;
}
.select__input:hover .select__input-field {
  border: 1px solid #0f46c1;
}

.selectOpen {
  background: #fff;
  border-radius: 12px 12px 0 0;
}
.arrow_up {
  background: url("../assets/svg/lang-arrow.svg") center no-repeat;
  width: 11px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  right: 10px;
}
.arrow_down {
  background: url("../assets/svg/lang-arrow.svg") center no-repeat;
  width: 11px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
.select__items-block {
  background: #fff;
  box-shadow: 0 4px 10px rgba(15, 70, 193, 0.1);
  width: 70px;
  padding-top: 5px;
  border-radius: 0 0 12px 12px;
  position: absolute;
  z-index: 1;
}
.select_item {
  cursor: pointer;
  padding: 3px 5px;
}
.select_item:hover {
  background: rgba(15, 70, 193, 0.2);
}
.select_item:last-child:hover {
  border-radius: 0 0 12px 12px;
}
.select_item p {
  font-family: Kanit;
  font-size: 17px;
  line-height: 25px;
  color: #0f46c1;

  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}
.select_item p::first-letter {
  text-transform: uppercase !important;
}
</style>
