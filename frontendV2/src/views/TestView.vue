<template>
    <div class="bg-blue-500 text-white p-4">
      <h1 class="text-2xl font-bold">Bonjour Tailwind !</h1>
      <p class="mt-2">C'est Tailwind CSS.</p>
    </div>
  </template>  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HelloWorld',
  });
  </script>
  
  <style scoped>
  /* Aucun besoin d'importer Tailwind ici, car il est déjà importé globalement */
  </style>
  