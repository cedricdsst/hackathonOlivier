<template>
  <LoginView v-if="showLoginOverlay" @close-login="showLoginOverlay = false" />
  <NavBar @toggle-login="toggleLoginOverlay" />
  <RouterView />
</template>

<script>
import NavBar from './components/NavBar.vue'
import LoginView from './components/LoginView.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar,
    LoginView
  },
  data() {
    return {
      showLoginOverlay: false,
    }
  },
  methods: {
    toggleLoginOverlay() {
      this.showLoginOverlay = !this.showLoginOverlay;
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
