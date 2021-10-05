import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import addTask from "../views/addTask.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addTask",
    name: "addTask",
    component: addTask,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
