import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import TopicView from '../views/TopicView.vue'
import AteliersView from '../views/AteliersView.vue'
import AtelierView from '../views/AtelierView.vue'
import VinsView from '../views/VinsView.vue'
import EcolesView from '../views/EcolesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ecoles',
      name: 'ecoles',
      component: EcolesView
    },
    {
      path: '/vins',
      name: 'vins',
      component: VinsView
    },
    {
      path: '/ateliers',
      name: 'ateliers',
      component: AteliersView
    },
    {
      path: '/atelier/:id',
      name: 'atelier',
      component: AtelierView,
      props: true
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
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
