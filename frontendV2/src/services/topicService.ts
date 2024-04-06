// src/services/topicService.ts
const API_URL = 'http://localhost:3000/api/topic'; // Ajustez selon votre URL de backend

export const topicService = {
    async createTopic(topicData: FormData) {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            body: topicData,
            credentials: 'include',
        });
        return response.json();
    },

    async getAllTopics() {
        const response = await fetch(`${API_URL}/`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async getOneTopic(id: string) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async deleteTopic(id: string) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    },
};
