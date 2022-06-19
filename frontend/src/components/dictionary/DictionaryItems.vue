<template>
  <div>
    <v-list>
      <dictionary-item
        v-for="word in viewWords"
        :word="word"
        :key="word.name + word.isShowCreatedAt"
      />
    </v-list>

    <v-pagination
      v-if="pageCount > 1"
      v-model="paginationPage"
      :length="pageCount"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "DictionaryItems",
  components: { DictionaryItem },
  computed: {
    ...mapState("dictionary", ["pagination"]),
    ...mapGetters("dictionary", ["pageCount", "viewWords"]),
    paginationPage: {
      get() {
        return this.pagination.page;
      },
      set(value) {
        this.updatePaginationPage(value);
      },
    },
  },
  methods: {
    ...mapActions("dictionary", ["updatePaginationPage"]),
  },
};
</script>

<style scoped></style>
