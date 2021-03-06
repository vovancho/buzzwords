import * as languages from "./languages";
import * as modes from "./modes";

export default {
  namespaced: true,
  state: {
    language: languages.EN_LANGUAGE,
    mode: modes.EASY_MODE,
    correctWord: null,
    searchWord: "",
    easySelectedWords: [],
    hardSelectedWords: [],
    wordBuffer1: [],
    wordBuffer2: [],
    wordBuffer3: [],
    wordBufferIndex: {},
    wordRuBufferIndex: {},
    randomWordBuffer: [],
    recognizer: {
      recognition: null,
      isRecognizing: false,
    },
    lock: false,
    localSettingsCache: "",
  },
  getters: {
    getCorrectWordBufferNum: (state) => {
      return state.correctWord.bufferNum;
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
    getWordList: (state) => {
      if (state.mode === modes.EASY_MODE) {
        return [state.correctWord, ...state.easySelectedWords].sort(
          () => Math.random() - 0.5
        );
      } else {
        return [...state.hardSelectedWords].sort(() => Math.random() - 0.5);
      }
    },
    isCorrectWord: (state) => (word) => {
      return word.name === state.correctWord.name;
    },
    isEnLang: (state) => {
      return state.language === languages.EN_LANGUAGE;
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
    setLock(state, isLock) {
      state.lock = isLock;
    },
    toggleMode(state) {
      state.mode =
        state.mode === modes.EASY_MODE ? modes.HARD_MODE : modes.EASY_MODE;

      localStorage.setItem("exercise.mode", state.mode);
    },
    setHardSelectedWords(state, hardSelectedWords) {
      state.hardSelectedWords = hardSelectedWords;
    },
    setCorrectWord(state, correctWord) {
      state.correctWord = Object.assign({}, correctWord);
    },
    addEasySelectedWord(state, word) {
      state.easySelectedWords.push(word);
    },
    setWordBuffer1(state, wordBuffer) {
      wordBuffer = wordBuffer.map(function (word) {
        word.bufferNum = 1;

        return word;
      });
      state.wordBuffer1 = wordBuffer;
    },
    addWordBuffer(state, { word, num }) {
      switch (num) {
        case 3:
          word.bufferNum = 3;
          state.wordBuffer3.push(word);
          break;
        case 2:
          word.bufferNum = 2;
          state.wordBuffer2.push(word);
          break;
        case 1:
          word.bufferNum = 1;
          state.wordBuffer1.push(word);
          break;
      }
    },
    resetExercise(state) {
      state.correctWord = null;
      state.wordBuffer1 = [];
      state.wordBuffer2 = [];
      state.wordBuffer3 = [];
      state.wordBufferIndex = {};
      state.wordRuBufferIndex = {};
    },
    resetSelectedWords(state) {
      state.easySelectedWords = [];
      state.hardSelectedWords = [];
      state.correctWord = null;
    },
    shuffleWordBuffer1(state) {
      state.wordBuffer1.sort(() => Math.random() - 0.5);
    },
    setSearchWord(state, searchWord) {
      state.searchWord = searchWord;
    },
    abortRecognition(state) {
      state.recognizer.recognition.abort();
    },
    startRecognition(state) {
      state.recognizer.recognition.start();
    },
    setIsRecognizing(state, isRecognizing) {
      state.recognizer.isRecognizing = isRecognizing;
    },
    setRecognitionOnResult(state, onResult) {
      state.recognizer.recognition.onresult = onResult;
    },
    setRecognition(state, recognition) {
      state.recognizer.recognition = recognition;
    },
    addWordBufferIndex(state, config) {
      state.wordBufferIndex[config.name] = {
        bufferNum: config.bufferNum,
      };
    },
    addWordRuBufferIndex(state, config) {
      if (Array.isArray(state.wordRuBufferIndex[config.translation])) {
        state.wordRuBufferIndex[config.translation].push(config.name);
      } else {
        state.wordRuBufferIndex[config.translation] = [config.name];
      }
    },
    setRandomWordBuffer(state, randomWords) {
      state.randomWordBuffer = randomWords;
    },
    setLocalSettingsCache(state, localSettingsCache) {
      state.localSettingsCache = localSettingsCache;
    },
  },
  actions: {
    async updateSearchWord({ commit, dispatch }, searchText) {
      searchText = searchText || "";
      commit("setSearchWord", searchText);

      await dispatch("foundHardModeList");
    },
    async beginRecognition({ commit, dispatch }) {
      commit("setSearchWord", "");
      commit("setRecognitionOnResult", async (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          var result = event.results[i];
          if (result.isFinal) {
            commit("setSearchWord", result[0].transcript);

            await dispatch("foundHardModeList");

            commit("abortRecognition");
            commit("setIsRecognizing", false);
          }
        }
      });

      commit("startRecognition");
      commit("setIsRecognizing", true);
    },
    stopRecognition({ commit }) {
      commit("abortRecognition");
      commit("setIsRecognizing", false);
    },
    resetExercise({ commit, rootGetters, dispatch }) {
      return new Promise((resolve) => {
        const language =
          localStorage.getItem("exercise.language") || languages.EN_LANGUAGE;
        const mode = localStorage.getItem("exercise.mode") || modes.EASY_MODE;

        commit("setLanguage", language);
        commit("setMode", mode);
        commit("resetExercise");
        commit("setWordBuffer1", [...rootGetters["dictionary/groupWords"]]);
        commit("shuffleWordBuffer1");
        dispatch("buildBufferIndex");
        dispatch("buildWordRuBufferIndex");

        resolve();
      });
    },
    async triggerNewExerciseItem({ state, dispatch, commit, getters }) {
      commit("resetSelectedWords");

      if (!getters.isEmptyBuffers) {
        commit("setCorrectWord", await dispatch("pullWord"));

        await dispatch("initRandomWordBuffer");

        while (
          state.easySelectedWords.length < 5 &&
          state.randomWordBuffer.length
        ) {
          commit("addEasySelectedWord", await dispatch("getRandomWord"));
        }
      }
    },
    async applyCorrectAnswer({ state, commit, dispatch }) {
      commit("addWordBuffer", {
        word: state.correctWord,
        num: state.correctWord.bufferNum + 1,
      });

      dispatch("triggerNewExerciseItem");
    },
    async applyIncorrectAnswer({ state, commit, dispatch }) {
      commit("addWordBuffer", {
        word: state.correctWord,
        num: state.correctWord.bufferNum,
      });

      dispatch("triggerNewExerciseItem");
    },
    async getRandomWord({ state, commit }) {
      let randomWordBuffer = [...state.randomWordBuffer];
      const randomWord = randomWordBuffer.splice(0, 1);

      if (randomWord) {
        commit("setRandomWordBuffer", randomWordBuffer);

        return randomWord.shift();
      } else {
        return null;
      }
    },
    async pullWord({ dispatch }) {
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

      return await dispatch("pullWordInternal", {
        bufferNum,
      });
    },
    async pullWordInternal({ dispatch }, { bufferNum, checkFirst = true }) {
      return dispatch("pullWordFromBuffer", bufferNum).then(function (word) {
        return new Promise((resolve) => {
          if (word) {
            resolve(word);
          } else {
            switch (bufferNum) {
              case 3:
                if (checkFirst) {
                  dispatch("pullWordInternal", {
                    bufferNum: 1,
                    checkFirst: false,
                  }).then((word) => resolve(word));
                } else {
                  resolve(null);
                }

                break;
              case 2:
                dispatch("pullWordInternal", {
                  bufferNum: checkFirst ? 1 : 3,
                  checkFirst: false,
                }).then((word) => resolve(word));

                break;
              default:
                dispatch("pullWordInternal", {
                  bufferNum: 2,
                  checkFirst: false,
                }).then((word) => resolve(word));
            }
          }
        });
      });
    },
    async pullWordFromBuffer({ state }, bufferNum) {
      return new Promise((resolve) => {
        let word;

        switch (bufferNum) {
          case 3:
            word = state.wordBuffer3.splice(0, 1);
            break;
          case 2:
            word = state.wordBuffer2.splice(0, 1);
            break;
          default:
            word = state.wordBuffer1.splice(0, 1);
        }

        if (word && word.length) {
          resolve(word.shift());
        } else {
          resolve(null);
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
    async buildBufferIndex({ rootState, commit }) {
      [...rootState.dictionary.sourceWords].forEach(function (word) {
        commit("addWordBufferIndex", {
          name: word.name,
          bufferNum: 1,
        });
      });
    },
    async buildWordRuBufferIndex({ rootState, commit }) {
      [...rootState.dictionary.sourceWords].forEach(function (word) {
        word.translation.forEach(function (translationText) {
          commit("addWordRuBufferIndex", {
            name: word.name,
            translation: translationText,
          });
        });
      });
    },
    async initRandomWordBuffer({ rootState, commit, state, rootGetters }) {
      const randomWordBuffer = [...rootState.dictionary.sourceWords]
        .filter((word) => word.name !== state.correctWord.name)
        // ?????????????????? ?????????????????????????? ????????????????
        .filter(function (word, index, buffer) {
          if (state.language === languages.EN_LANGUAGE) {
            const wordIndex = rootGetters["dictionary/translationToText"](
              word.translation
            );
            const correctWordIndex = rootGetters[
              "dictionary/translationToText"
            ](state.correctWord.translation);

            if (wordIndex === correctWordIndex) {
              return false;
            }

            return (
              buffer.findIndex(function (wordBuf) {
                const wordBufIndex = rootGetters[
                  "dictionary/translationToText"
                ](wordBuf.translation);

                return wordBufIndex === wordIndex;
              }) === index
            );
          } else {
            return true;
          }
        })
        .sort(() => Math.random() - 0.5);
      commit("setRandomWordBuffer", randomWordBuffer);
    },
    async foundHardModeList({ state, commit }) {
      let founded;
      let words = [];

      let hardSelectedWords = [];
      if (!state.searchWord) {
        return;
      }

      if (state.language === languages.EN_LANGUAGE) {
        founded = Object.fromEntries(
          Object.entries(state.wordRuBufferIndex).filter(([key]) =>
            key.startsWith(state.searchWord.toLowerCase())
          )
        );

        Object.keys(founded).map(function (translation) {
          founded[translation].forEach(function (word) {
            words.push(word);
          });
        });
      } else {
        founded = Object.fromEntries(
          Object.entries(state.wordBufferIndex).filter(([key]) =>
            key.startsWith(state.searchWord.toLowerCase())
          )
        );

        words = Object.keys(founded);
      }

      let tmpWord;
      words.splice(0, 6).forEach(function (wordIndex) {
        tmpWord = [...state.randomWordBuffer, state.correctWord]
          .sort(() => Math.random() - 0.5)
          .find((word) => word.name === wordIndex);

        hardSelectedWords.push(tmpWord);
      });

      hardSelectedWords = hardSelectedWords.filter((word) => Boolean(word));

      commit("setHardSelectedWords", hardSelectedWords);
    },
    async resetExerciseIfSettingsChange({
      state,
      commit,
      rootGetters,
      dispatch,
    }) {
      if (state.localSettingsCache === "") {
        commit("setLocalSettingsCache", rootGetters["settings/settingsCache"]);
      }

      if (state.localSettingsCache !== rootGetters["settings/settingsCache"]) {
        await dispatch("resetExercise");
        await dispatch("triggerNewExerciseItem");

        commit("setLocalSettingsCache", rootGetters["settings/settingsCache"]);
      }
    },
  },
  modules: {},
};
