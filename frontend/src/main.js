import Vue from "vue";
// import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import vuei18n from "./plugins/vuei18n";
// import { messages } from "./store/messages";

Vue.config.productionTip = false;

// Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      wordsCount: "Нет слов | {n} слово | {n} слов",
    },
  },
  ru: {
    message: {
      wordsCount: "Нет слов | {n} слово | {n} слов",
    },
  },
};

// const vuei18n = new VueI18n({
//   locale: "ru", // установка локализации по умолчанию
//   messages, // установка сообщений локализаций
// });

new Vue({
  router,
  store,
  vuetify,
  // vuei18n,
  render: (h) => h(App),
}).$mount("#app");
