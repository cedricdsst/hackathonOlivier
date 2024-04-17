<template>
    <div class="login-container">
      <h2>Connexion</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required placeholder="Entrez votre email">
        </div>

        <div class="form-group">
          <label for="username">Username:</label>
          <input id="username" v-model="username" type="text" required placeholder="Entrez votre username">
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input id="password" v-model="password" type="password" required placeholder="Entrez votre mot de passe">
        </div>
        
      
        
        <button type="submit">Se connecter</button>
      </form>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useAuthStore } from '../stores/authStore';
  import { useRouter } from 'vue-router';
const router = useRouter();
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const stayLoggedIn = ref(false);
  const authStore = useAuthStore();
  

  
  const signup = async () => {
    try {
      await authStore.signup({ email: email.value, password: password.value, username: username.value });
      // Redirection ou mise à jour de l'interface utilisateur en cas de succès
      router.push('/login');
    } catch (error: any) {
      alert("Erreur de connexion : " + error.message);
    }
  };
  

  </script>
  
  <style>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
  }
  
  input[type="email"], input[type="password"],input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  
  
  </style>
  