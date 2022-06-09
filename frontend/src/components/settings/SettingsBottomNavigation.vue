<template>
  <v-bottom-navigation grow app class="justify-space-between">
    <v-btn @click="$router.go(-1)">
      <span>Назад</span>

      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "SettingsBottomNavigation",
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
