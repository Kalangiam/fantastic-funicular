export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "AWR - Earth's Final Countdown with Dr. Duane McKey",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "AWR - Earth's Final Countdown with Dr. Duane McKey",
      },
      { hid: "og:image", property: "og:image", content: "/ogImage.jpg" },
      {
        hid: "og:title",
        property: "og:title",
        content: "AWR - Earth's Final Countdown with Dr. Duane McKey",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Our dedicated teachers help people all over the world dig more deeply into the Bible",
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      {
        name: "msapplication-config",
        content: "/favicon/browserconfig.xml",
      },
      { name: "theme-color", content: "#ffffff" },
    ],
    link: [
      {
        href:
          "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&family=Roboto:wght@300;700&display=swap",
        rel: "stylesheet",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
      { rel: "shortcut icon", href: "/favicon/favicon-32x32.png" },
    ],
    script: [
      {
        id: "hs-script-loader",
        src: "//js.hs-scripts.com/4189584.js",
        async: true,
        defer: true,
        body: true,
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  loading: {
    color: "#0f46c1",
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "./plugins/client-components.js",
      mode: "client",
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "nuxt-moment",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  publicRuntimeConfig: {
    orionApiEndpoint: process.env.ORION_API_ENDPOINT,
    orionApiClientSecret: process.env.ORION_API_CLIENT_SECRET,
    hubSpotPortalId: process.env.HUBSPOT_PORTAL_ID,
  },
};
