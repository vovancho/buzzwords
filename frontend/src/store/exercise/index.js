import * as languages from "./languages";
import * as modes from "./modes";

export default {
  namespaced: true,
  state: {
    language: languages.EN_LANGUAGE,
    mode: modes.EASY_MODE,
    correctWord: null,
    searchWord: "",
    selectedWords: [],
    wordBuffer1: [],
    wordBuffer2: [],
    wordBuffer3: [],
    recognizer: {
      recognition: null,
      isRecognizing: false,
      transcript: "",
    },
  },
  getters: {
    getCorrectWordIndex: (state) => {
      return state.correctWord.name;
    },
    getCorrectWordTitle: (state, getters, rootState, rootGetters) => {
      if (state.language === languages.EN_LANGUAGE) {
        return state.correctWord.name;
      } else {
        return rootGetters["dictionary/translationToText"](
          state.correctWord.translation
        );
      }
    },
    isEmptyBuffers: (state) => {
      return (
        state.wordBuffer1.length === 0 &&
        state.wordBuffer2.length === 0 &&
        state.wordBuffer3.length === 0
      );
    },
  },
  mutations: {
    toggleLanguage(state) {
      state.language =
        state.language === languages.EN_LANGUAGE
          ? languages.RU_LANGUAGE
          : languages.EN_LANGUAGE;
      state.recognizer.recognition.lang =
        state.language === languages.EN_LANGUAGE
          ? languages.RU_LANGUAGE
          : languages.EN_LANGUAGE;

      localStorage.setItem("exercise.language", state.language);
    },
    setLanguage(state, language) {
      state.language = language;
      state.recognizer.recognition.lang =
        language === languages.EN_LANGUAGE
          ? languages.RU_LANGUAGE
          : languages.EN_LANGUAGE;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    toggleMode(state) {
      state.mode =
        state.mode === modes.EASY_MODE ? modes.HARD_MODE : modes.EASY_MODE;

      localStorage.setItem("exercise.mode", state.mode);
    },
    updateSearchWord(state, searchText) {
      state.searchWord = searchText;

      state.selectedWords = state.selectedWords.map(function (word) {
        word.visible = Boolean(word.name.match(new RegExp(searchText), "ui"));

        return word;
      });
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
    setRecognition(state, recognition) {
      state.recognizer.recognition = recognition;
    },
    startRecognition(state) {
      state.searchWord = "";
      state.recognizer.recognition.onresult = (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          var result = event.results[i];
          if (result.isFinal) {
            state.searchWord += result[0].transcript;
            state.recognizer.recognition.abort();
            state.recognizer.isRecognizing = false;
          }
        }
      };
      state.recognizer.recognition.start();
      state.recognizer.isRecognizing = true;
    },
    stopRecognition(state) {
      state.recognizer.recognition.abort();
      state.recognizer.isRecognizing = false;
    },
  },
  actions: {
    resetExercise({ commit, rootState }) {
      return new Promise((resolve) => {
        commit("resetExercise");
        commit("setWordBuffer1", rootState.dictionary.sourceWords);
        commit("shuffleWordBuffer1");
        commit(
          "setLanguage",
          localStorage.getItem("exercise.language") || languages.EN_LANGUAGE
        );
        commit(
          "setMode",
          localStorage.getItem("exercise.mode") || modes.EASY_MODE
        );

        resolve();
      });
    },
    async triggerNewExerciseItem({ state, dispatch, commit, getters }) {
      commit("resetSelectedWords");

      while (state.selectedWords.length < 6 && !getters.isEmptyBuffers) {
        let word = await dispatch("getWord");
        word.visible = false;
        commit("addSelectedWord", word);
      }

      if (state.selectedWords.length) {
        let correctWord = state.selectedWords.splice(
          Math.floor(Math.random() * state.selectedWords.length),
          1
        );
        correctWord = correctWord.length ? correctWord.shift() : null;

        commit("addSelectedWord", correctWord);
        commit("setCorrectWord", correctWord);
        commit("shuffleSelectedWord", correctWord);
      }
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
    async getWord({ dispatch }) {
      let bufferNum = 1;
      const probability = Math.random() * 101;

      switch (true) {
        case probability >= 95:
          bufferNum = 3;
          break;
        case probability >= 85 && probability < 95:
          bufferNum = 2;
          break;
      }

      return await dispatch("getWordInternal", {
        bufferNum,
      });
    },
    async getWordInternal({ state, dispatch }, { bufferNum, isFirst = true }) {
      return new Promise((resolve) => {
        let selected;

        switch (bufferNum) {
          case 3:
            selected = state.wordBuffer3.splice(0, 1);

            if (selected.length) {
              selected = selected.shift();
              selected.bufferNum = 3;

              resolve(selected);
            } else if (isFirst) {
              dispatch("getWordInternal", {
                bufferNum: 1,
                isFirst: false,
              }).then((selected) => resolve(selected));
            } else {
              resolve(null);
            }

            break;
          case 2:
            selected = state.wordBuffer2.splice(0, 1);

            if (selected.length) {
              selected = selected.shift();
              selected.bufferNum = 2;

              resolve(selected);
            } else {
              dispatch("getWordInternal", {
                bufferNum: isFirst ? 1 : 3,
                isFirst: false,
              }).then((selected) => resolve(selected));
            }
            break;
          default:
            selected = state.wordBuffer1.splice(0, 1);

            if (selected.length) {
              selected = selected.shift();
              selected.bufferNum = 1;

              resolve(selected);
            } else {
              dispatch("getWordInternal", {
                bufferNum: 2,
                isFirst: false,
              }).then((selected) => resolve(selected));
            }
        }
      });
    },
    async initRecognizer({ commit }) {
      let recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

      const language =
        localStorage.getItem("exercise.language") || languages.EN_LANGUAGE;

      recognition.lang =
        language === languages.EN_LANGUAGE
          ? languages.RU_LANGUAGE
          : languages.EN_LANGUAGE;

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        recognition.continuous = true;
        recognition.interimResults = true;
      }

      commit("setRecognition", recognition);
    },
  },
  modules: {},
};
