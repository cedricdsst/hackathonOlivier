import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import TopicView from '../views/TopicView.vue'
import TestView from '../views/TestView.vue'
import NewHomeView from '@/views/NewHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewHomeView
    },
    {
      path: '/topic/:topicId',
      name: 'topic',
      component: TopicView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/test',
      name: 'test',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
