<template>
  <div class="def-layout">
    <Nuxt />
  </div>
</template>

<style scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.def-layout {
  background: #f6f7fb;
}
.def-layout::v-deep .wrap {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
}
html::v-deep {
  scroll-behavior: smooth;
}
</style>
