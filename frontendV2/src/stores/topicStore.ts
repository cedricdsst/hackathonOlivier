// src/stores/topicStore.ts
import { defineStore } from 'pinia';
import { topicService } from '../services/topicService';

export const useTopicStore = defineStore('topic', {
    state: () => ({
        topics: [],
        currentTopic: null,
    }),
    actions: {
        async fetchAllTopics() {
            try {
                const topics = await topicService.getAllTopics();
                this.topics = topics;
            } catch (error) {
                console.error('Failed to fetch topics:', error);
            }
        },

        async fetchTopic(id: string) {
            try {
                const topic = await topicService.getOneTopic(id);
                this.currentTopic = topic;
            } catch (error) {
                console.error('Failed to fetch topic:', error);
            }
        },

        async createTopic(topicData: FormData) {
            try {
                const response = await topicService.createTopic(topicData);
                this.topics.push(response); // Supposant que la réponse contient le nouveau topic créé
                return response; // Retourne la réponse pour une éventuelle utilisation supplémentaire
            } catch (error) {
                console.error('Failed to create topic:', error);
                throw error; // Propage l'erreur pour permettre la gestion d'erreur côté composant
            }
        },

        async deleteTopic(id: string) {
            try {
                await topicService.deleteTopic(id);
                this.topics = this.topics.filter(topic => topic._id !== id); // Supprime le topic de l'état local
            } catch (error) {
                console.error('Failed to delete topic:', error);
                throw error; // Propage l'erreur pour permettre la gestion d'erreur côté composant
            }
        },

        // Optionnel: Méthode pour réinitialiser le topic courant
        clearCurrentTopic() {
            this.currentTopic = null;
        },
    },
});
