<template>
  <v-text-field
    placeholder="Поиск (RU/EN)"
    single-line
    clearable
    filled
    v-model="localSearchWord"
  ></v-text-field>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DictionarySearchWord",
  computed: {
    ...mapState("dictionary", ["searchWord"]),
    localSearchWord: {
      get() {
        return this.searchWord;
      },
      set(value) {
        this.updateSearchWord(value);
      },
    },
  },
  methods: {
    ...mapActions("dictionary", ["updateSearchWord"]),
  },
};
</script>

<style scoped></style>
