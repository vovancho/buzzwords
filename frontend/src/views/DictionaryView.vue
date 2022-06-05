<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        placeholder="Поиск (RU/EN)"
        single-line
        clearable
        filled
      ></v-text-field>
    </v-col>
    <v-col cols="6" v-for="n in 6" :key="n">
      <v-card class="pa-2">One of three columnssss {{ n }}</v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "DictionaryItem",
  computed: mapState({
    wordsCount: (state) => state.wordsCount,
  }),
  methods: {
    ...mapMutations(["setTitle", "setSubTitle"]),
  },
  mounted() {
    this.setTitle("Словарь");
    this.setSubTitle(this.$tc("wordsCount", this.wordsCount));
  },
};
</script>
