<template>
  <v-list>
    <v-list-item v-if="word">
      <v-list-item-content>
        <v-list-item-title v-text="word.name"> </v-list-item-title>
        <v-list-item-subtitle
          v-text="word.transcription"
        ></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon text x-large @click.stop="speak(word.name)">
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ChosenWord",
  props: {
    word: Object,
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
  },
};
</script>

<style scoped></style>
