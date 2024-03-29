<template>
    <div>
        <nav>
            <div id="topNav">
                <img class="navLogo" src="@/assets/logo.png" alt="">
            </div>
            <div id="midNav">
                <router-link to="/">
                    <img class="navIcon" src="@/assets/icons/home.svg" alt="Icon description">
                    <p>Home</p>
                </router-link>
                <router-link to="/explore">
                    <img class="navIcon" src="@/assets/icons/search.svg" alt="Icon description">
                    <p>Explore</p>
                </router-link>
                <router-link to="/bookmarks">
                    <img class="navIcon" src="@/assets/icons/bookmarks.svg" alt="Icon description">
                    <p>Bookmarks</p>
                </router-link>
                <router-link to="/profile">
                    <img class="navIcon" src="@/assets/icons/profile.svg" alt="Icon description">
                    <p>Profile</p>
                </router-link>
            </div>
            <div id="botNav">
                <h3>Welcome {{ getUsername() }}</h3>
                <button class="loginbtnNav" @click="$emit('toggle-login')">Log In</button>
                <button class="loginbtnNav" @click="$emit('toggle-signup')">sign Up</button>
            </div>
        </nav>

    </div>
</template>

<script>
import { GET_USERNAME } from "../store/storeconstants";


export default {
    name: 'WelcomeView',
    components: {

    },
    computed: {
        username() {
            return this.$store.getters[`auth/${GET_USERNAME}`];
        }
    },
    methods: {
        getUsername() {
            return this.username;
        }
    },
    watch: {
        // Automatically hide the login form when authentication state changes
        username(newVal) {
            if (newVal) {
                this.showLogin = false;
            }
        }
    }
}
</script>

<style>
/* Style for NavBar component */
nav {
    flex: 0 0 250px;
    /* Adjust as necessary, sets the base width of the navbar */
    height: 100%;
    /* Full height of its parent */
    width: 250px;
    display: flex;
    flex-direction: column;
    /* Align items vertically */
    justify-content: space-between;
    /* Align items to the start of the flex direction */
    text-align: left;
    /* Align text to the left */
    background-color: #15202B;
    /* Just an example, adjust the color as needed */
    border-right: solid 0.5px grey;

}

.navIcon {
    width: 25px;
    height: auto;
}

.navLogo {
    width: 40px;
    height: auto;
    margin: 10px;
}

nav a {
    display: flex;
    align-items: center;
    margin: 10px 10px 5px 10px;
    text-decoration: none;
    color: white;
}

nav a p {
    margin: 0px 5px;
    font-size: 14px;
}

.loginbtnNav {
    height: 42px;
    width: 190px;
    background-color: #3b984a00;
    color: white;

    font-size: 13px;
    border: solid 2px white;
    border-radius: 5px;
}

#botNav {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 15px;
}

#botNav button {

    margin: auto;
    margin: 10px;
}
</style>
