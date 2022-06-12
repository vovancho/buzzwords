<template>
  <v-card>
    <div v-if="selectedWords.length > 0 && correctWord">
      <v-badge
        color="info"
        overlap
        :content="correctWord.bufferNum"
        left
        class="chosen-word"
      >
        <chosen-word />
      </v-badge>

      <v-divider></v-divider>
      <easy-word-list />
    </div>
    <div v-else><v-card-title>Нет слов</v-card-title></div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import ChosenWord from "@/components/exercise/ChosenWord";
import EasyWordList from "@/components/exercise/EasyWordList";

export default {
  name: "ExerciseViewer",
  components: { EasyWordList, ChosenWord },
  computed: {
    ...mapState("exercise", ["correctWord", "selectedWords"]),
  },
};
</script>

<style scoped lang="sass">
.chosen-word
  width: 100%
</style>
