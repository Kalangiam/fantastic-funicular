<template>
  <div class="header">
    <div class="header__button">
      <a href="https://awr.org/prophecies" target="_blank">▶ Watch Now</a>
    </div>
    <div class="header__speaker">
      <p>with</p>
      <p class="header__speaker-name">Dr. Duane McKey</p>
    </div>
    <countdown :time="time" :interval="100" tag="p">
      <template slot-scope="props">
        <div class="header__countdown">
          <div class="header__countdown__days">
            <span>{{ props.days }}</span>
            <small>days</small>
          </div>
          <div><span>:</span></div>
          <div class="header__countdown__hours">
            <span>{{ props.hours }}</span>
            <small>hours</small>
          </div>
          <div><span>:</span></div>
          <div class="header__countdown__minutes">
            <span>{{ props.minutes }}</span>
            <small>minutes</small>
          </div>
          <div><span>:</span></div>
          <div class="header__countdown__seconds">
            <span>{{ props.seconds }}</span>
            <small>seconds</small>
          </div>
        </div>
      </template>
    </countdown>
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    const now = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    const result = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + ((7 + 5 - now.getDay()) % 7),
      19,
      0
    );
    if (result <= now) result.setDate(result.getDate() + 7);
    this.time = result - now;
    console.log(result);
    console.log(result - now);
    console.log(result.getMilliseconds());
  },
};
</script>
<style scoped>
.header {
  text-align: center;
  background-image: url("../assets/descktopBg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1920px 672px;
  height: 672px;
  position: relative;
}

.header__button a {
  position: absolute;
  bottom: 80px;
  transform: translateX(-50%);
  padding: 17px 40px;
  border-radius: 32px;
  transition: all 0.4s;
  color: #fff;
  cursor: pointer;
  font-family: Kanit;
  font-weight: 500;
  font-size: 19px;
  line-height: 25px;
  background: #db4150;
  white-space: nowrap;
}

.header__button a:hover {
  background: #d75d69;
}

.header__button a:active {
  background: #db4150;
}

.header__speaker {
  text-align: left;
  bottom: 80px;
  position: absolute;
  left: 50%;
  margin-left: 180px;
  font-family: Kanit;
  font-weight: 300;
  font-size: 17px;
  line-height: 18px;
  color: #fff;
}

.header__speaker-name {
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
}
.header__countdown {
  color: #fff;
  font-family: Kanit;
  font-weight: 300;
  display: flex;
  flex-direction: row;
  width: 250px;
  position: absolute;
  bottom: 80px;
  left: 50%;
  margin-left: -410px;
  justify-content: space-around;
}
.header__countdown span {
  display: block;
  font-weight: 500;
  font-size: 35px;
  height: 45px;
}
.header__countdown small {
  display: block;
  font-weight: 300;
  font-size: 14px;
}

@media (max-width: 1000px) {
  .header {
    background-image: url("../assets/mobileBg.jpg");
    background-size: 1000px 785px;
    height: 785px;
  }

  .header__button a {
    bottom: unset;
    top: 280px;
  }
  .header__countdown {
    bottom: unset;
    top: 350px;
    margin-left: -125px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }

  .header__speaker {
    bottom: 65px;
    left: 20px;
    margin-left: 0;
  }
}
</style>
