<template>
  <v-list rounded>
    <v-list-item>
      <v-list-item-content>
        <v-text-field
          clearable
          v-model="localSearchWord"
          placeholder="Наберите ответ"
        >
          <template v-slot:append-outer>
            <v-btn fab depressed @click="recognizeSpeech()">
              <v-icon v-if="recognizer.isRecognizing"> mdi-stop </v-icon>
              <v-icon v-else> mdi-microphone </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item-group multiple @change="itemsSelected" v-model="selectedItems">
      <v-list-item
        v-for="(word, index) in getWordList"
        :key="index"
        :color="isCorrectWord(word) ? 'light-green' : 'red'"
        :disabled="lock"
        :value="word.name"
        @click="itemClick"
        :class="visibleClass()"
      >
        <v-list-item-content>
          <v-list-item-title
            class="text-center"
            v-text="isEnLang ? translationToText(word.translation) : word.name"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div v-if="lock" @click="nextClick" class="lock-overlay"></div>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import * as languages from "@/store/exercise/languages";

export default {
  name: "HardWordList",
  data() {
    return {
      selectedItems: [],
      lock: false,
    };
  },
  computed: {
    ...mapState("exercise", [
      "selectedWordsForHard",
      "correctWord",
      "language",
      "searchWord",
      "recognizer",
    ]),
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapGetters("exercise", ["getWordList"]),
    isEnLang() {
      return this.language === languages.EN_LANGUAGE;
    },
    localSearchWord: {
      get() {
        return this.searchWord;
      },
      set(value) {
        this.updateSearchWord(value);
      },
    },
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
    ...mapActions("exercise", [
      "applyCorrectAnswer",
      "applyIncorrectAnswer",
      "stopRecognition",
      "beginRecognition",
      "updateSearchWord",
    ]),
    async itemsSelected() {
      if (!this.selectedItems.includes(this.correctWord.name)) {
        this.selectedItems.push(this.correctWord.name);
      }

      this.speak(this.correctWord.name);
    },
    itemClick() {
      this.lock = true;
    },
    nextClick() {
      if (this.selectedItems.length === 1) {
        this.applyCorrectAnswer();
      } else {
        this.applyIncorrectAnswer();
      }

      this.updateSearchWord("");
      this.selectedItems = [];
      this.lock = false;
    },
    visibleClass() {
      return [this.localSearchWord.length > 0 ? "d-flex" : "d-none"];
    },
    recognizeSpeech() {
      if (this.recognizer.isRecognizing) {
        this.stopRecognition();
      } else {
        this.beginRecognition();
      }
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
