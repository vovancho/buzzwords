<template>
  <v-sheet class="d-flex" width="100%">
    <v-btn value="dictionary.back" active-class="no-active" @click="goToMain">
      <span>Назад</span>
    </v-btn>

    <v-spacer />

    <v-btn value="dictionary.sort" @click="toggleDictionarySort">
      <div class="font-weight-regular">
        <small>{{ sortButtonCaption }}</small>
      </div>
      <div class="">Сортировка</div>
    </v-btn>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as dictionary from "../store/dictionary";

export default {
  name: "DictionaryBottomNavigation",
  data: () => ({
    sortButtonCaption: "По алфавиту",
  }),
  computed: {
    ...mapState(["dictionarySort"]),
  },
  watch: {
    dictionarySort: function (val) {
      this.sortButtonCaption =
        val === dictionary.ALPHABET_SORT ? "По алфавиту" : "По дате";
    },
  },
  methods: {
    ...mapActions(["toggleDictionarySort"]),
    goToMain() {
      this.$router.push({ name: "home" }).catch(() => {});
    },
  },
};
</script>
