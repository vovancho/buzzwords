import * as types from "./wordTypes";

export default [
  {
    name: "almost",
    transcription: "ˈɔlˌmoʊst",
    translation: ["почти"],
    createdAt: "2022-06-03 07:26:55",
    type: types.SIMPLE_TYPE,
  },
  {
    name: "come",
    transcription: "kām",
    translation: ["прийти"],
    createdAt: "2022-06-03 07:25:55",
    type: types.IRREGULAR_VERB_TYPE,
    v2: {
      name: "came",
      transcription: "kəm",
    },
    v3: {
      name: "come",
      transcription: "kām",
    },
    sentences: [
      {
        name: "come",
        sentence: "The cars come with a variety of extras",
        translation: "Автомобили поставляются с различными дополнениями",
      },
    ],
    phrases: [
      {
        name: "come back",
        transcription: "kʌm bæk",
        translation: ["Вернись"],
      },
    ],
  },
  {
    name: "break down",
    transcription: "breɪk daʊn",
    translation: ["разрушить", "сдаться", "разломать"],
    createdAt: "2022-06-03 07:25:55",
    type: types.PHRASAL_VERB_TYPE,
    v2: {
      name: "broke down",
      transcription: "broke daʊn",
    },
    v3: {
      name: "broken down",
      transcription: "broken daʊn",
    },
  },
];
