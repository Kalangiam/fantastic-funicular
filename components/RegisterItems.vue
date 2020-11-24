<template>
  <div ref="register__items">
    <div class="zoom-groups">
      <div class="wrap">
        <div class="zoom-groups__header">
          <div class="zoom-groups__title">
            {{ getContent("main.groups.title") }}
          </div>
          <div class="zoom-groups__subtitle">
            {{ getContent("main.groups.subtitle") }}
          </div>
        </div>
        <div
          v-if="
            morningGroups.length ||
            afternoonGroups.length ||
            eveningGroups.length
          "
          class="register__items"
        >
          <div v-if="morningGroups.length" class="morning__groups">
            <div class="dayTime">
              <span>{{ getContent("main.groups.time_of_day.morning") }}</span>
            </div>
            <template v-for="group in morningGroups">
              <RegisterItem
                :key="group.id"
                morning
                :group="group"
                :participant-groups="participantGroups"
                :translate-lang="translateLang"
              />
            </template>
          </div>

          <div v-if="afternoonGroups.length" class="afternoon__groups">
            <div class="dayTime">
              <span>{{ getContent("main.groups.time_of_day.afternoon") }}</span>
            </div>
            <template v-for="group in afternoonGroups">
              <RegisterItem
                :key="group.id"
                afternoon
                :group="group"
                :participant-groups="participantGroups"
                :translate-lang="translateLang"
              />
            </template>
          </div>

          <div v-if="eveningGroups.length" class="evening__groups">
            <div class="dayTime">
              <span>{{ getContent("main.groups.time_of_day.evening") }}</span>
            </div>
            <template v-for="group in eveningGroups">
              <RegisterItem
                :key="group.id"
                evening
                :group="group"
                :participant-groups="participantGroups"
                :translate-lang="translateLang"
              />
            </template>
          </div>
        </div>
        <div v-else class="register__items-clear">
          {{ getContent("main.groups.text_instead_of_groups") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {
    RegisterItem: () => import("~/components/RegisterItem.vue"),
  },
  props: {
    scroll: {
      type: Boolean,
    },
    groupsList: {
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
    sortGroup: [],
    time: [],
  }),
  computed: {
    morningGroups() {
      return this.sortGroup.filter(
        (group) => moment(group.startTime, "YYYY-MM-DD HH:mm:ss").hours() < 12
      );
    },
    afternoonGroups() {
      return this.sortGroup.filter(
        (group) =>
          moment(group.startTime, "YYYY-MM-DD HH:mm:ss").hours() >= 12 &&
          moment(group.startTime, "YYYY-MM-DD HH:mm:ss").hours() < 18
      );
    },
    eveningGroups() {
      return this.sortGroup.filter(
        (group) => moment(group.startTime, "YYYY-MM-DD HH:mm:ss").hours() >= 18
      );
    },
  },
  watch: {
    scroll(val) {
      if (!val) return;
      this.$refs.register__items.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      this.$emit("scrollFalse");
    },
    groupsList(val) {
      this.sortGroup = val.groups.sort((a, b) => {
        return moment(a.startTime)
          .format("HH::mm:ss")
          .localeCompare(moment(b.startTime).format("HH::mm:ss"));
      });
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
.zoom-groups {
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding-bottom: 2.5rem;
}
.zoom-groups::after {
}
.zoom-groups__header {
  @apply text-center my-10;
}
.zoom-groups__title {
  color: #0f46c1;
  padding: 0 30px;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  @apply font-light;
}
.zoom-groups__subtitle {
  font-family: Roboto;
  font-size: 15px;
  padding: 0 30px;
  @apply leading-5 text-center text-black text-opacity-50;
}
.register__items {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  text-align: center;
}
.register__items-clear {
  text-align: center;
  margin: 40px 0;

  font-family: Roboto;
  font-size: 25px;
  line-height: 21px;
  color: #000000;
  opacity: 0.6;
}

.morning__groups {
  grid-column: 2 / 12;
}
.morning__groups::after {
  content: "";
  background: url("../assets/svg/groups-svg/big-right-vector_1.svg");
  width: 1022px;
  height: 1233px;
  position: absolute;
  top: -100px;
  z-index: -1;
}
.morning__groups::before {
  content: "";
  background: url("../assets/svg/groups-svg/small-vector_1.svg") no-repeat;
  width: 21px;
  height: 21px;
  position: absolute;
  top: 370px;
  left: 150px;
  z-index: -1;
}

.afternoon__groups {
  grid-column: 2 / 12;
  position: relative;
}
.afternoon__groups::before {
  content: "";
  background: url("../assets/svg/groups-svg/small-vector_2.svg") no-repeat;
  width: 21px;
  height: 21px;
  position: absolute;
  top: 170px;
  right: -110px;
  z-index: -1;
}

.evening__groups {
  grid-column: 2 / 12;
  position: relative;
}
.evening__groups::before {
  content: "";
  background: url("../assets/svg/groups-svg/big-left-vector_1.svg") no-repeat;
  position: absolute;
  width: 1200px;
  height: 1150px;
  bottom: -660px;
  left: -694px;
  z-index: -1;
}
.evening__groups::after {
  content: "";
  background: url("../assets/svg/groups-svg/small-vector_3.svg") no-repeat;
  position: absolute;
  width: 35px;
  height: 35px;
  top: 170px;
  left: -100px;
  z-index: -1;
}

.dayTime {
  grid-column: 6 / 8;
  padding: 20px 0 28px;
}
.dayTime span {
  font-family: Kanit;
  font-size: 17px;
  line-height: 25px;
  color: #0f46c1;
  padding: 8px 15px;
  background: rgba(15, 70, 193, 0.1);
  border-radius: 12px;
}
</style>
