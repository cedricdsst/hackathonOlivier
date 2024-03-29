import { createStore } from 'vuex'
import auth from './auth/index'
import VuexPersistence from 'vuex-persist'


// Create an instance of vuex-persist
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['auth'] // Specify the modules you want to persist. Remove this line to persist the entire store.
})

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth
    },
    plugins: [vuexLocal.plugin]
})