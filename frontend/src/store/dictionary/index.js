import * as sort from "./sort";
import words from "./db";

export default {
  namespaced: true,
  state: {
    sourceWords: words,
    dictionarySort: sort.ALPHABET_SORT,
    utterance: null,
  },
  getters: {
    wordsCount: (state) => {
      return state.sourceWords.length;
    },
    translationToText: () => (translation) => {
      return translation.join(", ");
    },
  },
  mutations: {
    toggleDictionarySort(state) {
      state.dictionarySort =
        state.dictionarySort === sort.ALPHABET_SORT
          ? sort.DATE_ADDED_SORT
          : sort.ALPHABET_SORT;
    },
    setUtterance(state, utterance) {
      state.utterance = utterance;
    },
    speak(state, text) {
      state.utterance.text = text;
      speechSynthesis.speak(state.utterance);
    },
  },
  actions: {
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
};
