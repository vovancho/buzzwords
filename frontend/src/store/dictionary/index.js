import * as sort from "@/store/dictionary/sort";
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
      pageSize: 15,
    },
  },
  getters: {
    wordsCount: (state, getters) => {
      return getters.groupWords.length;
    },
    groupWords: (state, getters, rootState) => {
      const selectedGroups = rootState.settings.selectedGroups;

      if (selectedGroups.length === 0) {
        return state.sourceWords;
      }

      return state.sourceWords.filter(
        (word) =>
          word.groups &&
          word.groups.filter((group) => selectedGroups.includes(group)).length
      );
    },
    searchWords: (state, getters) => {
      const words = getters.groupWords.filter((word) =>
        word.name.startsWith(state.searchWord)
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
  },
  actions: {
    updateSearchWord({ commit }, searchWord) {
      commit("setSearchWord", searchWord.toLowerCase());
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

      commit("setDictionarySort", dictionarySort);
      commit("setSearchWord", "");
      commit("setSearchedWords", [...getters.groupWords]);
    },
    async updatePaginationPage({ commit }, page) {
      commit("setPaginationPage", page);
    },
  },
  modules: {},
};
