<template>
  <v-card>
    <v-list>
      <v-list-item v-if="selectedWord">
        <v-list-item-content>
          <v-list-item-title v-text="selectedWord.name"> </v-list-item-title>
          <v-list-item-subtitle
            v-text="selectedWord.transcription"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon text x-large @click.stop="speak(selectedWord.name)">
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list rounded>
      <v-list-item-group multiple @change="listSelect" v-model="selectedItems">
        <v-list-item
          v-for="word in list"
          :key="word.name"
          :color="word.selected ? 'light-green' : 'red'"
        >
          <v-list-item-content>
            <v-list-item-title
              class="text-center"
              v-text="translationToText(word.translation)"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "HomeItem",
  data() {
    return {
      list: [],
      selectedWord: null,
      selectedItems: [],
    };
  },
  computed: {
    ...mapState(["sourceWords", "wordsCount"]),
  },
  methods: {
    ...mapMutations(["resetAppHeader"]),
    ...mapActions(["speak"]),
    triggerList() {
      const selectedWordIndex = Math.floor(Math.random() * 6);
      let i = 0;
      this.list = [];

      while (this.list.length < 6) {
        let word =
          this.sourceWords[Math.floor(Math.random() * this.wordsCount)];

        if (i === selectedWordIndex) {
          this.selectedWord = word;
          word.selected = true;
        } else {
          word.selected = false;
        }

        if (this.list.findIndex((item) => item.name === word.name) === -1) {
          this.list.push(word);
          i = i + 1;
        }
      }

      console.log(JSON.stringify(this.list));
    },
    translationToText(translation) {
      return translation.join(", ");
    },
    listSelect(selectedIndexes) {
      if (selectedIndexes.length === 1) {
        let selectedWord = this.list[selectedIndexes[0]];
        let rightWord = selectedWord;
        console.log(JSON.stringify([selectedIndexes, this.selectedItems]));

        if (!selectedWord.selected) {
          let selIndex = null;
          rightWord = this.list.find(function (word, idx) {
            if (word.selected) {
              selIndex = idx;

              return true;
            }

            return false;
          });

          if (rightWord) {
            this.selectedItems.push(selIndex);
            console.log(JSON.stringify([this.selectedItems, selIndex]));
          }
        }

        let $that = this;

        $that.speak(rightWord.name);
        setTimeout(function () {
          $that.selectedItems = [];
          $that.triggerList();
        }, 2000);
      }
    },
  },
  mounted() {
    this.resetAppHeader();
    this.triggerList();
  },
};
</script>
