// src/services/chatService.js
const API_URL = 'http://localhost:3000/api/chat'; // Ajustez cette URL à votre configuration

export const chatService = {
    async getAllChats(topicId: string) {
        const response = await fetch(`${API_URL}/topic/${topicId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des chats');
        }
        return response.json();
    },

    async getOneChat(chatId: string) {
        const response = await fetch(`${API_URL}/${chatId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du chat');
        }
        return response.json();
    },

    async createChat(topicId: string, chatData: FormData) {
        const response = await fetch(`${API_URL}/topic/${topicId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat: chatData }),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du chat');
        }
        return response.json();
    },
};
