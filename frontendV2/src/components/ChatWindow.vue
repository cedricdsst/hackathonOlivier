<template>
  <div>
    <h1>test</h1>
    <transition-group name="chat-message" tag="div">
      <div v-for="chat in chats" :key="chat._id" class="chat-message">
        <p>{{ chat.content }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useChatStore } from '../stores/chatStore';

const chatStore = useChatStore();
const chats = computed(() => chatStore.chats);

// Observez les changements dans `chats` et réagissez aux nouveaux messages
watch(chats, (newChats, oldChats) => {
  // Ici, vous pouvez implémenter une logique pour identifier les nouveaux messages
  // par rapport aux anciens si nécessaire.
}, { deep: true });
</script>

<style>
/* État initial de l'élément entrant */
.chat-message-enter-from, .chat-message-leave-to {
  opacity: 0;
}

/* État final de l'élément entrant et état initial de l'élément sortant */
.chat-message-enter-to, .chat-message-leave-from {
  opacity: 1;
}

/* Définition de la durée de la transition pour les éléments entrants et sortants */
.chat-message-enter-active, .chat-message-leave-active {
  transition: opacity 0.1s ease-in-out;
}

</style>
