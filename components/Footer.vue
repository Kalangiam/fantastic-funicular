<template>
  <footer class="footer">
    <div class="wrap footer__wrap">
      <div class="footer__logo">
        <img src="../assets/logo/footer-logo.svg" alt="Adventist World Radio" />
      </div>
      <div class="footer__series">
        <p>Presented by Adventist World Radio</p>
      </div>
      <div class="footer__copyright">
        <p>© 2020 Adventist World Radio. All rights reserved.</p>
      </div>
      <div class="footer__nav">
        <div class="nav-link">
          <a href="https://privacy.adventist.org/">Privacy policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  height: 155px;
  @apply bg-white w-full p-8;
}
.footer__wrap {
  @apply grid grid-cols-4 grid-rows-2 gap-3;
}
.footer__wrap div {
  max-width: 200px;
  width: 100%;
}
.footer__series {
  @apply text-sm leading-snug;
}
.footer__copyright {
  opacity: 0.4;
  @apply text-sm leading-snug col-start-1;
}
.footer__nav {
  grid-row: 1 / 3;
  @apply col-start-4;
}
.nav-link a {
  @apply .text-base leading-loose no-underline;
  color: #0267b5;
}
.nav-link a:hover {
  @apply underline;
}

@media (max-width: 650px) {
  .footer__wrap {
    grid-template-rows: repeat(4, 1fr);
  }
  .footer__logo {
    grid-row: 1;
    grid-column: 1 / 5;
  }
  .footer__series {
    grid-row: 2;
    grid-column: 1 / 5;
  }
  .footer__copyright {
    grid-row: 4;
    grid-column: 1 / 5;
  }
  .footer__nav {
    grid-row: 3;
    grid-column: 1 / 5;
  }
}
</style>
