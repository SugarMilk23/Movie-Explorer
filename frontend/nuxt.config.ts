// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true, // Enable server-side rendering
  nitro: {
    preset: "node-server", // Use Node.js server preset
  },
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
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
      token: process.env.NUXT_PUBLIC_API_READ_ACCESS_TOKEN,
    },
  },
});
