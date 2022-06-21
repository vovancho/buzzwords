<template>
  <div>
    <v-subheader>Ограничить набор слов</v-subheader>
    <v-autocomplete
      v-model="fromWord"
      :items="fromWordList"
      :loading="isLoadingFromWordList"
      :search-input.sync="searchFromWord"
      hide-no-data
      hide-selected
      label="от слова"
      hint="Слова отсортированы по дате добавления"
      persistent-hint
      clearable
    />
    <v-autocomplete
      v-model="toWord"
      :items="toWordList"
      :loading="isLoadingToWordList"
      :search-input.sync="searchToWord"
      hide-no-data
      hide-selected
      label="до слова"
      clearable
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "WordConstraint",
  data: () => ({
    isLoadingFromWordList: false,
    isLoadingToWordList: false,
    searchFromWord: null,
    searchToWord: null,
  }),
  computed: {
    ...mapState("dictionary", ["sourceWords"]),
    ...mapState("settings", [
      "dictionaryConstraints",
      "fromWordList",
      "toWordList",
      "selectedWordCount",
    ]),
    fromWord: {
      get() {
        return this.dictionaryConstraints.fromWord;
      },
      set(value) {
        this.updateDictionaryConstraintsFromWord(value);
      },
    },
    toWord: {
      get() {
        return this.dictionaryConstraints.toWord;
      },
      set(value) {
        this.updateDictionaryConstraintsToWord(value);
      },
    },
  },
  watch: {
    searchFromWord(val) {
      if (!this.isLoadingFromWordList) {
        this.isLoadingFromWordList = true;
        this.updateFromWordList(val);
        this.isLoadingFromWordList = false;
      }
    },
    searchToWord(val) {
      if (!this.isLoadingToWordList) {
        this.isLoadingToWordList = true;
        this.updateToWordList(val);
        this.isLoadingToWordList = false;
      }
    },
  },
  methods: {
    ...mapActions("settings", [
      "updateDictionaryConstraintsFromWord",
      "updateDictionaryConstraintsToWord",
      "updateFromWordList",
      "updateToWordList",
    ]),
  },
};
</script>

<style scoped></style>
