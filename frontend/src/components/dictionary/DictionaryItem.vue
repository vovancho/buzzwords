<template>
  <div>
    <v-subheader v-if="word.isShowCreatedAt">
      {{ formattedCreateAt(word) }}
    </v-subheader>

    <v-list-group no-action :class="wordType">
      <template v-slot:appendIcon>
        <div
          v-if="!word.v2 && !word.v3 && !word.phrases && !word.sentences"
        ></div>
      </template>
      <template v-slot:activator>
        <v-list-item-action
          class="my-0 mr-3"
          :style="{ opacity: isHideNameViewMode ? 0 : 1 }"
        >
          <v-btn icon text @click.stop="speak(word.name)">
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-content
          class="py-1"
          :style="{ opacity: isHideNameViewMode ? 0 : 1 }"
        >
          <v-list-item-title
            class="white-space-pre-line"
            v-text="word.name"
          ></v-list-item-title>
          <v-list-item-subtitle
            class="white-space-pre-line"
            v-text="word.transcription"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content
          class="text-end py-1"
          :style="{ opacity: isHideTranslationViewMode ? 0 : 1 }"
        >
          <v-list-item-subtitle
            class="white-space-pre-line"
            v-text="translationToText(word.translation)"
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
                      class="white-space-pre-line"
                      v-text="translationToText(phrase.translation)"
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
                      class="mt-2"
                      v-text="sentence.sentence"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="grey--text text--darken-1 white-space-pre-line"
                      v-text="sentence.translation"
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
                      class="mt-2"
                      v-text="sentence.sentence"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="grey--text text--darken-1 white-space-pre-line"
                      v-text="sentence.translation"
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
                      class="mt-2"
                      v-text="sentence.sentence"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="grey--text text--darken-1 white-space-pre-line"
                      v-text="sentence.translation"
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
                      class="mt-2"
                      v-text="sentence.sentence"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="grey--text text--darken-1 white-space-pre-line"
                      v-text="sentence.translation"
                    ></v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-list-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import * as types from "@/store/dictionary/wordTypes";
import * as viewMode from "@/store/dictionary/viewModes";

export default {
  name: "DictionaryItem",
  props: {
    word: Object,
  },
  computed: {
    ...mapState("dictionary", ["viewMode"]),
    ...mapGetters("dictionary", [
      "translationToText",
      "formattedCreateAt",
      "wordPhrases",
    ]),
    wordType() {
      switch (this.word.type) {
        case types.PHRASAL_VERB_TYPE:
          return "word-type phrasal-verb-type";
        case types.IRREGULAR_VERB_TYPE:
          return "word-type irregular-verb-type";
        case types.PHRASE_TYPE:
          return "word-type phrase-type";
        default:
          return "";
      }
    },
    isHideTranslationViewMode() {
      return this.viewMode === viewMode.HIDE_TRANSLATION_VIEW_MODE;
    },
    isHideNameViewMode() {
      return this.viewMode === viewMode.HIDE_NAME_VIEW_MODE;
    },
  },
  methods: {
    ...mapMutations("dictionary", ["speak"]),
  },
};
</script>

<style scoped lang="scss">
.word-type {
  position: relative;

  &:after {
    display: block;
    position: absolute;
    top: 3px;
    bottom: 3px;
    content: "";
    right: 0;
  }
}
.phrasal-verb-type:after {
  border-right: 2px solid #821a1a;
}
.irregular-verb-type:after {
  border-right: 2px solid #1a2f82;
}
.phrase-type:after {
  border-right: 2px solid #1b4d0c;
}
</style>
