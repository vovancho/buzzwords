import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "../store/messages";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "ru", // установка локализации по умолчанию
  messages, // установка сообщений локализаций
});
