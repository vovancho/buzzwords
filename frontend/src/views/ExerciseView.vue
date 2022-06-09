<template>
  <v-sheet>
    <v-container>
      <div v-for="n in 60" :key="n">ExerciseView {{ n }}</div>
    </v-container>
    <exercise-bottom-navigation />
  </v-sheet>
</template>

<script>
import ExerciseBottomNavigation from "@/components/exercise/ExerciseBottomNavigation";
import { mapMutations } from "vuex";

export default {
  name: "ExerciseView",
  components: { ExerciseBottomNavigation },
  methods: {
    ...mapMutations(["resetTitle"]),
  },
  mounted() {
    this.resetTitle();
  },
};
</script>
