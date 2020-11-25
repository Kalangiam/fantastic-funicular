<template>
  <div class="header">
    <div class="header__button">
      <a href="#">▶ Watch Now</a>
    </div>
    <div class="header__speaker">
      <p>with</p>
      <p class="header__speaker-name">Dr. Duane McKey</p>
    </div>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  background-image: url("../assets/descktopBg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 90vh;
  position: relative;
}

.header__button a {
  position: absolute;
  bottom: 80px;
  transform: translateX(-50%);
  padding: 15px 40px;
  border-radius: 32px;
  transition: all 0.4s;
  color: #fff;
  cursor: pointer;
  font-family: Kanit;
  font-weight: 500;
  font-size: 17px;
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
  left: 63%;
  font-family: Kanit;
  font-weight: 300;
  font-size: 17px;
  line-height: 18px;
  color: #fff;
}

.header__speaker-name {
  font-weight: 500;
  font-size: 28px;
  line-height: 34px;
}

@media (max-width: 750px) {
  .header {
    background-image: url("../assets/mobileBg.jpg");
  }

  .header__button a {
    bottom: unset;
    top: 280px;
  }

  .header__speaker {
    bottom: 65px;
    left: 20px;
  }
}
</style>
