import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // Import the store
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Import regular icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, far); // Add all icons to the library so you can use them in your Vue components

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
