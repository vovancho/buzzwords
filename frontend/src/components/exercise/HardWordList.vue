<template>
  <v-list rounded class="fill-height">
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
    <div class="fill-height hard-word-list-items">
      <v-list-item-group
        multiple
        @change="itemsSelected"
        v-model="selectedItems"
      >
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
              class="text-center white-space-pre-line"
              v-text="
                isEnLang ? translationToText(word.translation) : word.name
              "
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <div v-if="lock" @click="nextClick" class="lock-overlay"></div>
    </div>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "HardWordList",
  data() {
    return {
      selectedItems: [],
      timer: null,
    };
  },
  computed: {
    ...mapState("exercise", [
      "correctWord",
      "language",
      "searchWord",
      "recognizer",
      "lock",
    ]),
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapGetters("exercise", ["getWordList", "isCorrectWord", "isEnLang"]),
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
    ...mapMutations("exercise", ["setLock"]),
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
      this.setLock(true);

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

      this.updateSearchWord("");
      this.selectedItems = [];
      this.setLock(false);
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
  },
  watch: {
    localSearchWord(val) {
      if (val === this.correctWord.name && this.getWordList.length === 1) {
        this.itemsSelected();
        this.itemClick();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.hard-word-list-items {
  position: relative;
}

.lock-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
