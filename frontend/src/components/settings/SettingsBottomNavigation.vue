<template>
  <v-bottom-navigation grow app class="justify-space-between">
    <v-btn @click="$router.go(-1)">
      <span>Назад</span>

      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-subheader class="selected-word-count">
      {{ selectedWordCountDesc }}
    </v-subheader>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SettingsBottomNavigation",
  computed: {
    ...mapState("settings", ["selectedWordCount"]),
    selectedWordCountDesc() {
      return this.$tc("selectedWordCount", this.selectedWordCount);
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.selected-word-count {
  height: 100%;
  font-size: 0.7rem;
}
</style>
