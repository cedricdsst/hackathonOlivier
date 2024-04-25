<template>
    <div class="login-container">
      <!-- Logo -->
      <div class="my-6">
        <a href="/">
            <img src="@/assets/img/Logo_Hackaton_M1-ESGI_blanc.png" alt="Logo" class="h-8 mr-2 logo admin-img">
        </a>
      </div>
      <h2 class="mb-6">Connexion</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required placeholder="Entrez votre email">
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input id="password" v-model="password" type="password" required placeholder="Entrez votre mot de passe">
        </div>
        
        <div class="form-group inline-flex mb-6">
          <input id="stayLoggedIn" class="mr-3" type="checkbox" v-model="stayLoggedIn">
          <label for="stayLoggedIn">Rester connecté</label>
        </div>
        
        <div class="text-center">
          <button class="login-btn" type="submit">Se connecter</button>
        </div>
      </form>
      
    </div>
  </template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useAuthStore } from '../stores/authStore';
  import { useRouter } from 'vue-router';
const router = useRouter();
  const email = ref('');
  const password = ref('');
  const stayLoggedIn = ref(false);
  const authStore = useAuthStore();
  
  // Détermine si l'utilisateur est connecté
  const isUserLoggedIn = computed(() => {
    return authStore.userId !== null;
  });
  
  const login = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value, stayLoggedIn: stayLoggedIn.value });
      // Redirection ou mise à jour de l'interface utilisateur en cas de succès
      router.push('/admin');
    } catch (error: any) {
      alert("Erreur de connexion : " + error.message);
    }
  };
  

  </script>

<style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #2C2F36;
    color: #ffffff;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
  }
  
  input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    color: black;
  }
  
 .login-btn
 {
  border: solid 2px #ffffff;
  padding: 7px 20px;
  transition: all 0.3s;
 }

 .login-btn:hover
 {
  border: solid 2px #ffffff;
  background-color: #ffffff;
  color: #2C2F36;
 }

  </style>