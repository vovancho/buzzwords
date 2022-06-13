<template>
  <v-list-group no-action>
    <template v-slot:appendIcon>
      <div
        v-if="!word.v2 && !word.v3 && !word.phrases && !word.sentences"
      ></div>
    </template>
    <template v-slot:activator>
      <v-list-item-action class="mr-3">
        <v-btn icon text x-large @click.stop="speak(word.name)">
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="word.name"></v-list-item-title>
        <v-list-item-subtitle
          v-text="word.transcription"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content class="text-end">
        <v-list-item-subtitle
          v-text="translationToText(word.translation)"
          style="white-space: pre-line"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </template>

    <v-carousel
      :show-arrows="false"
      v-if="word.v2 || word.v3 || word.phrases || word.sentences"
    >
      <v-carousel-item v-if="word.v2 || word.v3 || word.phrases">
        <v-card>
          <v-list>
            <v-list-item v-if="word.v2">
              <v-list-item-action class="mr-3">
                <v-btn icon text x-large @click="speak(word.v2.name)">
                  <v-icon>mdi-volume-high</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="word.v2.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="word.v2.transcription"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="word.v3">
              <v-list-item-action class="mr-3">
                <v-btn icon text x-large @click="speak(word.v3.name)">
                  <v-icon>mdi-volume-high</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="word.v3.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="word.v3.transcription"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="word.v2 || word.v3" />
            <div v-if="word.phrases">
              <v-list-item v-for="phrase in wordPhrases" :key="phrase.name">
                <v-list-item-action class="mr-3">
                  <v-btn icon text x-large @click="speak(phrase.name)">
                    <v-icon>mdi-volume-high</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="phrase.name"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="phrase.transcription"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content class="text-end">
                  <v-list-item-subtitle
                    v-text="translationToText(phrase.translation)"
                    style="white-space: pre-line"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-carousel-item>
      <v-carousel-item v-if="word.sentences">
        <v-card>
          <v-list three-line v-if="word.sentences">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="word.name"></v-list-item-title>
                <div
                  v-for="sentence in word.sentences"
                  :key="sentence.sentence"
                >
                  <v-list-item-subtitle
                    v-text="sentence.sentence"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="text--darken-1"
                    v-text="sentence.translation"
                    style="white-space: pre-line"
                  ></v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list three-line v-if="word && word.v2 && word.v2.sentences">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="word.v2.name"></v-list-item-title>
                <div
                  v-for="sentence in word.v2.sentences"
                  :key="sentence.sentence"
                >
                  <v-list-item-subtitle
                    v-text="sentence.sentence"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="text--darken-1"
                    v-text="sentence.translation"
                    style="white-space: pre-line"
                  ></v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list three-line v-if="word && word.v3 && word.v3.sentences">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="word.v3.name"></v-list-item-title>
                <div
                  v-for="sentence in word.v3.sentences"
                  :key="sentence.sentence"
                >
                  <v-list-item-subtitle
                    v-text="sentence.sentence"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="text--darken-1"
                    v-text="sentence.translation"
                    style="white-space: pre-line"
                  ></v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list three-line v-if="word && word.phrases">
            <v-list-item v-for="phrase in wordPhrases" :key="phrase.name">
              <v-list-item-content v-if="phrase.sentences">
                <v-list-item-title v-text="phrase.name"></v-list-item-title>
                <div
                  v-for="sentence in phrase.sentences"
                  :key="sentence.sentence"
                >
                  <v-list-item-subtitle
                    v-text="sentence.sentence"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="text--darken-1"
                    v-text="sentence.translation"
                    style="white-space: pre-line"
                  ></v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-list-group>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "DictionaryItem",
  props: {
    word: Object,
  },
  computed: {
    ...mapGetters("dictionary", ["translationToText"]),
    ...mapState("dictionary", ["searchedWords"]),
    wordPhrases() {
      return this.searchedWords.filter((word) =>
        this.word.phrases.includes(word.name)
      );
    },
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
  },
};
</script>

<style scoped></style>
