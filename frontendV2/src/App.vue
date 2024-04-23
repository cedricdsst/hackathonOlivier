<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <NavBar  />
  </header>
  <div id="mainContent">
  <RouterView />
  </div>
    <Footer />
</template>

<style scoped>
</style>