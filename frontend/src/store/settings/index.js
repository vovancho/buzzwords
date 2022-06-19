export default {
  namespaced: true,
  state: {
    groupList: [],
    selectedGroups: [],
  },
  getters: {},
  mutations: {
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    setSelectedGroups(state, selectedGroups) {
      state.selectedGroups = selectedGroups;
    },
  },
  actions: {
    async initGroupList({ commit, rootState }) {
      const groupList = rootState.dictionary.sourceWords
        .map((word) => word.groups || null)
        .filter((word) => Boolean(word));
      const selectedGroups =
        localStorage.getItem("settings.selectedGroups") || [];

      commit(
        "setGroupList",
        []
          .concat(...groupList)
          .filter((groupName, i, arr) => arr.indexOf(groupName) === i)
      );
      commit("setSelectedGroups", JSON.parse(selectedGroups));
    },
    async updateSelectedGroups({ commit }, selectedGroups) {
      commit("setSelectedGroups", selectedGroups);

      localStorage.setItem(
        "settings.selectedGroups",
        JSON.stringify(selectedGroups)
      );
    },
  },
  modules: {},
};
