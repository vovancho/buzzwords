<template>
  <v-sheet class="fill-height">
    <v-container style="height: 100%">
      <exercise-viewer />
    </v-container>
    <exercise-bottom-navigation />
  </v-sheet>
</template>

<script>
import ExerciseBottomNavigation from "@/components/exercise/ExerciseBottomNavigation";
import ExerciseViewer from "@/components/exercise/ExerciseViewer";
import { mapMutations } from "vuex";

export default {
  name: "ExerciseView",
  components: { ExerciseBottomNavigation, ExerciseViewer },
  methods: {
    ...mapMutations(["resetTitle"]),
  },
  mounted() {
    this.resetTitle();
  },
};
</script>
