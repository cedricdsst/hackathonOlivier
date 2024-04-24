<template>
    <div>
      <h1>Ateliers</h1>
      <p>Liste des ateliers disponibles dans l'interface d'administration.</p>
      <ul>
        <li>Atelier A</li>
        <li>Atelier B</li>
        <li>Atelier C</li>
        <!-- Ajoutez d'autres éléments de liste en fonction de vos besoins -->
      </ul>
    </div>
  </template>

<script>
  export default {
    name: 'AteliersView'
  };
  </script>

<style scoped>
  /* Styles spécifiques au contenu des ateliers */
  h1 {
    font-size: 24px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>