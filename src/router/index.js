import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthIndex from "@/views/auth/Index.vue"
import Login from "@/views/auth/Login.vue"
import Register from "@/views/auth/Register.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/auth',
    name: "auth",
    component: AuthIndex,
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: Login,
      },
      {
        path: 'register',
        name: 'auth.register',
        component: Register,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((a, b) => {
  // console.log(a);
  if (a.meta.authRequired) {
    router.push({ name: "auth.login" })
  }
})

export default router
