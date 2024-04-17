import io from 'socket.io-client';
import { useChatStore } from '../stores/chatStore';
const socket = io('http://localhost:3000');

export const useChatWebSocket = () => {
    const chatStore = useChatStore();

    const joinChatRoom = (topicId) => {
        socket.emit('joinChatRoom', topicId);
    };

    const leaveChatRoom = (topicId) => {
        socket.emit('leaveChatRoom', topicId);
    };

    const sendChatMessage = (topicId, message) => {
        socket.emit('chatMessage', { topicId, message });
    };

    const startListeningForNewMessages = (callback) => {
        socket.on('newChatMessage', callback);
    };

    const stopListeningForNewMessages = () => {
        socket.off('newChatMessage');
    };

    return { joinChatRoom, leaveChatRoom, sendChatMessage, startListeningForNewMessages, stopListeningForNewMessages };
};
