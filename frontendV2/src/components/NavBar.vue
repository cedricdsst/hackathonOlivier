<template>

<nav>
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="#">
                    <img src="@/assets/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo">
                </a>
            </div>
            <!-- Bouton Burger (Hamburger) -->
            <button class="burger-btn" @click="toggleNav">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <!-- Liens -->
            <div class="nav-links items-center">
                <a href="#" class="text-white hover:text-gray-300">Accueil</a>
                <a href="#" class="text-white hover:text-gray-300">À propos</a>
                <a href="#" class="red-btn">Participer à un évènement</a>
            </div>
        </div>
    </nav>
        <!-- <nav>
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

     -->
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

    function toggleNav()
    {
        const navLinks = document.querySelector('nav .nav-links');

        const computedStyle = window.getComputedStyle(navLinks);
        const displayValue = computedStyle.getPropertyValue('display');

        if (displayValue === 'none') {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    }
</script>

<style>
    nav 
    {
        position: fixed;
        background-color: var(--default-black);
        height: 112px;
        display: flex;
        vertical-align: middle;
        padding: 0 85px;
        width: 100%;
        z-index: 10;
    }

    nav a, nav button
    {
        font-size: 15px;
    }

    nav img.logo
    {
        width: 180px;
        height: 54px;
    }

    .nav-links
    {
        display: flex;
        gap: 60px;
    }
    

    .burger-btn
    {
        display: none;
    }    


    @media (max-width:768px)
    {
        .burger-btn
        {
            display: block;
        }    

        nav .nav-links
        {
            display: none;
        }

        nav .nav-links
        {
            position: absolute;
            background-color: var(--default-black);
            left: 0;
            top :  111px;
            flex-direction: column;
            width: 100%;
            padding: 10px 0;
        }
    }
</style>
