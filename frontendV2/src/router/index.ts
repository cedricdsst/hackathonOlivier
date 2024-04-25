import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import TopicView from '../views/TopicView.vue';
import EvenementsView from '@/views/EvenementsView.vue';
import EvenementView from '../views/EvenementView.vue';
import AteliersView from '../views/AteliersView.vue';
import EcolesView from '../views/EcolesView.vue';
import CalendarView from '../views/CalendarView.vue';
import DashboardView from '../views/DashboardView.vue';
import PagesView from '../views/PagesView.vue';
import VinsView from '../views/VinsView.vue';
import AtelierView from '../views/AtelierView.vue'; // Pas utilisé pour le moment

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
    },
    {
      path: '/admin',
      component: DashboardView,
      name: 'admin',
      children: [
        {
          path: 'pages',
          name: 'admin-pages',
          component: PagesView
        },
        {
          path: 'ateliers',
          name: 'admin-ateliers',
          component: AteliersView
        },
        {
          path: '/atelier/:id',
          name: 'atelier',
          component: AtelierView,
          props: true
        },
        {
          path: 'vins',
          name: 'admin-vins',
          component: VinsView
        },
        {
          path: 'ecoles',
          name: 'admin-ecoles',
          component: EcolesView
        }
      ]
    }
  ]
});

export default router;
