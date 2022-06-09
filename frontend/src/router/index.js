import Vue from "vue";
import VueRouter from "vue-router";
import ExerciseView from "@/views/ExerciseView.vue";
import DictionaryView from "@/views/DictionaryView.vue";
import SettingsView from "@/views/SettingsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: ExerciseView,
  },
  {
    path: "/dictionary",
    name: "dictionary",
    component: DictionaryView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/buzzwords/docs/" : "/",
  routes,
});

export default router;
