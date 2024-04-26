<template>

<nav :class="{ 'hidden': $route.name === 'admin' }">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="/">
                    <img src="@/assets/img/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo">
                </a>
            </div>
            <!-- Bouton Burger -->
            <button class="burger-btn" @click="toggleNav">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <!-- Liens -->
            <div class="nav-links items-center">
                <a href="/" class="text-white hover:text-gray-300">Accueil</a>
                <a href="/about" class="text-white hover:text-gray-300">À propos</a>
                <a href="/evenements" class="red-btn">Participer à un évenement</a>
            </div>
        </div>
    </nav>

</template>

<script setup lang="ts">

    const redirectTo = (route: string) => {
    router.push(route);
    };

    function toggleNav()
    {
        const navLinks = document.querySelector('nav .nav-links');

        const isMobileDisplay = navLinks.classList.contains('mobile-display');

        if (!isMobileDisplay) {
            navLinks.classList.add('mobile-display');
        } else {
            navLinks.classList.remove('mobile-display');
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
        
        nav 
        {
            padding: 0 30px;
        }

        .mobile-display
        {
            display: flex !important;
        }
    }
</style>
