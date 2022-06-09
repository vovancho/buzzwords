import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DictionaryView from "../views/DictionaryView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dictionary",
    name: "dictionary",
    component: DictionaryView,
  },
  // {
  //   path: "/dictionary",
  //   name: "dictionary",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/DictionaryView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/buzzwords/docs/" : "/",
  routes,
});

export default router;
