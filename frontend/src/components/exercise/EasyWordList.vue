<template>
  <v-list rounded>
    <v-list-item-group multiple @change="itemsSelected" v-model="selectedItems">
      <v-list-item
        v-for="(word, index) in getWordList"
        :key="index"
        :color="isCorrectWord(word) ? 'light-green' : 'red'"
        :disabled="lock"
        :value="word.name"
        @click="itemClick"
      >
        <v-list-item-content>
          <v-list-item-title
            class="text-center"
            v-text="isEnLang ? translationToText(word.translation) : word.name"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <div v-if="lock" @click="nextClick" class="lock-overlay"></div>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import * as languages from "@/store/exercise/languages";

export default {
  name: "EasyWordList",
  data() {
    return {
      timer: null,
      selectedItems: [],
      lock: false,
    };
  },
  computed: {
    ...mapState("exercise", ["selectedWords", "correctWord", "language"]),
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapGetters("exercise", ["getWordList"]),
    isEnLang() {
      return this.language === languages.EN_LANGUAGE;
    },
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
    ...mapActions("exercise", ["applyCorrectAnswer", "applyIncorrectAnswer"]),
    async itemsSelected() {
      if (!this.selectedItems.includes(this.correctWord.name)) {
        this.selectedItems.push(this.correctWord.name);
      }

      this.speak(this.correctWord.name);
    },
    itemClick() {
      this.lock = true;

      this.timer = setTimeout(() => this.nextClick(), 3000);
    },
    nextClick() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.selectedItems.length === 1) {
        this.applyCorrectAnswer();
      } else {
        this.applyIncorrectAnswer();
      }

      this.selectedItems = [];
      this.lock = false;
    },
    isCorrectWord(word) {
      return word.name === this.correctWord.name;
    },
  },
};
</script>

<style scoped lang="scss">
.lock-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
