// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { authService } from '../services/authService'

interface UserState {
    userId: string | null
    username: string | null
    email: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): UserState => ({
        userId: null,
        username: null,
        email: null
    }),
    actions: {
        async signup(user: { email: string; password: string; username: string }) {
            try {
                const response = await authService.signup(user)
                // Ici, gérer la réponse et stocker les données de l'utilisateur si nécessaire
                // Exemple:
                // this.userId = response.data.userId;
                // this.username = response.data.username;
                // this.email = response.data.email;
            } catch (error) {
                this.clearUser()
                throw error
            }
        },
        async login(user: { email: string; password: string; stayLoggedIn: boolean }) {
            console.log('login');

            try {
                const response = await authService.login(user);
                // Vérifiez et accédez à la réponse en utilisant response.data
                if (response.data && response.data.userId) {
                    this.userId = response.data.userId;
                    this.username = response.data.username;
                    this.email = response.data.email;
                    console.log(response);

                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                this.clearUser();
                throw error; // Propager l'erreur pour une gestion plus détaillée ou un affichage utilisateur
            }
        },
        async logout() {
            try {
                await authService.logout()
                this.clearUser()
            } catch (error) {
                throw error
            }
        },
        // Dans authStore.ts
        async verifyToken() {
            try {
                const response = await authService.verifyToken();
                // Assurez-vous que la réponse contient les données attendues avant d'essayer d'y accéder
                if (response && response.data) {
                    this.userId = response.data.userId;
                    this.username = response.data.username;
                    this.email = response.data.email;
                } else {
                    // Gérer le cas où les données ne sont pas comme prévu
                    this.clearUser();
                }
            } catch (error) {
                // Ici, vous pouvez choisir de simplement nettoyer l'utilisateur sans jeter une autre erreur,
                // car un échec de verifyToken dû à un utilisateur non connecté est un cas valide
                this.clearUser();
                console.error("Erreur lors de la vérification du token: ", error);
            }
        }
        ,
        clearUser() {
            this.userId = null
            this.username = null
            this.email = null
        }
    }
})
