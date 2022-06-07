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
    page: pages.HOME_PAGE,
    dictionarySort: dictionary.ALPHABET_SORT,
    utterance: null,
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
    setActiveWord(state, name) {
      state.words = state.words.map(
        (word) => (word.active = word.name === name)
      );
    },
    setUtterance(state, utterance) {
      state.utterance = utterance;
    },
  },
  actions: {
    speak({ state }, text) {
      state.utterance.text = text;
      speechSynthesis.speak(state.utterance);
    },
    getVoices() {
      return new Promise((resolve) => {
        let synth = window.speechSynthesis;
        let id;

        id = setInterval(() => {
          if (synth.getVoices().length !== 0) {
            resolve(synth.getVoices());
            clearInterval(id);
          }
        }, 100);
      });
    },
    async initSpeakLanguage({ dispatch, commit }) {
      let voices = await dispatch("getVoices");
      let utterance = new SpeechSynthesisUtterance();
      utterance.voice = voices.find((voice) => voice.lang === "en-US");
      commit("setUtterance", utterance);
    },
  },
  modules: {},
});
