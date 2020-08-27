import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Add from "../views/Add.vue";
import Collect from "../views/Collect.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: ()=>import('../views/Home.vue'),
    meta:{keepAlive:true}
  },
  {
    path: "/list",
    name: "list",
    component: ()=>import('../views/List.vue'),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: ()=>import('../views/Detail.vue'),
  },
  {
    path: "/add",
    name: "add",
    component: ()=>import('../views/Add.vue'),
  },
  {
    path: "/collect",
    name: "collect",
    component: ()=>import('../views/Collect.vue'),
  },
  // {
  //   path: "/detail",
  //   name: "detail",
  //   component: ()=>import('../views/Detail.vue'),
  // },
  {
    path: "*",
    redirect: "/home"
  },
];

const router = new VueRouter({
  routes
});

export default router;
