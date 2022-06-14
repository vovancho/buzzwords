<template>
  <v-bottom-navigation grow app class="justify-space-between">
    <v-btn @click="toggleLanguage" :disabled="lock">
      <span>Язык</span>

      <div class="font-weight-black text-h6">{{ languageTitle }}</div>
    </v-btn>

    <v-btn to="dictionary" :disabled="lock">
      <span>Справка</span>

      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>

    <v-btn @click="toggleMode" :disabled="lock">
      <span>Режим</span>

      <div
        class="font-weight-black text-h6"
        :class="{ 'deep-orange--text': isHardMode }"
      >
        {{ modeTitle }}
      </div>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import * as languages from "@/store/exercise/languages";
import * as modes from "@/store/exercise/modes";

export default {
  name: "ExerciseBottomNavigation",
  computed: {
    ...mapState("exercise", ["language", "mode", "lock"]),
    languageTitle() {
      return this.language === languages.EN_LANGUAGE ? "EN" : "RU";
    },
    modeTitle() {
      return this.mode === modes.EASY_MODE ? "EASY" : "HARD";
    },
    isHardMode() {
      return this.mode === modes.HARD_MODE;
    },
  },
  methods: {
    ...mapMutations("exercise", ["toggleLanguage", "toggleMode"]),
  },
};
</script>

<style scoped></style>
