<template>
    <footer class="mt-[100px]">
        <div class="container mx-auto flex justify-between items-center px-4 flex-col">
            <div class="adm-link">
                <a href="/admin">
                    <img src="@/assets/icons/lock-svgrepo-com.svg" alt="" class="adm-icon">
                </a>
            </div>
            <!-- Logo -->
            <div class="flex items-center">
                <a href="#">
                    <img src="@/assets/img/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo">
                </a>
            </div>
            <hr class="link-separator" />
            <!-- Liens -->
            <div class="nav-links items-center">
                <a href="/about" class="text-white hover:text-gray-300">À propos</a>
                <a href="/evenements" class="text-white hover:text-gray-300">Évenements</a>
                <a href="/contact" class="text-white hover:text-gray-300">Contact</a>
            </div>
            <!-- Icones -->
            <div class="flex flex-row items-center gap-4">
                <a href="#" class="network-link">
                    <img src="@/assets/icons/linkedin_icon.svg" alt="linkedin-icon" class="network-icon">
                </a>
                <a href="#" class="network-link">
                    <img src="@/assets/icons/facebook_icon.svg" alt="facebook-icon" class="network-icon">
                </a>
            </div>

            <!-- Bas footer -->
            <hr class="bottom-separator" />
            <div class="bottom-footer">
                <span>© 2024 - Olivier Bonneton |</span> <a href="#">Mentions légales</a> - <a href="#">Politique de confidentialité</a>
            </div>
        </div>
    </footer>
</template>

<style>
    footer
    {
        background-color: var(--default-black);
        height: 290px;
        
    }

    footer hr.link-separator
    {
        border-top:solid 3px var(--default-red);
        width: 67px;
    }

    footer img.logo
    {
        width:140px;
        height: 42px;
    }

    footer a, footer p, footer span
    {
        font-size: 12px;
    }

    footer img.network-icon
    {
        width: 20px;
        height: 20px;
        fill: var(--default-dark-grey);
    }

    footer > .container
    {
        height: 100%;
        padding: 30px 0;
    }

    footer hr.bottom-separator
    {
        widows: 100%;
        border-top: solid 1px var(--default-dark-grey);
    }

    .bottom-footer
    {
        color: var(--default-dark-grey);
    }

    .adm-link
    {
        position: absolute;
        background-color: var(--default-red);
        right: 85px;
    }

    .adm-link, .adm-link a
    {
        display: flex;
        width: 43px;
        height: 43px;
    }

    footer img.adm-icon
    {
        align-self: center;
        margin: auto;
        width: 23px;
        height: 23px;
    }
</style>