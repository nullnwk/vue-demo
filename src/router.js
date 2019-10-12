import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router)
const routes = [
  {
    path: '/list', component: () =>
      import(/* webpackChunkName:'list'*/ "@/views/list.vue")
  },
] // (缩写) 相当于 routes: routes

export default new Router({
  mode: "hash",
  routes: routes
});