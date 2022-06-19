<template>
  <v-sheet>
    <v-container>
      <v-switch
        @change="setTheme"
        v-model="theme"
        label="Темная тема"
      ></v-switch>

      <v-select
        v-model="groupItem"
        :items="groupList"
        label="Группа"
        multiple
        chips
        hint="Выберите группу слов для тренировок"
        persistent-hint
        clearable
      ></v-select>
    </v-container>
    <settings-bottom-navigation />
  </v-sheet>
</template>

<script>
import SettingsBottomNavigation from "@/components/settings/SettingsBottomNavigation";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "SettingsView",
  components: { SettingsBottomNavigation },
  data() {
    return {
      theme: false,
    };
  },
  computed: {
    ...mapState("settings", ["groupList", "selectedGroups"]),
    groupItem: {
      get() {
        return this.selectedGroups;
      },
      set(value) {
        this.updateSelectedGroups(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setTitle"]),
    ...mapActions("settings", ["updateSelectedGroups"]),
    setTheme(value) {
      this.$vuetify.theme.dark = value;
      localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString());
    },
  },
  mounted() {
    this.setTitle("Настройки");
  },
  created() {
    this.theme = this.$vuetify.theme.dark;
  },
};
</script>
