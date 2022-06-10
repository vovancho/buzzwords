<template>
  <v-bottom-navigation grow app class="justify-space-between">
    <v-btn @click="$router.go(-1)">
      <span>Назад</span>

      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn @click="toggleDictionarySort">
      <span>{{ dictionarySortTitle }}</span>

      <v-icon>{{ dictionarySortIcon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import * as sort from "@/store/dictionary/sort";

export default {
  name: "DictionaryBottomNavigation",
  computed: {
    ...mapState("dictionary", ["dictionarySort"]),
    dictionarySortTitle() {
      return this.dictionarySort === sort.ALPHABET_SORT
        ? "По алфавиту"
        : "По добавлению";
    },
    dictionarySortIcon() {
      return this.dictionarySort === sort.ALPHABET_SORT
        ? "mdi-sort-alphabetical-variant"
        : "mdi-sort-numeric-variant";
    },
  },
  methods: {
    ...mapMutations("dictionary", ["toggleDictionarySort"]),
  },
};
</script>

<style scoped></style>
