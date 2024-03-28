<template>
    <div id="loginBg">
        <button @click="$emit('close-login')">close</button>
        <form name="login-form">
            <div class="mb-3 center">

                <input id="email" class="logInputs" type="email" placeholder="Email" v-model="input.email" />
            </div>
            <br>
            <div class="mb-3 center">

                <input id="password" class="logInputs" type="password" placeholder="Password"
                    v-model="input.password" />
            </div>
            <br>
            <button class="loginBtn" type="submit" v-on:click.prevent="login()">
                Login
            </button>
            <button class="signinBtn" type="submit">
                Create Account
            </button>
        </form>
    </div>


</template>

<script>
import { SET_AUTHENTICATION, SET_AUTH_TOKEN, SET_USER_ID, SET_USERNAME, GET_USER_ID } from "../store/storeconstants";
import axios from 'axios'; // Import Axios for making HTTP requests

export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                email: "", // Changed from username to email to match the API requirement
                password: ""
            }
        }
    },
    methods: {
        login() {
            if (this.input.email !== "" && this.input.password !== "") {
                axios.post('http://localhost:3000/api/auth/login', {
                    email: this.input.email,
                    password: this.input.password
                })
                    .then(response => {
                        this.$store.commit(`auth/${SET_USER_ID}`, response.data.userId);
                        this.$store.commit(`auth/${SET_USERNAME}`, response.data.username);
                        this.$store.commit(`auth/${SET_AUTH_TOKEN}`, response.data.token);
                        this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
                        console.log("Login successful", response.data);
                        console.log(this.$store.getters[`auth/${GET_USER_ID}`]);
                        //console.log(this.$store.commit(`auth/${GET_USER_ID}`));
                        this.$emit('close-login');
                    })
                    .catch(error => {
                        console.error("Login failed", error.response ? error.response.data : 'Error without response');
                        this.$store.commit(SET_AUTHENTICATION, false);
                    });
            } else {
                console.log("Email and Password cannot be empty");
            }
        }

    },
}
</script>

<style>
#loginBg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.774);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

form {
    width: 329px;
    height: 393px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 auto;
    align-items: center;
    background-color: #15202B;
    padding: 20px;
    border-radius: 15px;
    border: solid 0.5px #70A0B5;
}

.center {
    display: flex;
    justify-content: center;
}

.logInputs {
    background-color: #d9d9d948;
    border: none;
    border-radius: 25px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 16px;
    padding: 10px 20px;
    width: 270px;
    box-sizing: border-box;
}

.logInputs::placeholder {
    color: #A9A9A9;
    opacity: 1;
}

.logInputs:focus {
    outline: none;
}

.loginBtn {
    height: 52px;
    width: 170px;
    background-color: #3B984A;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: 0px;
    border-radius: 5px;
}

.signinBtn {
    height: 52px;
    width: 170px;
    background-color: #3b984a00;
    color: #3B984A;
    font-weight: bold;
    font-size: 16px;
    border: solid 4px #3B984A;
    border-radius: 5px;
}

#email {
    margin-top: 50px;
}
</style>