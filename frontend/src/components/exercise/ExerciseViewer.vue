<template>
  <v-card>
    <chosen-word :word="correctWord" />
    <v-divider></v-divider>
    <easy-word-list />
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChosenWord from "@/components/exercise/ChosenWord";
import EasyWordList from "@/components/exercise/EasyWordList";

export default {
  name: "ExerciseViewer",
  components: { EasyWordList, ChosenWord },
  computed: {
    ...mapState("exercise", ["correctWord"]),
  },
  methods: {
    ...mapActions("exercise", ["triggerNewExerciseItem", "resetExercise"]),
  },
  mounted() {
    this.resetExercise();
    this.triggerNewExerciseItem();
  },
};
</script>

<style scoped></style>
