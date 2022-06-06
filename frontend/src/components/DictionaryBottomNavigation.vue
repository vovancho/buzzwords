<template>
  <v-sheet class="d-flex" width="100%">
    <v-btn value="dictionary.back" active-class="no-active" @click="goToMain">
      <span>Назад</span>
    </v-btn>

    <v-spacer />

    <v-btn value="dictionary.sort">
      <div class="font-weight-regular">
        <small>Сортировка</small>
      </div>
      <div class="">По алфавиту</div>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: "DictionaryBottomNavigation",
  methods: {
    goToMain() {
      this.$router.push({ name: "home" }).catch(() => {});
    },
  },
};
</script>
