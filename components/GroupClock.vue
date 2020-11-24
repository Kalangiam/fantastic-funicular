<template>
  <div class="element">
    <svg id="clock" viewBox="0 0 100 100">
      <circle id="face" cx="50" cy="50" r="45" />
      <g id="hands">
        <rect
          id="hour"
          ref="hour"
          x="48.5"
          y="17.5"
          width="3"
          height="35"
          rx="2.5"
          ry="2.55"
        />
        <rect
          id="min"
          ref="min"
          x="48"
          y="12.5"
          width="3"
          height="40"
          rx="2"
          ry="2"
        />
      </g>
      <circle
        id="center"
        :class="{ morning, afternoon, evening }"
        cx="50"
        cy="50"
        r="5"
      ></circle>
    </svg>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "GroupClock",
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
    startTime: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    date: null,
  }),
  mounted() {
    this.date = moment(this.startTime, "YYYY-MM-DD HH:mm:ss").toDate();
    this.setDeg(this.$refs.min, 6 * moment(this.date).minute());
    this.setDeg(
      this.$refs.hour,
      30 * (moment(this.date).hour() % 12) + moment(this.date).minute() / 2
    );
  },
  methods: {
    setDeg(el, deg) {
      el.setAttribute("transform", "rotate(" + deg + " 50 50)");
    },
  },
};
</script>

<style scoped>
#face {
  fill: transparent;
}
#hour,
#min {
  fill: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}

.element {
  width: 100%;
}
.morning {
  fill: #b4dde9;
}
.afternoon {
  fill: #ffe176;
}
.evening {
  fill: #feabb3;
}
</style>
