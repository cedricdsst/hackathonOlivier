<template>
    <div v-if="currentAtelier">
        <h1>{{ currentAtelier.title }}</h1>
        <p>{{ currentAtelier.description }}</p>
        <p>ecole : {{ currentAtelier.idEcole.nom }}</p>
        <p>Price: {{ currentAtelier.price }}€</p>
        <p>Finished: {{ currentAtelier.finished }}</p>

        <button @click="deleteAtelier(currentAtelier._id)">delete</button>
        <button @click="showEditForm">Edit</button>
        <button @click="markAsFinished(currentAtelier._id)">mark as finished</button>

        <!-- Edit Form -->
        <div v-if="editFormVisible">
            <h2>Edit Atelier</h2>
            <form @submit.prevent="updateAtelier">
                <input type="text" v-model="editableAtelier.title" placeholder="Title">
                <input type="text" v-model="editableAtelier.adresse" placeholder="Adresse">
                <textarea v-model="editableAtelier.description" placeholder="Description"></textarea>
                <input type="date" v-model="editableAtelier.startDate" placeholder="Start Date">
                <input type="number" v-model.number="editableAtelier.duration" placeholder="Duration (hours)">
                <input type="number" v-model.number="editableAtelier.price" placeholder="Price">
                <input type="number" v-model.number="editableAtelier.participantsMax" placeholder="Max Participants">
                <!-- Dropdown to select Ecole -->
                <select v-model="editableAtelier.idEcole">
                    <option disabled value="">Select an Ecole</option>
                    <option v-for="ecole in ecoles" :key="ecole._id" :value="ecole._id">
                        {{ ecole.nom }}
                    </option>
                </select>

                <button type="submit">Save Changes</button>
                <button @click="editFormVisible = false">Cancel</button>
            </form>
        </div>


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
        <form @submit.prevent="addParticipant">
            <input type="email" v-model="participantEmail" placeholder="Enter participant's email" required>
            <button type="submit">Add Participant</button>
        </form>

        <h2>Wines in Atelier</h2>
        <ul>
            <li v-for="vin in currentAtelier.vins" :key="vin._id">
                {{ vin.id.nom }} - Quantity: {{ vin.quantity }}
                <button @click="removeVinFromAtelier(currentAtelier._id, vin._id)">Remove</button>
            </li>
        </ul>
        <form @submit.prevent="addVinToAtelier">
            <select v-model="selectedVinId" @change="updateMaxQuantity">
                <option disabled value="">Select a wine</option>
                <option v-for="vin in vinStore.vins" :key="vin._id" :value="vin._id" :disabled="isVinAdded(vin._id)">
                    {{ vin.nom }}
                </option>
            </select>
            <input type="number" v-model.number="selectedQuantity" :max="maxQuantity" placeholder="Quantity" min="1">
            <button type="submit">Add Wine</button>
        </form>
    </div>
    <div v-else>
        Loading atelier details...
    </div>
</template>


<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useEcoleStore } from '../stores/ecoleStore';
import { useRoute, useRouter } from 'vue-router';
import { useVinStore } from '../stores/vinStore';

const atelierStore = useAtelierStore();
const ecoleStore = useEcoleStore();
const vinStore = useVinStore(); // Use VinStore
const route = useRoute();
const router = useRouter();  // Create a router instance
const currentAtelier = computed(() => atelierStore.currentAtelier);
const ecoles = computed(() => ecoleStore.ecoles);
const file = ref(null);
const fileInputElement = ref(null);  // Use a different name to clarify its purpose
const selectedVinId = ref('');
const selectedQuantity = ref(1);
const maxQuantity = ref(0);
const participantEmail = ref('');
const editFormVisible = ref(false);
const editableAtelier = reactive({
    title: '',
    description: '',
    adresse: '',
    startDate: null,
    duration: null,
    finished: false,
    price: 0,
    participantsMax: 14,
    idEcole: ''
});

// Computed property to get currently selected vin details
const selectedVin = computed(() => {
    return vinStore.vins.find(vin => vin._id === selectedVinId.value);
});

// Watcher to update max quantity when selected vin changes
watch(selectedVin, (newVin) => {
    if (newVin) {
        maxQuantity.value = newVin.quantiteDispo;
    }
}, { immediate: true });

// Method to check if a vin is already added to the atelier
function isVinAdded(vinId) {
    return atelierStore.currentAtelier.vins.some(vin => vin.id._id === vinId);
}

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

async function deleteAtelier(atelierId) {
    try {
        await atelierStore.deleteAtelier(atelierId);
        router.push({ name: 'ateliers' });  // Redirect to the 'ateliers' route after deletion
        alert('Atelier deleted successfully');
    } catch (error) {
        console.error('Failed to delete atelier:', error);
        alert('Failed to delete atelier');
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

async function markAsFinished(articleId) {

    try {
        await atelierStore.finishAtelier(articleId);
        await atelierStore.fetchAtelier(route.params.id);
        alert('marked as payed');
    } catch (error) {
        console.error('Failed to marked as payed:', error);
        alert('Failed to marked as finished');
    }
}

async function addParticipant() {
    if (participantEmail.value) {
        const participantData = { email: participantEmail.value };
        await atelierStore.addParticipantToAtelier(route.params.id, participantData);
        await atelierStore.fetchAtelier(route.params.id);  // Refresh the atelier to show the new participant
        participantEmail.value = '';  // Reset the input after adding
        alert('Participant added successfully');
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

async function addVinToAtelier() {
    if (selectedVinId.value && selectedQuantity.value > 0) {
        const vinData = { vinId: selectedVinId.value, quantity: selectedQuantity.value };
        await atelierStore.addVinToAtelier(currentAtelier.value._id, vinData);
        await atelierStore.fetchAtelier(route.params.id); // Re-fetch atelier to update the list
    }
    console.log(JSON.stringify(currentAtelier.value));
}

async function removeVinFromAtelier(atelierId, vinId) {
    console.log(atelierId, vinId);
    try {
        await atelierStore.removeVinFromAtelier(atelierId, vinId);
        await atelierStore.fetchAtelier(atelierId);
        alert('Wine removed successfully from the atelier');
    } catch (error) {
        console.error('Failed to remove wine:', error);
        alert('Failed to remove wine from the atelier');
    }
}

function showEditForm() {
    Object.assign(editableAtelier, currentAtelier.value);
    // Convert startDate to YYYY-MM-DD format if it exists
    if (currentAtelier.value.startDate) {
        const date = new Date(currentAtelier.value.startDate);
        editableAtelier.startDate = date.toISOString().split('T')[0]; // Splits the ISO string and takes the date part
    }
    editFormVisible.value = true;
}
async function updateAtelier() {
    await atelierStore.updateAtelier(editableAtelier._id, editableAtelier);
    await atelierStore.fetchAtelier(editableAtelier._id); // Refresh the displayed details
    editFormVisible.value = false;
}


onMounted(async () => {
    await Promise.all([
        vinStore.fetchAllVins(),
        ecoleStore.fetchAllEcoles(),
        atelierStore.fetchAtelier(route.params.id)
    ]);
    if (route.params.id) {
        Object.assign(editableAtelier, currentAtelier.value);
        if (currentAtelier.value.startDate) {
            const date = new Date(currentAtelier.value.startDate);
            editableAtelier.startDate = date.toISOString().split('T')[0];
        }
    }
});


</script>