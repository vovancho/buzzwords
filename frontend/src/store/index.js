import Vue from "vue";
import Vuex from "vuex";
import exercise from "@/store/exercise/index";
import dictionary from "@/store/dictionary/index";
import settings from "@/store/settings/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    subTitle: "",
    theme: "",
  },
  getters: {},
  mutations: {
    setTitle(state, title) {
      state.title = title;
      state.subTitle = "";
    },
    setSubTitle(state, subTitle) {
      state.subTitle = subTitle;
    },
    resetTitle(state) {
      state.title = "";
      state.subTitle = "";
    },
  },
  actions: {
    async initApp({ dispatch }) {
      await dispatch("dictionary/initSpeakLanguage");
      await dispatch("settings/initGroupList");
      await dispatch("dictionary/initDictionary");
      await dispatch("exercise/initRecognizer");
      await dispatch("exercise/resetExercise");
      await dispatch("exercise/triggerNewExerciseItem");
    },
  },
  modules: {
    exercise,
    dictionary,
    settings,
  },
});
