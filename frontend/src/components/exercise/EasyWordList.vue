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
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

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
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
    itemsSelected() {
      const correctIndex = this.selectedWords.findIndex(
        (word) => word.name === this.correctWord.name
      );

      if (!this.selectedItems.includes(correctIndex)) {
        this.selectedItems.push(correctIndex);
      }

      this.speak(this.correctWord.name);
    },
    itemClick() {
      this.lock = true;
    },
  },
};
</script>

<style scoped></style>
