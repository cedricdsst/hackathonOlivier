<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import NavBarAdmin from '@/components/NavBarAdmin.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div>
    <template v-if="!isInAdminSection">
      <header>
        <NavBar />
      </header>

      <div id="mainContent">
        <RouterView />
      </div>

      <Footer />
    </template>

<template v-else>
      <div id="admin-app">
        <NavBarAdmin />

        <div id="content-admin">
          <RouterView />
        </div>
      </div>
    </template>
</div>
</template>

<script lang="ts">
export default {
  computed: {
    isInAdminSection() {
      return this.$route.path.startsWith('/admin');
    }
  }
};

</script>

<style scoped>
</style>