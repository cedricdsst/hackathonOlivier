// src/services/authService.ts

// Définissez l'URL de base de votre API
const API_URL = 'http://localhost:3000/api' // Ajustez selon votre configuration

interface SignupData {
    email: string
    password: string
    username: string
}

interface LoginData {
    email: string
    password: string
}

export const authService = {
    async signup(data: SignupData) {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async login(data: LoginData) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Important pour inclure les cookies dans la requête
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async logout() {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include' // Important pour inclure les cookies dans la requête
        })
        return response.json()
    },

    async verifyToken() {
        const response = await fetch(`${API_URL}/auth/verifyToken`, {
            method: 'GET',
            credentials: 'include' // Important pour inclure les cookies dans la requête
        })


        return response.json()
    }
}
