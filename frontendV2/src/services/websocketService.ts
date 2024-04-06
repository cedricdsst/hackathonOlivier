import io from 'socket.io-client';
import { useTopicStore } from '../stores/topicStore';

const socket = io('http://localhost:3000');

export const useWebSocket = () => {
    const topicStore = useTopicStore();

    const startListening = () => {
        socket.on('topicCreated', () => {
            topicStore.fetchAllTopics();
        });
    };

    const stopListening = () => {
        socket.off('topicCreated');
    };

    return { startListening, stopListening };
};

