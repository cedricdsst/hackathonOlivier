<template>
    <div v-if="currentAtelier">
        <h1>{{ currentAtelier.title }}</h1>
        <p>{{ currentAtelier.description }}</p>
        <p>Price: {{ currentAtelier.price }}€</p>

        <!-- Displaying files -->
        <h2>Files</h2>
        <ul>
            <li v-for="file in currentAtelier.files" :key="file._id">
                {{ file.fileUrl }}
                <button @click="deleteFile(file._id)">delete</button>
            </li>
        </ul>

        <h2>Add File</h2>
        <form @submit.prevent="addFile">
            <input type="file" @change="handleFileChange" ref="fileInputElement" required>
            <button type="submit">Upload File</button>
        </form>

        <h2>Participants</h2>
        <ul>
            <li v-for="participant in currentAtelier.participants" :key="participant._id">
                {{ participant.email }} | payed : {{ participant.payed }}
                <button @click="markAsPayed(participant._id)">payed</button>
                <button @click="deleteParticipant(participant._id)">delete</button>
            </li>
        </ul>
    </div>
    <div v-else>
        Loading atelier details...
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useRoute } from 'vue-router';

const atelierStore = useAtelierStore();
const route = useRoute();
const currentAtelier = computed(() => atelierStore.currentAtelier);
const file = ref(null);
const fileInputElement = ref(null);  // Use a different name to clarify its purpose

function handleFileChange(event) {
    file.value = event.target.files[0];
}

async function addFile() {
    if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);
        await atelierStore.addFileToAtelier(route.params.id, formData);

        // Clear the input after upload
        file.value = null;
        if (fileInputElement.value) {
            fileInputElement.value.value = '';  // Reset the file input element
        }
        await atelierStore.fetchAtelier(route.params.id);
    }
}

async function deleteFile(fileId) {

    try {
        await atelierStore.removeFileFromAtelier(route.params.id, fileId);
        await atelierStore.fetchAtelier(route.params.id);
        alert('File deleted sucessfuly');
    } catch (error) {
        console.error('Failed to delete file:', error);
        alert('Failed to delete file');
    }
}

async function markAsPayed(participantId) {

    try {
        await atelierStore.confirmPaymentForParticipant(route.params.id, participantId);
        await atelierStore.fetchAtelier(route.params.id);
        alert('marked as payed');
    } catch (error) {
        console.error('Failed to marked as payed:', error);
        alert('Failed to marked as payed');
    }
}

async function deleteParticipant(participantId) {

    try {
        await atelierStore.removeParticipantFromAtelier(route.params.id, participantId);
        await atelierStore.fetchAtelier(route.params.id);
        alert('participant deleted sucessfuly');
    } catch (error) {
        console.error('Failed to delete participant:', error);
        alert('Failed to delete participant');
    }
}


onMounted(async () => {
    await atelierStore.fetchAtelier(route.params.id);
});

</script>