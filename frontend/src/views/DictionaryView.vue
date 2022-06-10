<template>
  <v-sheet>
    <v-container>
      <div v-for="n in 60" :key="n">DictionaryView {{ n }}</div>
    </v-container>
    <dictionary-bottom-navigation />
  </v-sheet>
</template>

<script>
import DictionaryBottomNavigation from "@/components/dictionary/DictionaryBottomNavigation";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "DictionaryView",
  components: { DictionaryBottomNavigation },
  computed: {
    ...mapGetters("dictionary", ["wordsCount"]),
  },
  methods: {
    ...mapMutations(["setTitle", "setSubTitle"]),
  },
  mounted() {
    this.setTitle("Словарь");
    this.setSubTitle(this.$tc("wordsCount", this.wordsCount));
  },
};
</script>
