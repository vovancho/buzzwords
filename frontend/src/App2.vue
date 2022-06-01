<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
