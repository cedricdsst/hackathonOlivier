<template>
  <div class="homeContainer">
  <div class="create-topic-container">
    <h2>Créer un nouveau topic</h2>
    <form @submit.prevent="submitTopic">
      <div class="form-group">
        <label for="title">Titre :</label>
        <input id="title" v-model="title" type="text" required placeholder="Titre du topic">
      </div>

      <div class="form-group">
        <label for="description">Description :</label>
        <textarea id="description" v-model="description" required placeholder="Description du topic"></textarea>
      </div>

      <div class="form-group">
        <label for="file">Fichier (optionnel) :</label>
        <input id="file" ref="fileInput" type="file" @change="handleFileUpload" name="image">
      </div>

      <button type="submit">Soumettre</button>
    </form>
  </div>

  <div id="listTopics">
    <ul>
      <li v-for="topic in topics" :key="topic._id">
        <h3>{{ topic.title }}</h3>
        <img class="topicImg" v-if="topic.fileUrl" :src="topic.fileUrl" alt="Image du topic">
      </li>
    </ul>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed} from 'vue';
import { useTopicStore } from '../stores/topicStore';
import { useWebSocket } from '../services/websocketService';
// Correctement extrait de useWebSocket
const { startListening, stopListening } = useWebSocket();

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
    alert("Topic créé avec succès !");
    
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

const topics = computed(() => store.topics);

onMounted(async () => {
  await store.fetchAllTopics();
  startListening();
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
  max-width: 500px;
  margin: auto;
  padding: 20px;
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

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
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

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
