<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer v-if="title" />
      <v-toolbar-title v-if="title">
        <div class="text-h6 text-center">{{ title }}</div>
        <div class="text-caption text-center" v-if="subTitle">
          {{ subTitle }}
        </div>
      </v-toolbar-title>
      <v-spacer v-if="title" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-school-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Тренировка</v-list-item-title>
          </v-list-item>

          <v-list-item to="settings">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>

          <v-list-item to="dictionary">
            <v-list-item-icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Словарь</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapState(["title", "subTitle"]),
    ...mapGetters("dictionary", ["wordsCount"]),
  },
  methods: {
    ...mapActions("dictionary", ["initSpeakLanguage"]),
  },
  created: function () {
    this.initSpeakLanguage();
  },
};
</script>
