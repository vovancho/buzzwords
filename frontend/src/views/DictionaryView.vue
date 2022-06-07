<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        placeholder="Поиск (RU/EN)"
        single-line
        clearable
        filled
        @input="searchWord"
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-list>
          <dictionary-word-item
            v-for="word in words"
            :word="word"
            :key="word.name"
          />
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import DictionaryWordItem from "@/components/DictionaryWordItem";

export default {
  name: "DictionaryItem",
  components: { DictionaryWordItem },
  computed: {
    ...mapState(["wordsCount", "words"]),
  },
  methods: {
    ...mapActions(["searchWord"]),
    ...mapMutations(["setTitle", "setSubTitle"]),
  },
  mounted() {
    this.setTitle("Словарь");
    this.setSubTitle(this.$tc("wordsCount", this.wordsCount));
  },
};
</script>
