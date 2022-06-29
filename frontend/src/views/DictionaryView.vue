<template>
  <v-sheet>
    <v-container>
      <v-card>
        <dictionary-search-word />
        <v-divider />
        <dictionary-items />
      </v-card>
    </v-container>
    <dictionary-bottom-navigation />
  </v-sheet>
</template>

<script>
import DictionaryBottomNavigation from "@/components/dictionary/DictionaryBottomNavigation";
import { mapMutations, mapGetters, mapActions } from "vuex";
import DictionarySearchWord from "@/components/dictionary/SearchWord";
import DictionaryItems from "@/components/dictionary/DictionaryItems";

export default {
  name: "DictionaryView",
  components: {
    DictionaryItems,
    DictionarySearchWord,
    DictionaryBottomNavigation,
  },
  computed: {
    ...mapGetters("dictionary", ["wordsCount"]),
  },
  methods: {
    ...mapMutations(["setTitle", "setSubTitle"]),
    ...mapActions("dictionary", ["resetDictionaryIfSettingsChange"]),
  },
  async mounted() {
    this.setTitle("Словарь");
    this.setSubTitle(this.$tc("wordsCount", this.wordsCount));
    await this.resetDictionaryIfSettingsChange();
  },
};
</script>
