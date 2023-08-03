import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'
import HomeView from '../views/HomeView.vue'
import AuthIndex from "@/views/auth/Index.vue"
import Login from "@/views/auth/Login.vue"
import Register from "@/views/auth/Register.vue"
import Goals from "@/views/Goals.vue"
import Report from "@/views/Report.vue"
import store from '@/store'

const routes = [
  {
    path: '/',
    name: '',
    component: IndexView,
    meta: {
      authRequired: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: HomeView,
        meta: {
          authRequired: true
        },
      },
      {
        path: 'goals',
        name: 'goals',
        component: Goals,
        meta: {
          authRequired: true
        },
      },
      {
        path: 'report',
        name: 'report',
        component: Report,
        meta: {
          authRequired: true
        },
      }
    ]
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
  if (a.meta.authRequired && !store.getters.isLoggedIn) {
    router.push({ name: "auth.login" })
  } else if (!a.meta.authRequired && store.getters.isLoggedIn) {
    router.push({ name: "dashboard" })
  }
})

export default router
