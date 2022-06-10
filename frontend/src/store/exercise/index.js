import * as languages from "./languages";
import * as modes from "./modes";

export default {
  namespaced: true,
  state: {
    language: languages.EN_LANGUAGE,
    mode: modes.EASY_MODE,
    correctWord: null,
    selectedWords: [],
    wordBuffer: [],
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
    setCorrectWord(state, correctWord) {
      state.correctWord = correctWord;

      if (correctWord) {
        state.selectedWords.map(function (word) {
          word.isCorrect = correctWord.name === word.name;

          return word;
        });
      }
    },
    addSelectedWord(state, selectedWord) {
      state.selectedWords.push(selectedWord);
    },
    setWordBuffer(state, wordBuffer) {
      state.wordBuffer = wordBuffer;
    },
    resetExercise(state) {
      state.correctWord = null;
      state.selectedWords = [];
      state.wordBuffer = [];
    },
    shuffleSelectedWord(state) {
      state.selectedWords.sort(() => Math.random() - 0.5);
    },
  },
  actions: {
    resetExercise({ commit, rootState }) {
      commit("resetExercise");
      commit("setWordBuffer", rootState.dictionary.sourceWords);
    },
    triggerNewExerciseItem({ state, commit }) {
      while (state.selectedWords.length < 6 && state.wordBuffer.length > 0) {
        const selected = state.wordBuffer.splice(
          Math.floor(Math.random() * state.wordBuffer.length),
          1
        );

        if (selected.length) {
          commit("addSelectedWord", selected.shift());
        }
      }

      let correctWord = state.selectedWords.splice(
        Math.floor(Math.random() * state.selectedWords.length),
        1
      );
      correctWord = correctWord.length ? correctWord.shift() : null;

      commit("addSelectedWord", correctWord);
      commit("setCorrectWord", correctWord);
      commit("shuffleSelectedWord", correctWord);
    },
  },
  modules: {},
};
