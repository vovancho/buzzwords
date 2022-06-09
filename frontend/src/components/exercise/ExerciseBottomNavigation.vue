<template>
  <v-bottom-navigation grow app class="justify-space-between">
    <v-btn @click="toggleLanguage">
      <span>Язык</span>

      <div class="font-weight-black text-h6">{{ languageTitle }}</div>
    </v-btn>

    <v-btn to="dictionary">
      <span>Справка</span>

      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>

    <v-btn @click="toggleMode">
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
import { createNamespacedHelpers } from "vuex";
import * as languages from "@/store/exercise/languages";
import * as modes from "@/store/exercise/modes";

const { mapMutations, mapState } = createNamespacedHelpers("exercise");

export default {
  name: "ExerciseBottomNavigation",
  computed: {
    ...mapState(["language", "mode"]),
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
    ...mapMutations(["toggleLanguage", "toggleMode"]),
  },
};
</script>

<style scoped></style>
