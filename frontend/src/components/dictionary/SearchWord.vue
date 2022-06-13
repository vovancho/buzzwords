<template>
  <v-text-field
    placeholder="Поиск (RU/EN)"
    single-line
    clearable
    filled
    @input="triggerSearchWord"
    v-model="localSearchWord"
  ></v-text-field>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DictionarySearchWord",
  computed: {
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
    ...mapActions("dictionary", ["updateSearchWord", "triggerSearchWord"]),
  },
};
</script>

<style scoped></style>
