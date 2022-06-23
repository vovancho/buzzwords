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
            class="text-center white-space-pre-line"
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

export default {
  name: "EasyWordList",
  data() {
    return {
      timer: null,
      selectedItems: [],
    };
  },
  computed: {
    ...mapState("exercise", [
      "correctWord",
      "easySelectedWords",
      "language",
      "lock",
    ]),
    ...mapState("settings", ["autoSpeech"]),
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapGetters("exercise", ["getWordList", "isCorrectWord", "isEnLang"]),
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
    ...mapMutations("exercise", ["setLock"]),
    ...mapActions("exercise", ["applyCorrectAnswer", "applyIncorrectAnswer"]),
    async itemsSelected() {
      if (!this.selectedItems.includes(this.correctWord.name)) {
        this.selectedItems.push(this.correctWord.name);
      }

      if (this.autoSpeech) {
        this.speak(this.correctWord.name);
      }
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

      this.selectedItems = [];
      this.setLock(false);
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
