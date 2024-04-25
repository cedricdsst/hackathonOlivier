<template>
    <div v-if="!isChildOfAdminRoute">
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur le tableau de bord de l'interface d'administration.</p>
      <p>Ici, vous pouvez afficher des statistiques, des graphiques, des données récapitulatives, etc.</p>
    </div>
    <RouterView v-if="isChildOfAdminRoute" />
  </template>

<script>
  export default {
    name: 'DashboardView',
    computed: {
      isChildOfAdminRoute() {
        const isAdminChild = this.$route.matched.some(route => {
          return route.name.startsWith('admin-');
        });
        return isAdminChild;
      }
    }
  };
  </script>

<style scoped>
</style>