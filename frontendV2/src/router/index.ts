import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import TopicView from '../views/TopicView.vue'
import EvenementView from '../views/EvenementView.vue'
import DashboardView from '../views/DashboardView.vue';
import PagesView from '../views/PagesView.vue';
import AteliersView from '../views/AteliersView.vue';
import CaveView from '../views/CaveView.vue';
import EcolesView from '../views/EcolesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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

      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/evenement/:id',
      name: 'evenement',
      component: EvenementView
    },
    {
      path: '/admin',
      component: DashboardView,
      name: 'admin',
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: DashboardView
        },
        {
          path: 'pages',
          name: 'pages',
          component: PagesView
        },
        {
          path: 'ateliers',
          name: 'ateliers',
          component: AteliersView
        },
        {
          path: 'cave',
          name: 'cave',
          component: CaveView
        },
        {
          path: 'ecoles',
          name: 'ecoles',
          component: EcolesView
        }
      ]
    },
  ]
})

export default router
