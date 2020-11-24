<template>
  <div ref="popup_video" class="PopupVideo" @click="closePopup">
    <div class="PopupVideo__close"></div>
    <div class="PopupVideo__wrap">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/3nQzI7MyNas?autoplay=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupVideo",
  methods: {
    closePopup() {
      this.$refs.popup_video.classList.add("PopupVideo--close");
      setTimeout(this.q, 400);
    },
    q() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.PopupVideo {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 2;
  transition: all 0.4s ease-in-out;
  opacity: 1;
  padding: 20%;
}
.PopupVideo--close {
  opacity: 0;
}
.PopupVideo__wrap {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding-bottom: 56.25%;
}
iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 30px;
}
.PopupVideo__close {
  width: 50px;
  height: 50px;
  background: #f6f7fb;
  position: absolute;
  top: 20px;
  right: 30px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.PopupVideo__close:hover {
  background: rgba(246, 247, 251, 0.4);
}
.PopupVideo__close::after {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #0f46c1;
  border-radius: 3px;
}
.PopupVideo__close::before {
  content: "";
  width: 2px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: #0f46c1;
  border-radius: 3px;
}

@media (max-width: 600px) {
  .PopupVideo {
    padding: 10%;
  }
}
</style>
