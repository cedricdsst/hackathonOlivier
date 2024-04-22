<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar  />
  </header>
  <div id="mainContent">
  <RouterView />
  </div>
</template>

<style scoped>
</style>