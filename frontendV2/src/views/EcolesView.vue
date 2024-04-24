<template>
    <div>
      <h1>Écoles</h1>
      <p>Liste des écoles affiliées.</p>
      <ul>
        <li>École 1</li>
        <li>École 2</li>
        <li>École 3</li>
        <!-- Ajoutez d'autres éléments de liste en fonction de vos besoins -->
      </ul>
    </div>
  </template>

<script>
  export default {
    name: 'EcolesView'
  };
  </script>

<style scoped>
  /* Styles spécifiques au contenu des écoles */
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