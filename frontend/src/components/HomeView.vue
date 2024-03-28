<template>
    <div>
        <h3>Welcome {{ getUserId() }}</h3>
        <button @click="showLogin = true">Log In</button>
        <LoginView v-if="showLogin" />
    </div>
</template>

<script>
import { GET_USER_ID } from "../store/storeconstants";
import LoginView from './LoginView.vue'; // Ensure this path is correct

export default {
    name: 'WelcomeView',
    components: {
        LoginView
    },
    data() {
        return {
            showLogin: false,
        }
    },
    computed: {
        userId() {
            return this.$store.getters[`auth/${GET_USER_ID}`];
        }
    },
    methods: {
        getUserId() {
            return this.userId;
        }
    },
    watch: {
        // Automatically hide the login form when authentication state changes
        userId(newVal) {
            if (newVal) {
                this.showLogin = false;
            }
        }
    }
}
</script>
