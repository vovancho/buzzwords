<template>
  <div class="d-flex">
    <v-btn value="trainer.lang">
      <div class="font-weight-regular">
        <small>Русский</small>
      </div>
      <div class="">Язык</div>
    </v-btn>

    <v-btn value="trainer.help">
      <span>Справка</span>
    </v-btn>

    <v-btn value="trainer.mode">
      <div class="font-weight-regular">
        <small>Сложный</small>
      </div>
      <div class="">Режим</div>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "HomeBottomNavigation",
};
</script>
