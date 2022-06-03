import Vue from "vue";
import Vuex from "vuex";
import words from "./db";
// import * as types from "./wordTypes";
import * as pages from "./pages";
import * as dictionary from "./dictionary";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    subTitle: "",
    theme: "",
    words: words,
    wordsCount: 0,
    dictionarySearch: "",
    dictionarySearchLang: dictionary.EN_DICTIONARY_SEARCH,
    page: pages.TRAINER_PAGE,
    dictionarySort: dictionary.ALPHABET_SORT,
  },
  getters: {},
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    setSubTitle(state, subTitle) {
      state.subTitle = subTitle;
    },
    resetAppHeader(state) {
      state.title = "";
      state.subTitle = "";
    },
    initWordsCount(state) {
      state.wordsCount = state.words.length;
    },
  },
  actions: {},
  modules: {},
});
