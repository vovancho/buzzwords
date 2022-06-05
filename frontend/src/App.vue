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

    <v-bottom-navigation app :value="value" color="primary">
      <v-btn>
        <div class="font-weight-regular">
          <small>Русский</small>
        </div>
        <div class="">Язык</div>
      </v-btn>

      <v-btn>
        <span>Справка</span>
      </v-btn>

      <v-btn>
        <div class="font-weight-regular">
          <small>Сложный</small>
        </div>
        <div class="">Режим</div>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
    value: 1,
  }),
  computed: mapState({
    title: (state) => state.title,
    subTitle: (state) => state.subTitle,
  }),
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
