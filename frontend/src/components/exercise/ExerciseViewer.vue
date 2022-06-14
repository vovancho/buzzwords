<template>
  <v-card>
    <div v-if="correctWord">
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
      <easy-word-list v-if="isEasyMode" />
      <hard-word-list v-else />
    </div>
    <div v-else><v-card-title>Нет слов</v-card-title></div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import ChosenWord from "@/components/exercise/ChosenWord";
import EasyWordList from "@/components/exercise/EasyWordList";
import * as modes from "@/store/exercise/modes";
import HardWordList from "@/components/exercise/HardWordList";

export default {
  name: "ExerciseViewer",
  components: { HardWordList, EasyWordList, ChosenWord },
  computed: {
    ...mapState("exercise", ["correctWord", "mode"]),
    isEasyMode() {
      return this.mode === modes.EASY_MODE;
    },
  },
};
</script>

<style scoped lang="sass">
.chosen-word
  width: 100%
</style>
