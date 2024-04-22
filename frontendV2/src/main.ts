import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

import App from './App.vue'
import router from './router'

// Fonction immédiatement invoquée pour appeler verifyToken
;(async () => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  const authStore = useAuthStore()
  await authStore.verifyToken()
  app.mount('#app')
})()
