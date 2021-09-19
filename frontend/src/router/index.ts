import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Catalogo",
    component: Home,
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
