<template>
  <v-sheet>
    <v-container>
      <v-switch
        @change="setTheme"
        v-model="theme"
        label="Темная тема"
      ></v-switch>
      <v-btn> Normal </v-btn>
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
  data() {
    return {
      theme: false,
    };
  },
  methods: {
    ...mapMutations(["setTitle"]),
    setTheme(value) {
      this.$vuetify.theme.dark = value;
      localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString());
    },
  },
  created() {
    this.setTitle("Настройки");

    const theme = localStorage.getItem("darkTheme");

    if (theme) {
      this.theme = theme === "true";
      this.$vuetify.theme.dark = this.theme;
    }
  },
};
</script>
