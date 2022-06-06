<template>
  <v-list-group no-action>
    <template v-slot:activator>
      <v-list-item-action>
        <v-btn icon>
          <v-icon x-large>mdi-volume-high</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="word.name"></v-list-item-title>
        <v-list-item-subtitle
          v-text="word.transcription"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-spacer></v-spacer>
      <v-list-item-content class="text-end">
        <v-list-item-title v-text="word.translation"></v-list-item-title>
      </v-list-item-content>
    </template>

    <v-carousel :show-arrows="false">
      <v-carousel-item>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon x-large>mdi-volume-high</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="word.v2.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="word.v2.transcription"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon x-large>mdi-volume-high</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="word.v3.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="word.v3.transcription"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item v-for="phrase in word.phrases" :key="phrase.name">
              <v-list-item-action>
                <v-btn icon>
                  <v-icon x-large>mdi-volume-high</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="phrase.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="phrase.transcription"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-spacer></v-spacer>
              <v-list-item-content class="text-end">
                <v-list-item-title
                  v-text="phrase.translation"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
        <v-card>
          <v-list three-line>
            <v-list-item
              v-for="sentence in word.sentences"
              :key="sentence.name"
            >
              <v-list-item-content>
                <v-list-item-title v-text="sentence.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="sentence.sentence"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  class="text--darken-1"
                  v-text="sentence.translation"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    {{ word.transcription }}
  </v-list-group>
</template>

<script>
export default {
  name: "DictionaryWordItem",
  props: {
    word: Object,
  },
};
</script>
