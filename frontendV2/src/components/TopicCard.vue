<template>
    <div v-if="currentTopic">
      
      <!-- Display the currentTopic's title -->
      <h2 >{{ currentTopic.title }}</h2>
      <p>{{ currentTopic.description }}</p>
      <img class="topicImg" :src="currentTopic.fileUrl" alt="">

      <!-- Optional: Display a message when currentTopic is not available -->
      
    </div>
    <p v-else>Loading topic...</p>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useTopicStore } from '../stores/topicStore';
  import { useTopicWebSocket } from '../services/topicWebsocketService';
  import {  useRoute } from 'vue-router';
  
  const route = useRoute();
 
  //const { startListening, stopListening } = useWebSocket();
  const store = useTopicStore();
  
  const currentTopic = computed(() => store.currentTopic);
  
  
  </script>
  
  
  
  <style>
  
  
 
  </style>
  