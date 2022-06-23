<template>
  <v-bottom-navigation grow app>
    <v-container class="d-flex justify-space-between py-0">
      <v-btn @click="$router.go(-1)">
        <span>Назад</span>

        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn class="font-weight-thin" @click="toggleViewMode">
        <span
          class="font-weight-medium"
          :class="dictionaryViewButtonClass('show_all_view_mode')"
        >
          Показать все
        </span>
        <span
          class="font-weight-medium"
          :class="dictionaryViewButtonClass('hide_translation_view_mode')"
        >
          Скрыть перевод
        </span>
        <span
          class="font-weight-medium"
          :class="dictionaryViewButtonClass('hide_name_view_mode')"
        >
          Скрыть слова
        </span>
      </v-btn>

      <v-btn @click="toggleDictionarySort">
        <span>{{ dictionarySortTitle }}</span>

        <v-icon>{{ dictionarySortIcon }}</v-icon>
      </v-btn>
    </v-container>
  </v-bottom-navigation>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import * as sort from "@/store/dictionary/sort";
import * as viewMode from "@/store/dictionary/viewModes";

export default {
  name: "DictionaryBottomNavigation",
  computed: {
    ...mapState("dictionary", ["dictionarySort", "viewMode"]),
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
    ...mapMutations("dictionary", ["toggleDictionarySort", "toggleViewMode"]),
    dictionaryViewButtonClass(currentViewMode) {
      switch (true) {
        case currentViewMode === viewMode.SHOW_ALL_VIEW_MODE &&
          this.viewMode === viewMode.SHOW_ALL_VIEW_MODE:
        case currentViewMode === viewMode.HIDE_TRANSLATION_VIEW_MODE &&
          this.viewMode === viewMode.HIDE_TRANSLATION_VIEW_MODE:
        case currentViewMode === viewMode.HIDE_NAME_VIEW_MODE &&
          this.viewMode === viewMode.HIDE_NAME_VIEW_MODE:
          return "light-green--text text--darken-1";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped></style>
