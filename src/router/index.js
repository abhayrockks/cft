import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import Guest from "../views/Guest.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Topics from "../views/admin/Topics.vue";
import Content from "../views/admin/Content.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/guest',
    name: 'Guest',
    component: Guest
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/topics',
    name: 'Topics',
    component: Topics
  },
  {
    path: '/content',
    name: 'Content',
    component: Content
  },
  // {
  //   path: '/',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('username'))
  if (!user && to.name.toLowerCase() !== 'login') {
    next({path: '/'})
  } else if (user && user !== 'leenabhay' && (to.name.toLowerCase() === 'dashboard' || to.name.toLowerCase() === 'login' || to.name.toLowerCase() === 'topics' || to.name.toLowerCase() === 'content')) {
    next({path: '/guest'})
  } else if (user && user === 'leenabhay' && to.name.toLowerCase() === 'login') {
    next({path: '/dashboard'})
  } else {
    next()
  }
})

export default router
