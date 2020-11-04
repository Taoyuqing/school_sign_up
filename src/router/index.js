import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Entry from "../views/entry/Entry.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "entry",
    component: Entry
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
