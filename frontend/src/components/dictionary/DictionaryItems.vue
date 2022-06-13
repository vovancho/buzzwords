<template>
  <v-list>
    <!--    <v-virtual-scroll-->
    <!--      :items="searchedWords"-->
    <!--      :item-height="76"-->
    <!--      :bench="10"-->
    <!--      :height="500"-->
    <!--    >-->
    <!--      <template v-slot:default="{ item }">-->
    <!--        <dictionary-item :word="item" />-->
    <!--      </template>-->
    <!--    </v-virtual-scroll>-->
    <dictionary-item
      v-for="word in searchedWords"
      :word="word"
      :key="word.name"
    />
  </v-list>
</template>

<script>
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import { mapState } from "vuex";

export default {
  name: "DictionaryItems",
  components: { DictionaryItem },
  computed: {
    ...mapState("dictionary", ["searchedWords"]),
  },
};
</script>

<style scoped></style>
