<template>
  <v-list rounded>
    <v-list-item-group multiple @change="itemsSelected" v-model="selectedItems">
      <v-list-item
        v-for="word in selectedWords"
        :key="word.name"
        :color="word.isCorrect ? 'light-green' : 'red'"
        :disabled="lock"
        @click="itemClick"
      >
        <v-list-item-content>
          <v-list-item-title
            class="text-center"
            v-text="translationToText(word.translation)"
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
      selectedItems: [],
      lock: false,
    };
  },
  computed: {
    ...mapState("exercise", ["selectedWords", "correctWord"]),
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapGetters("exercise", ["getCorrectWordIndex"]),
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
    ...mapActions("exercise", ["applyCorrectAnswer", "applyIncorrectAnswer"]),
    async itemsSelected() {
      if (!this.selectedItems.includes(this.getCorrectWordIndex)) {
        this.selectedItems.push(this.getCorrectWordIndex);
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

      this.selectedItems = [];
      this.lock = false;
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
