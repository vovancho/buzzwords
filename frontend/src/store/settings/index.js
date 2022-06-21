export default {
  namespaced: true,
  state: {
    groupList: [],
    fromWordList: [],
    toWordList: [],
    selectedWordCount: 0,
    dictionaryConstraints: {
      selectedGroups: [],
      fromWord: "",
      toWord: "",
    },
  },
  getters: {
    groupWords: (state, getters, rootState) => {
      const selectedGroups = state.dictionaryConstraints.selectedGroups;

      if (selectedGroups.length === 0) {
        return rootState.dictionary.sourceWords;
      }

      return rootState.dictionary.sourceWords.filter(
        (word) =>
          word.groups &&
          word.groups.filter((group) => selectedGroups.includes(group)).length
      );
    },
    settingsCache: (state) => {
      return JSON.stringify(state.dictionaryConstraints);
    },
  },
  mutations: {
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    setSelectedGroups(state, selectedGroups) {
      state.dictionaryConstraints.selectedGroups = selectedGroups;
    },
    setDictionaryConstraintsFromWord(state, fromWord) {
      state.dictionaryConstraints.fromWord = fromWord;
    },
    setDictionaryConstraintsToWord(state, toWord) {
      state.dictionaryConstraints.toWord = toWord;
    },
    setFromWordList(state, fromWordList) {
      state.fromWordList = fromWordList;
    },
    setToWordList(state, toWordList) {
      state.toWordList = toWordList;
    },
    setSelectedWordCount(state, selectedWordCount) {
      state.selectedWordCount = selectedWordCount;
    },
  },
  actions: {
    async initGroupList({ commit, rootState, dispatch }) {
      const groupList = rootState.dictionary.sourceWords
        .map((word) => word.groups || null)
        .filter((word) => Boolean(word));
      const selectedGroups = localStorage.getItem(
        "settings.dictionaryConstraints.selectedGroups"
      );
      const fromWord = localStorage.getItem(
        "settings.dictionaryConstraints.fromWord"
      );
      const toWord = localStorage.getItem(
        "settings.dictionaryConstraints.toWord"
      );

      commit(
        "setGroupList",
        []
          .concat(...groupList)
          .filter((groupName, i, arr) => arr.indexOf(groupName) === i)
      );
      commit("setSelectedGroups", JSON.parse(selectedGroups) || []);

      if (fromWord) {
        commit("setFromWordList", [fromWord]);
        commit("setDictionaryConstraintsFromWord", fromWord || "");
      }
      if (toWord) {
        commit("setToWordList", [toWord]);
        commit("setDictionaryConstraintsToWord", toWord || "");
      }

      await dispatch("updateSelectedWordCount");
    },
    async updateSelectedGroups(
      { commit, state, rootState, dispatch },
      selectedGroups
    ) {
      if (state.dictionaryConstraints.fromWord) {
        const fromWordItem = rootState.dictionary.sourceWords.find(
          (word) => word.name === state.dictionaryConstraints.fromWord
        );

        if (fromWordItem) {
          const fromWordGroups = fromWordItem.groups || [];

          if (
            selectedGroups.length &&
            !fromWordGroups.filter((group) => selectedGroups.includes(group))
              .length
          ) {
            await dispatch("updateDictionaryConstraintsFromWord", "");
          }
        }
      }
      if (state.dictionaryConstraints.toWord) {
        const toWordItem = rootState.dictionary.sourceWords.find(
          (word) => word.name === state.dictionaryConstraints.toWord
        );

        if (toWordItem) {
          const toWordGroups = toWordItem.groups || [];

          if (
            selectedGroups.length &&
            !toWordGroups.filter((group) => selectedGroups.includes(group))
              .length
          ) {
            await dispatch("updateDictionaryConstraintsToWord", "");
          }
        }
      }

      commit("setSelectedGroups", selectedGroups);
      await dispatch("updateSelectedWordCount");

      localStorage.setItem(
        "settings.dictionaryConstraints.selectedGroups",
        JSON.stringify(selectedGroups)
      );
    },
    async updateDictionaryConstraintsFromWord({ commit, dispatch }, fromWord) {
      fromWord = fromWord || "";
      commit("setDictionaryConstraintsFromWord", fromWord);

      await dispatch("updateSelectedWordCount");

      localStorage.setItem("settings.dictionaryConstraints.fromWord", fromWord);
    },
    async updateDictionaryConstraintsToWord({ commit, dispatch }, toWord) {
      toWord = toWord || "";
      commit("setDictionaryConstraintsToWord", toWord);

      await dispatch("updateSelectedWordCount");

      localStorage.setItem("settings.dictionaryConstraints.toWord", toWord);
    },
    async updateFromWordList({ commit, state, getters }, search) {
      if (!search) {
        commit("setFromWordList", []);
      } else {
        const toWordIndex = state.dictionaryConstraints.toWord
          ? getters.groupWords.findIndex(
              (word) => word.name === state.dictionaryConstraints.toWord
            )
          : getters.groupWords.length - 1;

        const items = getters.groupWords
          .slice(0, toWordIndex + 1)
          .filter((word) => word.name.startsWith(search.toLowerCase()))
          .map((word) => word.name);

        commit("setFromWordList", items);
      }
    },
    async updateToWordList({ commit, state, getters }, search) {
      if (!search) {
        commit("setToWordList", []);
      } else {
        const fromWordIndex = state.dictionaryConstraints.fromWord
          ? getters.groupWords.findIndex(
              (word) => word.name === state.dictionaryConstraints.fromWord
            )
          : 0;

        const items = getters.groupWords
          .slice(fromWordIndex, getters.groupWords.length)
          .filter((word) => word.name.startsWith(search.toLowerCase()))
          .map((word) => word.name);

        commit("setToWordList", items);
      }
    },
    async updateSelectedWordCount({ state, commit, getters }) {
      const fromWordIndex = state.dictionaryConstraints.fromWord
        ? getters.groupWords.findIndex(
            (word) => word.name === state.dictionaryConstraints.fromWord
          )
        : 0;
      const toWordIndex = state.dictionaryConstraints.toWord
        ? getters.groupWords.findIndex(
            (word) => word.name === state.dictionaryConstraints.toWord
          )
        : getters.groupWords.length - 1;

      commit(
        "setSelectedWordCount",
        getters.groupWords.slice(fromWordIndex, toWordIndex + 1).length
      );
    },
  },
  modules: {},
};
