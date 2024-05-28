import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import QuizView from '../views/QuizView.vue'
import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView,
      meta: {
        requireAuth: false
      }
    },
   
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
   
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    },
   
  ]
})

router.beforeEach((to, from, next) => {

  const auth = useAuthStore().token

  if (to.meta.requireAuth && !auth) {
    next({ name: 'login' })
  } else {
    next()
  }
})



export default router
