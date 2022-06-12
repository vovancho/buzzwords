<template>
  <v-list>
    <v-list-item v-if="correctWord">
      <v-list-item-content>
        <v-list-item-title v-text="getCorrectWordTitle"> </v-list-item-title>
        <v-list-item-subtitle
          v-if="isEnLang"
          v-text="correctWord.transcription"
        ></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon text x-large @click.stop="speak(correctWord.name)">
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import * as languages from "@/store/exercise/languages";

export default {
  name: "ChosenWord",
  computed: {
    ...mapState("exercise", ["correctWord", "language"]),
    ...mapGetters("exercise", ["getCorrectWordTitle"]),
    isEnLang() {
      return this.language === languages.EN_LANGUAGE;
    },
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
  },
};
</script>

<style scoped></style>
