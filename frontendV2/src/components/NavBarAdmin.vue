<template>
    <div id="sidebar-admin">
        <!-- Logo -->
        <div>
            <a href="#">
                <img src="@/assets/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo">
            </a>
        </div>

        <!-- Liens -->
        <div class="admin-nav-link">
            <router-link to="/admin">Tableau de bord</router-link>
            <router-link to="/admin/pages">Pages</router-link>
            <router-link to="/admin/ateliers">Ateliers</router-link>
            <router-link to="/admin/cave">Cave</router-link>
            <router-link to="/admin/ecoles">Écoles</router-link>
        </div>

        <!-- Btn deconnexion -->
        <div class="disconnect-admin-btn">Déconnexion</div>
    </div>

</template>

<script>
</script>

<style>
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
}

.disconnect-admin-btn
{
    margin-left: auto;
    margin-right: auto;
    color: #FC7070;
}
</style>