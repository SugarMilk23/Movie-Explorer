// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        // Include Google Fonts Material Icons CDN
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
        },
        // ...other link tags
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true },

  runtimeConfig: {
    apiKey: process.env.API_KEY,
    token: process.env.API_READ_ACCESS_TOKEN,
  },
});
