// src/stores/chatStore.js
import { defineStore } from 'pinia';
import { chatService } from '../services/chatService';

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [],
    }),
    actions: {
        async fetchAllChats(topicId: string) {
            try {
                const chats = await chatService.getAllChats(topicId);
                this.chats = chats;
            } catch (error) {
                console.error(error.message);
            }
        },

        async fetchOneChat(chatId: string) {
            try {
                return await chatService.getOneChat(chatId);
            } catch (error) {
                console.error(error.message);
            }
        },

        async createNewChat(topicId: string, chatData: FormData) {
            try {
                const newChat = await chatService.createChat(topicId, chatData);
                this.chats.push(newChat);
            } catch (error) {
                console.error(error.message);
            }
        },
        clearCurrentChats() {
            this.chats = [];
        }

    },
});
