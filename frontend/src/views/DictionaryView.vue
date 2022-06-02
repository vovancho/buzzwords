<template>
  <v-row>
    <v-col cols="6" v-for="n in 6" :key="n">
      <v-card class="pa-2">One of three columnssss {{ n }}</v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DictionaryItem",
};
</script>
