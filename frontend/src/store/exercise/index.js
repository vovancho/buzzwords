import * as languages from "./languages";
import * as modes from "./modes";

export default {
  namespaced: true,
  state: {
    language: languages.EN_LANGUAGE,
    mode: modes.EASY_MODE,
  },
  getters: {},
  mutations: {
    toggleLanguage(state) {
      state.language =
        state.language === languages.EN_LANGUAGE
          ? languages.RU_LANGUAGE
          : languages.EN_LANGUAGE;
    },
    toggleMode(state) {
      state.mode =
        state.mode === modes.EASY_MODE ? modes.HARD_MODE : modes.EASY_MODE;
    },
  },
  actions: {},
  modules: {},
};
