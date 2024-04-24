import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import TopicView from '../views/TopicView.vue'
import EvenementsView from '@/views/EvenementsView.vue'
import EvenementView from '../views/EvenementView.vue'
import AteliersView from '../views/AteliersView.vue'
import AtelierView from '../views/AtelierView.vue'
import VinsView from '../views/VinsView.vue'
import EcolesView from '../views/EcolesView.vue'
import CalendarView from '../views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
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
      path: '/evenement/:id',
      name: 'evenement',
      component: EvenementView,
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
    },
    {
      path: '/evenements',
      name: 'evenements',
      component: EvenementsView
    }
  ]
})

export default router
