<template>
  <div class="homeContainer">
  <div class="create-topic-container">
    
    <form @submit.prevent="submitTopic">
      <div class="form-group">
        <input id="title" v-model="title" type="text" required placeholder="Titre">
      </div>

      <div class="form-group">
        <input id="description" v-model="description" type="text"  required placeholder="Description"></input>
      </div>


      <div style="display:flex;">
      <div class="form-group">
        <input id="file" ref="fileInput" type="file" @change="handleFileUpload" name="image">
      </div>

      <button type="submit">Soumettre</button>
    </div>
    </form>
  </div>

  <div id="listTopics">
  <transition-group :name="enableAnimation ? 'topic' : ''"  tag="div">
    <div v-for="topic in topics" :key="topic._id" class="topic">
      <router-link :to="`/topic/${topic._id}`">
        <h3>{{ topic.title }}</h3>
        <img class="topicImg" v-if="topic.fileUrl" :src="topic.fileUrl" alt="Image du topic">
      </router-link>
    </div>
  </transition-group>
</div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { useTopicStore } from '../stores/topicStore';
import { useTopicWebSocket } from '../services/topicWebsocketService';
// Correctement extrait de useWebSocket
const { startListening, stopListening } = useTopicWebSocket();
const router = useRouter();
const title = ref('');
const description = ref('');
const file = ref(null);
const fileInput = ref(null);

const store = useTopicStore();

function handleFileUpload(event) {
  file.value = event.target.files[0] || null;
}

async function submitTopic() {
  const formData = new FormData();
  formData.append('topic', JSON.stringify({
    title: title.value,
    description: description.value,
  }));

  if (file.value) {
    formData.append('image', file.value); // Ensure the field name matches what multer is configured to accept
  }

  try {
    await store.createTopic(formData);
        
  topics.value = store.topics;
    title.value = '';
    description.value = '';
    if (fileInput.value) {
      fileInput.value.value = ''; // Reset file input
    }
  } catch (error) {
    console.error("Erreur lors de la création du topic:", error);
    alert("Erreur lors de la soumission du topic.");
  }
}

const enableAnimation = ref(false)

const topics = computed(() => store.topics);
// Observez les changements dans `chats` et réagissez aux nouveaux messages

onMounted(async () => {
  await store.fetchAllTopics();
  startListening();
  enableAnimation.value = true;
});

onUnmounted(() => {
    stopListening();
});
</script>

<style>


.topicImg{
  width: 30px;
  height: auto;

}
.create-topic-container {
  max-width: 5000px;
  margin: auto;
  
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
}

input[type="text"], input[type="file"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}


.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}




/* État initial de l'élément entrant */
.topic-enter-from, .topic-leave-to {
  background-color: rgba(172, 172, 172, 0.644);
}

/* État final de l'élément entrant et état initial de l'élément sortant */
.topic-enter-to, .topic-leave-from {
  background-color: rgba(172, 172, 172, 0);
}

/* Définition de la durée de la transition pour les éléments entrants et sortants */
.topic-enter-active, .topic-leave-active {
  transition: all 1s ease-in-out;
}

</style>
