<template>
<TopicCard></TopicCard>
<ChatWindow></ChatWindow>
  </template>
  
  <script setup>
  import TopicCard from '../components/TopicCard.vue';
  import ChatWindow from '../components/ChatWindow.vue';
  import {  onMounted, onUnmounted, computed } from 'vue';
  import { useChatStore } from '../stores/chatStore';
  import { useTopicStore } from '../stores/topicStore';

  import { useChatWebSocket } from '../services/chatWebsocketService';
  import {  useRoute } from 'vue-router';
  
  const route = useRoute();
  const chatStore = useChatStore();
  const chatWebsocket = useChatWebSocket();
  //const { startListening, stopListening } = useWebSocket();
  const store = useTopicStore();
  const currentTopic = computed(() => store.currentTopic);
  const topicId = route.params.topicId;
  
  // Définition de ce que vous voulez faire quand un nouveau message arrive
const handleNewChatMessage = () => {
    console.log("Nouveau message reçu");
    // Peut-être mettre à jour l'affichage du chat ou autre action
    chatStore.fetchAllChats(topicId);
};

  onMounted(async () => {
    
    // It's a good practice to check the console for the currentTopic structure
    console.log(topicId);
    await store.fetchTopic(topicId);
    console.log(store.currentTopic); // Use .value with composition API and computed properties
    await chatStore.fetchAllChats(topicId);
  console.log("Chats after fetchAllChats:", JSON.stringify(chatStore.chats, null, 2));
  chatWebsocket.joinChatRoom(topicId);
  chatWebsocket.startListeningForNewMessages(handleNewChatMessage);
  });
  
  onUnmounted(() => {
    store.clearCurrentTopic();
    chatStore.clearCurrentChats();
    chatWebsocket.stopListeningForNewMessages();
    chatWebsocket.leaveChatRoom(topicId);
  });
  </script>
  
  
  
  <style>
  
  
 
  </style>
  