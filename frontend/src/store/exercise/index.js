import * as languages from "./languages";
import * as modes from "./modes";

export default {
  namespaced: true,
  state: {
    language: languages.EN_LANGUAGE,
    mode: modes.EASY_MODE,
    correctWord: null,
    selectedWords: [],
    wordBuffer1: [],
    wordBuffer2: [],
    wordBuffer3: [],
  },
  getters: {
    getCorrectWordIndex: (state) => {
      return state.selectedWords.findIndex(
        (word) => word.name === state.correctWord.name
      );
    },
  },
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
    setWordBuffer1(state, wordBuffer) {
      state.wordBuffer1 = wordBuffer;
    },
    addWordBuffer(state, { word, num }) {
      console.log(word, num);
      switch (num) {
        case 3:
          state.wordBuffer3.push(word);
          break;
        case 2:
          state.wordBuffer2.push(word);
          break;
        default:
          state.wordBuffer1.push(word);
          break;
      }
    },
    resetExercise(state) {
      state.correctWord = null;
      state.wordBuffer1 = [];
      state.wordBuffer2 = [];
      state.wordBuffer3 = [];
    },
    resetSelectedWords(state) {
      state.selectedWords = [];
    },
    shuffleSelectedWord(state) {
      state.selectedWords.sort(() => Math.random() - 0.5);
    },
    shuffleWordBuffer1(state) {
      state.wordBuffer1.sort(() => Math.random() - 0.5);
    },
  },
  actions: {
    resetExercise({ commit, rootState }) {
      return new Promise((resolve) => {
        commit("resetExercise");
        commit("setWordBuffer1", rootState.dictionary.sourceWords, 1);
        commit("shuffleWordBuffer1");

        resolve();
      });
    },
    async triggerNewExerciseItem({ state, commit }) {
      commit("resetSelectedWords");

      while (state.selectedWords.length < 6 && state.wordBuffer1.length > 0) {
        let selected = state.wordBuffer1.splice(0, 1);

        if (selected.length) {
          selected = selected.shift();
          selected.bufferNum = 1;
          commit("addSelectedWord", selected);
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
    async applyCorrectAnswer({ state, commit, dispatch }) {
      while (state.selectedWords.length > 0) {
        let selected = state.selectedWords.splice(0, 1);

        if (selected.length) {
          selected = selected.shift();

          if (selected.isCorrect) {
            if (selected.bufferNum < 3) {
              commit("addWordBuffer", {
                word: selected,
                num: selected.bufferNum + 1,
              });
            }
          } else {
            commit("addWordBuffer", {
              word: selected,
              num: selected.bufferNum,
            });
          }
        }
      }

      dispatch("triggerNewExerciseItem");
    },
    async applyIncorrectAnswer({ state, commit, dispatch }) {
      while (state.selectedWords.length > 0) {
        let selected = state.selectedWords.splice(0, 1);

        if (selected.length) {
          selected = selected.shift();
          commit("addWordBuffer", { word: selected, num: selected.bufferNum });
        }
      }

      dispatch("triggerNewExerciseItem");
    },
  },
  modules: {},
};
