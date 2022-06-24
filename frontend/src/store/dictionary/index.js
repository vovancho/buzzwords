import * as sort from "@/store/dictionary/sort";
import * as viewModes from "@/store/dictionary/viewModes";
import words from "@/store/dictionary/db";

export default {
  namespaced: true,
  state: {
    sourceWords: words,
    searchedWords: [],
    dictionarySort: sort.ALPHABET_SORT,
    utterance: null,
    searchWord: "",
    pagination: {
      page: 1,
      pageSize: 20,
    },
    viewMode: viewModes.SHOW_ALL_VIEW_MODE,
  },
  getters: {
    wordsCount: (state, getters) => {
      return getters.groupWords.length;
    },
    groupWords: (state, getters, rootState, rootGetters) => {
      const sourceWords = state.sourceWords.sort(function (word1, word2) {
        if (word1.createdAt > word2.createdAt) {
          return 1;
        }
        if (word1.createdAt < word2.createdAt) {
          return -1;
        }

        return 0;
      });
      const selectedGroups =
        rootState.settings.dictionaryConstraints.selectedGroups;
      const fromWordIndex = rootState.settings.dictionaryConstraints.fromWord
        ? rootGetters["settings/groupWords"].findIndex(
            (word) =>
              word.name === rootState.settings.dictionaryConstraints.fromWord
          )
        : 0;
      const toWordIndex = rootState.settings.dictionaryConstraints.toWord
        ? rootGetters["settings/groupWords"].findIndex(
            (word) =>
              word.name === rootState.settings.dictionaryConstraints.toWord
          )
        : rootGetters["settings/groupWords"].length - 1;

      if (selectedGroups.length === 0) {
        return sourceWords.slice(fromWordIndex, toWordIndex + 1);
      }

      return sourceWords
        .filter(
          (word) =>
            word.groups &&
            word.groups.filter((group) => selectedGroups.includes(group)).length
        )
        .slice(fromWordIndex, toWordIndex + 1);
    },
    searchWords: (state, getters) => {
      const words = getters.groupWords.filter((word) =>
        word.name.startsWith(state.searchWord.toLowerCase())
      );

      return words.sort(function (word1, word2) {
        switch (state.dictionarySort) {
          case sort.ALPHABET_SORT:
            if (word1.name > word2.name) {
              return 1;
            }
            if (word1.name < word2.name) {
              return -1;
            }

            break;

          case sort.DATE_ADDED_SORT:
            if (word1.createdAt > word2.createdAt) {
              return 1;
            }
            if (word1.createdAt < word2.createdAt) {
              return -1;
            }
            break;
        }
        return 0;
      });
    },
    viewWords: (state, getters) => {
      const startSliceIndex =
        state.pagination.pageSize * (state.pagination.page - 1);

      const sliced = getters.searchWords.slice(
        startSliceIndex,
        startSliceIndex + state.pagination.pageSize
      );

      return sliced.map(function (word, index) {
        if (state.dictionarySort === sort.DATE_ADDED_SORT) {
          if (index > 0) {
            const previousWord = sliced[index - 1];

            word.isShowCreatedAt =
              getters.formattedCreateAt(previousWord) !==
              getters.formattedCreateAt(word);
          } else {
            word.isShowCreatedAt = true;
          }
        } else {
          word.isShowCreatedAt = false;
        }

        return word;
      });
    },
    translationToText: () => (translation) => {
      return translation.join(", ");
    },
    pageCount: (state, getters) => {
      if (state.pageSize !== 0) {
        return Math.ceil(
          getters.searchWords.length / state.pagination.pageSize
        );
      } else {
        return 1;
      }
    },
    formattedCreateAt: () => (word) => {
      return word.createdAt.slice(0, 10);
    },
    wordPhrases: (state) => (word) => {
      return state.sourceWords.filter((sourceWord) =>
        word.phrases.includes(sourceWord.name)
      );
    },
  },
  mutations: {
    toggleDictionarySort(state) {
      state.dictionarySort =
        state.dictionarySort === sort.ALPHABET_SORT
          ? sort.DATE_ADDED_SORT
          : sort.ALPHABET_SORT;

      localStorage.setItem("dictionary.sort", state.dictionarySort);
    },
    setUtterance(state, utterance) {
      state.utterance = utterance;
    },
    speak(state, text) {
      state.utterance.text = text;
      speechSynthesis.speak(state.utterance);
    },
    setSearchWord(state, searchWord) {
      state.searchWord = searchWord || "";
    },
    setSearchedWords(state, searchedWords) {
      state.searchedWords = searchedWords;
    },
    setPaginationPage(state, page) {
      state.pagination.page = page;
    },
    setDictionarySort(state, dictionarySort) {
      state.dictionarySort = dictionarySort;
    },
    setViewMode(state, viewMode) {
      state.viewMode = viewMode;
    },
    toggleViewMode(state) {
      switch (true) {
        case state.viewMode === viewModes.SHOW_ALL_VIEW_MODE:
          state.viewMode = viewModes.HIDE_NAME_VIEW_MODE;
          break;
        case state.viewMode === viewModes.HIDE_NAME_VIEW_MODE:
          state.viewMode = viewModes.HIDE_TRANSLATION_VIEW_MODE;
          break;
        case state.viewMode === viewModes.HIDE_TRANSLATION_VIEW_MODE:
          state.viewMode = viewModes.SHOW_ALL_VIEW_MODE;
          break;
      }

      localStorage.setItem("dictionary.viewMode", state.viewMode);
    },
  },
  actions: {
    updateSearchWord({ commit }, searchWord) {
      searchWord = searchWord || "";
      commit("setPaginationPage", 1);
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
    async initDictionary({ commit, getters }) {
      const dictionarySort =
        localStorage.getItem("dictionary.sort") || sort.ALPHABET_SORT;
      const dictionaryViewMode =
        localStorage.getItem("dictionary.viewMode") ||
        viewModes.SHOW_ALL_VIEW_MODE;

      commit("setDictionarySort", dictionarySort);
      commit("setViewMode", dictionaryViewMode);
      commit("setSearchWord", "");
      commit("setSearchedWords", [...getters.groupWords]);
    },
    async updatePaginationPage({ commit }, page) {
      commit("setPaginationPage", page);
    },
  },
  modules: {},
};
