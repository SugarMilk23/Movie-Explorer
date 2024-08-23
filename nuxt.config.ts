// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    apiKey: process.env.API_KEY,
    token: process.env.API_READ_ACCESS_TOKEN,
  },
});
