<template>
  <LoginView v-if="showLoginOverlay" @close-login="showLoginOverlay = false" @toggle-signup="toggleSignupOverlay" />
  <SignupView v-if="showSignupOverlay" @close-signup="showSignupOverlay = false" />
  <NavBar @toggle-login="toggleLoginOverlay" @toggle-signup="toggleSignupOverlay" />
  <RouterView />
</template>

<script>
import NavBar from './components/NavBar.vue'
import LoginView from './components/LoginView.vue';
import SignupView from './components/SignupView.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar,
    LoginView,
    SignupView
  },
  data() {
    return {
      showLoginOverlay: false,
      showSignupOverlay: false,
    }
  },
  methods: {
    toggleLoginOverlay() {
      this.showLoginOverlay = !this.showLoginOverlay;
    },
    toggleSignupOverlay() {
      this.showSignupOverlay = !this.showSignupOverlay;
    }
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  /* Use flex display for direct children layout */
  height: 100vh;
  /* Full viewport height */
  width: 100vw;
  /* Full viewport width */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #15202B;
}



/* Style for RouterView content */
.router-view {
  flex: 1;
  /* Takes the remaining space */
  overflow-y: auto;
  /* Allows scrolling if content overflows */
}
</style>
