export default {
  namespaced: true,
  state: {
    groupList: [],
    fromWordList: [],
    toWordList: [],
    dictionaryConstraints: {
      selectedGroups: [],
      fromWord: "",
      toWord: "",
    },
  },
  getters: {},
  mutations: {
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    setSelectedGroups(state, selectedGroups) {
      state.dictionaryConstraints.selectedGroups = selectedGroups;
    },
  },
  actions: {
    async initGroupList({ commit, rootState }) {
      const groupList = rootState.dictionary.sourceWords
        .map((word) => word.groups || null)
        .filter((word) => Boolean(word));
      const selectedGroups = localStorage.getItem(
        "settings.dictionaryConstraints.selectedGroups"
      );

      commit(
        "setGroupList",
        []
          .concat(...groupList)
          .filter((groupName, i, arr) => arr.indexOf(groupName) === i)
      );
      commit("setSelectedGroups", JSON.parse(selectedGroups) || []);
    },
    async updateSelectedGroups({ commit }, selectedGroups) {
      commit("setSelectedGroups", selectedGroups);

      localStorage.setItem(
        "settings.dictionaryConstraints.selectedGroups",
        JSON.stringify(selectedGroups)
      );
    },
  },
  modules: {},
};
