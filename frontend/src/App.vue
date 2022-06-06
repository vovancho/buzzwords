<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer v-if="title"></v-spacer>
      <v-toolbar-title v-if="title">
        <div class="text-h6 text-center">{{ title }}</div>
        <div class="text-caption text-center">{{ subTitle }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item @click="goToMain">
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToDictionary">
            <v-list-item-title>Словарь</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation app grow>
      <home-bottom-navigation app v-if="isTrainerPage" />
      <dictionary-bottom-navigation app v-else-if="isDictionaryPage" />
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomeBottomNavigation from "@/components/HomeBottomNavigation";
import DictionaryBottomNavigation from "@/components/DictionaryBottomNavigation";
import * as pages from "./store/pages";

export default {
  name: "App",
  components: {
    DictionaryBottomNavigation,
    HomeBottomNavigation,
  },
  data: () => ({
    drawer: false,
    group: null,
    value: 1,
    navButton: null,
  }),
  computed: {
    ...mapState(["title", "subTitle", "page"]),
    isTrainerPage() {
      return this.$route.name === pages.HOME_PAGE;
    },
    isDictionaryPage() {
      return this.$route.name === pages.DICTIONARY_PAGE;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    ...mapMutations(["initWordsCount"]),
    goToMain() {
      this.$router.push({ name: "home" }).catch(() => {});
    },
    goToDictionary() {
      this.$router.push({ name: "dictionary" }).catch(() => {});
    },
  },
  created: function () {
    this.initWordsCount();
  },
};
</script>
