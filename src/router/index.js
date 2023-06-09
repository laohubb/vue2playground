import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(VueRouter);
Vue.use(ElementUI);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/page1",
    name: "page1",
    component: () => import("../views/PageOne.vue"),
  },
  {
    path: "/page2",
    name: "page2",
    component: () => import("../views/PageTwo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
