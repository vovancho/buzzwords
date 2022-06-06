import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  ru: {
    wordsCount: "Нет слов | {n} слово | {n} слов",
  },
};

export default new VueI18n({
  locale: "ru", // установка локализации по умолчанию
  messages, // установка сообщений локализаций
});