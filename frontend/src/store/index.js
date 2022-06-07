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
    sourceWords: words,
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
      state.wordsCount = state.sourceWords.length;
    },
    setWords(state, words) {
      state.words = words;
    },
    setUtterance(state, utterance) {
      state.utterance = utterance;
    },
    setDictionarySort(state, dictionarySort) {
      state.dictionarySort = dictionarySort;
    },
    setDictionarySearch(state, dictionarySearch) {
      state.dictionarySearch = dictionarySearch;
    },
    setDictionarySearchLang(state, dictionarySearchLang) {
      state.dictionarySearchLang = dictionarySearchLang;
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
    toggleDictionarySort({ dispatch, commit, state }) {
      if (state.dictionarySort === dictionary.ALPHABET_SORT) {
        dispatch("sortWordsByDateAdded");
        commit("setDictionarySort", dictionary.DATE_ADDED_SORT);
      } else {
        dispatch("sortWordsByAlphabet");
        commit("setDictionarySort", dictionary.ALPHABET_SORT);
      }
    },
    sortWordsByAlphabet({ state, commit }) {
      let words = state.words.sort(function (word1, word2) {
        if (word1.name > word2.name) {
          return 1;
        }
        if (word1.name < word2.name) {
          return -1;
        }

        return 0;
      });

      commit("setWords", words);
    },
    sortWordsByDateAdded({ state, commit }) {
      let words = state.words.sort(function (word1, word2) {
        if (word1.createdAt > word2.createdAt) {
          return 1;
        }
        if (word1.createdAt < word2.createdAt) {
          return -1;
        }

        return 0;
      });

      commit("setWords", words);
    },
    searchWord({ state, commit }, text) {
      commit("setDictionarySearch", text);

      const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

      if (cyrillicPattern.test(text)) {
        commit("setDictionarySearchLang", dictionary.RU_DICTIONARY_SEARCH);

        let words = state.sourceWords.filter((word) =>
          word.translation.filter((transWord) =>
            transWord.includes(text.toLowerCase())
          )
        );

        commit("setWords", words);
      } else {
        commit("setDictionarySearchLang", dictionary.EN_DICTIONARY_SEARCH);

        let words = state.sourceWords.filter((word) =>
          word.name.includes(text.toLowerCase())
        );

        commit("setWords", words);
      }
    },
  },
  modules: {},
});
