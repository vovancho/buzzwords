import * as sort from "./sort";

export default {
  namespaced: true,
  state: {
    dictionarySort: sort.ALPHABET_SORT,
  },
  getters: {},
  mutations: {
    toggleDictionarySort(state) {
      state.dictionarySort =
        state.dictionarySort === sort.ALPHABET_SORT
          ? sort.DATE_ADDED_SORT
          : sort.ALPHABET_SORT;
    },
  },
  actions: {},
  modules: {},
};
