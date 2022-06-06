<template>
  <div class="d-flex">
    <v-btn value="dictionary.back">
      <span>Назад</span>
    </v-btn>

    <v-btn value="dictionary.sort">
      <div class="font-weight-regular">
        <small>Сортировка</small>
      </div>
      <div class="">По алфавиту</div>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "DictionaryBottomNavigation",
};
</script>
