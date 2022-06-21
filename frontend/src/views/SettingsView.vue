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

      <v-divider class="mt-5" />

      <v-subheader>Ограничить набор слов</v-subheader>
      <v-autocomplete
        hide-no-data
        hide-selected
        label="от слова"
        hint="Слова отсортированы по дате добавления"
        persistent-hint
      />
      <v-autocomplete label="до слова" hint="Выбрано 12 слов" persistent-hint />
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
    ...mapState("settings", ["groupList", "dictionaryConstraints"]),
    groupItem: {
      get() {
        return this.dictionaryConstraints.selectedGroups;
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
