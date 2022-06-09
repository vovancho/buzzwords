<template>
  <v-sheet>
    <v-container>
      <div v-for="n in 60" :key="n">SettingsView {{ n }}</div>
    </v-container>
    <settings-bottom-navigation />
  </v-sheet>
</template>

<script>
import SettingsBottomNavigation from "@/components/settings/SettingsBottomNavigation";
import { mapMutations } from "vuex";

export default {
  name: "SettingsView",
  components: { SettingsBottomNavigation },
  methods: {
    ...mapMutations(["setTitle"]),
  },
  mounted() {
    this.setTitle("Настройки");
  },
};
</script>
