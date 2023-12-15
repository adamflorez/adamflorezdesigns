// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  devtools: { enabled: true },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/register"],
    },
  },
  ui: {
    global: true,
  },
  runtimeConfig: {
    public: {
      eden: process.env.EDEN_KEY,
    },
  },
});
