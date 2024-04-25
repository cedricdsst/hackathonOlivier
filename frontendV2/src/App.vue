<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import NavBarAdmin from '@/components/NavBarAdmin.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div>
    <template v-if="!isInAdminSection && !isInLoginSection">
      <header>
        <NavBar />
      </header>

      <div id="mainContent">
        <RouterView />
      </div>

      <Footer />
    </template>

<template v-if="isInAdminSection && !isInLoginSection">
      <div id="admin-app">
        <NavBarAdmin />

        <div id="content-admin">
          <RouterView />
        </div>
      </div>
    </template>

<template v-if="isInLoginSection">
      <RouterView />
    </template>
</div>
</template>

<script lang="ts">
export default {
  computed: {
    isInAdminSection() {
      return this.$route.path.startsWith('/admin');
    },
    isInLoginSection() {
      return this.$route.path.startsWith('/login');
    }
  }
};

</script>

<style scoped>
</style>