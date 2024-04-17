<template>
   
        <nav>
            <div id="topNav">
                <img class="navLogo" src="@/assets/logo.svg" alt="">
            </div>
            <div id="midNav">
                <router-link to="/">
                    <img class="navIcon" src="@/assets/icons/home.svg" alt="Icon description">
                    <p>Home</p>
                </router-link>
                <router-link to="/explore">
                    <img class="navIcon" src="@/assets/icons/search.svg" alt="Icon description">
                    <p>Explore</p>
                </router-link>
                <router-link to="/bookmarks">
                    <img class="navIcon" src="@/assets/icons/bookmarks.svg" alt="Icon description">
                    <p>Bookmarks</p>
                </router-link>
                <router-link to="/profile">
                    <img class="navIcon" src="@/assets/icons/profile.svg" alt="Icon description">
                    <p>Profile</p>
                </router-link>
            </div>
            <div v-if="!isUserLoggedIn" id="botNavDis">
                
                <button class="loginbtnNav" @click="redirectTo('/login')" >Log In</button>
                <button class="loginbtnNav" @click="redirectTo('/signup')">sign Up</button>
            </div>
            <div v-if="isUserLoggedIn" id="botNavDis">
                <h2>{{ username }}</h2>
                <h3>{{ email }}</h3>
                <button class="loginbtnNav" @click="logout" >logout</button>
            </div>
        </nav>

    
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

// Propriété calculée pour déterminer si l'utilisateur est connecté
const isUserLoggedIn = computed(() => {
  return authStore.userId !== null; // Vérifiez en fonction de votre logique d'authentification
});

const username = computed(() => authStore.username);
const email = computed(() => authStore.email);

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/');
    // Par exemple : router.push({ name: 'home' });
  } catch (error: any) {
    alert("Erreur de connexion : " + error.message);
  }
};



const redirectTo = (route: string) => {
  router.push(route);
};
</script>

<style>
/* Style for NavBar component */
nav {
    flex: 0 0 250px;
    /* Adjust as necessary, sets the base width of the navbar */
    height: 100%;
    /* Full height of its parent */
   
    display: flex;
    flex-direction: column;
    /* Align items vertically */
    justify-content: space-between;
    /* Align items to the start of the flex direction */
    text-align: left;
    /* Align text to the left */

    /* Just an example, adjust the color as needed */
    border-right: solid 0.5px grey;

    margin-top:0 !important; 

}

.navIcon {
    width: 25px;
    height: auto;
}

.navLogo {
    width: 40px;
    height: auto;
    margin: 10px;
}

nav a {
    display: flex;
    align-items: center;
    margin: 10px 10px 5px 10px;
    text-decoration: none;
    
}

nav a p {
    margin: 0px 5px;
    font-size: 14px;
}

.loginbtnNav {
    height: 42px;
    width: 190px;
    background-color: #3b984a00;
    color: rgb(0, 0, 0);

    font-size: 13px;
    border: solid 2px rgb(0, 0, 0);
    border-radius: 5px;
}

.loginbtnNav:hover {
    height: 42px;
    width: 190px;
    background-color: #00000000;
    color: rgb(255, 255, 255);

    font-size: 13px;
    border: solid 2px rgb(0, 0, 0);
    border-radius: 5px;
}

#botNavDis {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 15px;
}

#botNavDis button {

    margin: auto;
    margin: 10px;
}
</style>
