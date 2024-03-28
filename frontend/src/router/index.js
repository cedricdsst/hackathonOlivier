import { createWebHistory, createRouter } from "vue-router";

const routes = [

    {
        path: "/",
        component: () => import('../components/HomeView.vue'),
    },
    {
        path: "/nav",
        component: () => import('../components/NavBar.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})



export default router;