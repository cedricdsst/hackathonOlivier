<template>
    <div>
      <h1>Cave</h1>
      <p>Liste des éléments dans la cave.</p>
      <ul>
        <li>Objet A</li>
        <li>Objet B</li>
        <li>Objet C</li>
        <!-- Ajoutez d'autres éléments de liste en fonction de vos besoins -->
      </ul>
    </div>
  </template>

<script>
  export default {
    name: 'CaveView'
  };
  </script>

<style scoped>
  /* Styles spécifiques au contenu de la cave */
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