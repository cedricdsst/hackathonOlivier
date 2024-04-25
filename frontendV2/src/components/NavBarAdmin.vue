<template>
    <div id="sidebar-admin">
        <!-- Logo -->
        <div>
            <a href="#">
                <img src="@/assets/img/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo admin-img">
            </a>
        </div>

        <!-- Liens -->
        <div class="admin-nav-link">
            <router-link :to="{ name: 'admin' }"><img src="@/assets/icons/dashboard-svgrepo-com.svg" class="logo-admin" />Tableau de bord</router-link>
            <router-link :to="{ name: 'admin-pages' }"><img src="@/assets/icons/calendar-svgrepo-com.svg" class="logo-admin" />Pages</router-link>
            <router-link :to="{ name: 'admin-ateliers' }"><img src="@/assets/icons/page-svgrepo-com.svg" class="logo-admin" />Ateliers</router-link>
            <router-link :to="{ name: 'admin-cave' }"><img src="@/assets/icons/wine_glass_icon_156828.svg" class="logo-admin" />Cave</router-link>
            <router-link :to="{ name: 'admin-ecoles' }"><img src="@/assets/icons/school-svgrepo-com.svg" class="logo-admin" />Écoles</router-link>
        </div>

        <!-- Btn deconnexion -->
        <div class="disconnect-admin-btn cursor-pointer" @click="logout"><img src="@/assets/icons/logout-svgrepo-com.svg" class="logo-admin" />Déconnexion</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const logout = async () => {
            try {
                await authStore.logout();
                router.push({ name: 'login' });
            } catch (error) {
                alert("Erreur de connexion : " + error.message);
            }
        };

        return {
            logout
        };
    }
});
</script>


<style>
.admin-img
{
    width: 160px;
    height: 48px;
}

.logo
{
    margin: auto;
}

#mainContent
{
  padding-top: 0 !important;
}

#admin-app {
    display: flex;
    height: 100vh;
}

#sidebar-admin,
#content-admin {
    height: 100%;
}

#sidebar-admin {
    background-color: #2C2F36;
    width: 260px;
    display: flex;
    padding: 30px;
    justify-content: space-around;
    flex-direction: column;
}

#content-admin {
    overflow-y: scroll;
    padding: 20px;
    flex: 1;
}

.admin-nav-link
{
    display: flex;
    flex-direction: column;
    color: #ffffff;
    margin: auto;
    row-gap: 20px;
}

.admin-nav-link > a
{
    display: inline-flex;
}

.disconnect-admin-btn
{
    margin-left: auto;
    margin-right: auto;
    color: #FC7070;
    display: inline-flex;
}

.logo-admin
{
    color: #ffffff;
    width: 19px;
    height: 19px;
    margin-right: 5px;
}
</style>