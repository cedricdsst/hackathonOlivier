<template>
    <div>
      <h1>Pages</h1>
      <p>Liste des pages disponibles dans l'interface d'administration.</p>
      <ul>
        <li>Page 1</li>
        <li>Page 2</li>
        <li>Page 3</li>
        <!-- Ajoutez d'autres éléments de liste en fonction de vos besoins -->
      </ul>
    </div>
  </template>

<script>
  export default {
    name: 'PagesView'
  };
  </script>

<style scoped>
  /* Styles spécifiques au contenu des pages */
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