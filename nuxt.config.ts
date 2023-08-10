// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  target: "server",
  runtimeConfig: {
    public:{
      CcServerUrl: process.env.CC_SERVER_URL,
      CcFrontUrl: process.env.CC_FRONT_URL,
    }
  },
  modules: [
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },
  components: [{
    path: '~/components/',
    pathPrefix: false,
  }],
  css: [
    "vuetify/lib/styles/main.sass",
    "mdi/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
})
