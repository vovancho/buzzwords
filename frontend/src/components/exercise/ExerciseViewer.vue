<template>
  <v-card class="fill-height">
    <div class="fill-height" v-if="correctWord">
      <v-badge
        color="info"
        overlap
        :content="getCorrectWordBufferNum"
        left
        class="chosen-word"
      >
        <chosen-word />
      </v-badge>

      <v-divider></v-divider>
      <easy-word-list v-if="isEasyMode" />
      <hard-word-list v-else />
    </div>
    <div class="fill-height" v-else>
      <v-card-title> Нет слов </v-card-title>
      <div class="d-flex align-center justify-center fill-height">
        <v-btn
          outlined
          x-large
          :loading="againButtonLoading"
          @click="againClick"
        >
          Заново
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ChosenWord from "@/components/exercise/ChosenWord";
import EasyWordList from "@/components/exercise/EasyWordList";
import * as modes from "@/store/exercise/modes";
import HardWordList from "@/components/exercise/HardWordList";

export default {
  name: "ExerciseViewer",
  components: { HardWordList, EasyWordList, ChosenWord },
  data() {
    return {
      againButtonLoading: false,
    };
  },
  computed: {
    ...mapState("exercise", ["correctWord", "mode"]),
    ...mapGetters("exercise", ["getCorrectWordBufferNum"]),
    isEasyMode() {
      return this.mode === modes.EASY_MODE;
    },
  },
  methods: {
    ...mapActions("exercise", [
      "resetExerciseIfSettingsChange",
      "resetExercise",
      "triggerNewExerciseItem",
    ]),
    async againClick() {
      this.againButtonLoading = true;
      await this.resetExercise();
      await this.triggerNewExerciseItem();
      this.againButtonLoading = false;
    },
  },
  async mounted() {
    await this.resetExerciseIfSettingsChange();
  },
};
</script>

<style scoped lang="sass">
.chosen-word
  width: 100%
</style>
