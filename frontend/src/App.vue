<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Словарь</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
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
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    value: 1,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
