import Router from "vue-router";
import Vue from "vue";

const childrenRouter = [
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/home/index.vue")
  }
]
const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import("@/views/index.vue"),
      redirect: {
        name: 'home'
      },
      children: childrenRouter
    },

  ]
})
Vue.use(Router)

export default router
