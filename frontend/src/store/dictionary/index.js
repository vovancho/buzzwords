import * as sort from "./sort";
import words from "./db";

export default {
  namespaced: true,
  state: {
    sourceWords: words,
    searchedWords: [],
    dictionarySort: sort.ALPHABET_SORT,
    utterance: null,
    searchWord: "",
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
    setSearchWord(state, searchWord) {
      state.searchWord = searchWord;
    },
    setSearchedWords(state, searchedWords) {
      state.searchedWords = searchedWords;
    },
  },
  actions: {
    updateSearchWord({ commit }, searchWord) {
      commit("setSearchWord", searchWord);
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
    async initDictionary({ commit, state }) {
      commit("setSearchedWords", [...state.sourceWords]);
      commit("setSearchWord", "");
    },
    async triggerSearchWord({ commit, state }) {
      commit(
        "setSearchedWords",
        state.sourceWords.filter((word) =>
          word.name.startsWith(state.searchWord)
        )
      );
    },
  },
  modules: {},
};
