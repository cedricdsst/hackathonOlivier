<template>
    <div v-if="currentAtelier">
        <h1>Editer Atelier<span v-if="currentAtelier.finished" style="color:red;"> Atelier terminé</span></h1>
        <form @submit.prevent="updateAtelier" style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; flex-direction: column;">
                Titre:
                <input type="text" v-model="editableAtelier.title" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Adresse:
                <input type="text" v-model="editableAtelier.adresse" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Description:
                <textarea v-model="editableAtelier.description"
                    style="border: 1px solid grey; resize: none; width: 100%;"></textarea>
            </label>
            <label style="display: flex; flex-direction: column;">
                Date/heur de debut:
                <input type="dateTime-local" v-model="editableAtelier.startDate" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Durée (heures):
                <input type="number" v-model.number="editableAtelier.duration" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Prix:
                <input type="number" v-model.number="editableAtelier.price" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Participants Max:
                <input type="number" v-model.number="editableAtelier.participantsMax" style="border: 1px solid grey;">
            </label>
            <label style="display: flex; flex-direction: column;">
                Ecole:
                <select v-model="editableAtelier.idEcole" style="border: 1px solid grey;">
                    <option disabled value="">Selectionner une Ecole</option>
                    <option v-for="ecole in ecoles" :key="ecole._id" :value="ecole._id">{{ ecole.nom }}</option>
                </select>
            </label>
            <div style="display: flex; gap: 10px;">
                <button type="submit"
                    style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Sauvegarder</button>
                <button @click="deleteAtelier(currentAtelier._id)"
                    style="background-color: #f44336; color: white; padding: 10px 20px; border: none; cursor: pointer;">Supprimer
                    Atelier</button>
                <button v-if="!currentAtelier.finished" @click="markAsFinished(currentAtelier._id)"
                    style="background-color: #008CBA; color: white; padding: 10px 20px; border: none; cursor: pointer;">Terminer
                    l'atelier</button>
            </div>
        </form>



        <!-- Displaying files -->
        <div style="margin-top: 20px; border-top: 1px solid grey; padding-top: 10px;">
            <h2>Fichiers</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid grey; padding: 10px; text-align: left;">Url Fichier</th>
                        <th style="border: 1px solid grey; padding: 10px; text-align: center;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in currentAtelier.files" :key="file._id">
                        <td style="border: 1px solid grey; padding: 10px; text-align: left;">{{ file.fileUrl }}</td>
                        <td style="border: 1px solid grey; padding: 10px; text-align: center;">
                            <button @click="deleteFile(file._id)"
                                style="background-color: #f44336; color: white; padding: 5px 10px; border: none; cursor: pointer;">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="display:flex;">
                <div style="display:flex; width:50%; flex-direction: column">
                    <h2>Ajouter Fichiers</h2>
                    <form @submit.prevent="addFile"
                        style="display: flex; width:400px; flex-direction: column; gap: 10px;">
                        <label style="display: flex; flex-direction: column;">
                            Selectionner un fichier:
                            <input type="file" @change="handleFileChange" ref="fileInputElement" required
                                style="border: 1px solid grey;">
                        </label>
                        <button type="submit"
                            style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Upload
                            Fichier</button>
                    </form>
                </div>
                <div
                    style="display:flex; width:50%; flex-direction: column; justify-content: center;text-align: center;">
                    <p>Mot de Passe de l'Atelier : <span style="font-weight: bolder;">{{ currentAtelier.password
                            }}</span></p>
                </div>
            </div>

        </div>

        <div style="margin-top: 20px; border-top: 1px solid grey; padding-top: 10px;">
            <h2>Participants</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid grey; padding: 10px; text-align: left;">Email</th>
                        <th style="border: 1px solid grey; padding: 10px; text-align: left; max-width:10%;">A payé</th>
                        <th style="border: 1px solid grey; padding: 10px; text-align: center;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="participant in currentAtelier.participants" :key="participant._id">
                        <td style="border: 1px solid grey; padding: 10px; text-align: left;">{{ participant.email }}
                        </td>
                        <td v-if="participant.payed"
                            style="border: 1px solid grey; padding: 10px; text-align: left; background-color: #4CAF50; max-width:10%;">

                        </td>
                        <td v-if="!participant.payed"
                            style="border: 1px solid grey; padding: 10px; text-align: left; background-color:#f44336; max-width:10%;">

                        </td>
                        <td
                            style="border: 1px solid grey; padding: 10px; text-align: center; display:flex; justify-content: space-evenly;">
                            <button v-if="!participant.payed" @click="markAsPayed(participant._id)"
                                style="background-color: #008CBA; color: white; padding: 5px 10px; border: none; cursor: pointer;">Confirmer
                                paiement</button>
                            <button @click="deleteParticipant(participant._id)"
                                style="background-color: #f44336; color: white; padding: 5px 10px; border: none; cursor: pointer;">Suprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <form @submit.prevent="addParticipant"
                style="display: flex; width:400px; flex-direction: column; gap: 10px;">
                <label style="display: flex; flex-direction: column;">
                    E-mail participant:
                    <input type="email" v-model="participantEmail" required style="border: 1px solid grey;">
                </label>
                <button type="submit"
                    style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Ajouter
                    Participant</button>
            </form>
        </div>

        <div style="margin-top: 20px; border-top: 1px solid grey; padding-top: 10px;">
            <h2>Vins de l'Atelier</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid grey; padding: 10px; text-align: left;">Nom</th>
                        <th style="border: 1px solid grey; padding: 10px; text-align: left;">Quantité</th>
                        <th style="border: 1px solid grey; padding: 10px; text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vin in currentAtelier.vins" :key="vin._id">
                        <td style="border: 1px solid grey; padding: 10px; text-align: left;">{{ vin.id.nom }}</td>
                        <td style="border: 1px solid grey; padding: 10px; text-align: left;">{{ vin.quantity }}</td>
                        <td style="border: 1px solid grey; padding: 10px; text-align: center;">
                            <button @click="removeVinFromAtelier(currentAtelier._id, vin._id)"
                                style="background-color: #f44336; color: white; padding: 5px 10px; border: none; cursor: pointer;">Suprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <form @submit.prevent="addVinToAtelier"
                style="display: flex; width:400px; flex-direction: column; gap: 10px;">
                <label style="display: flex; flex-direction: column;">
                    Selectionner vin:
                    <select v-model="selectedVinId" @change="updateMaxQuantity" style="border: 1px solid grey;">
                        <option disabled value="">Vins</option>
                        <option v-for="vin in vinStore.vins" :key="vin._id" :value="vin._id"
                            :disabled="isVinAdded(vin._id)">
                            {{ vin.nom }}
                        </option>
                    </select>
                </label>
                <label style="display: flex; flex-direction: column;">
                    Quantité:
                    <input type="number" v-model.number="selectedQuantity" :max="maxQuantity" placeholder="Quantity"
                        min="1" style="border: 1px solid grey;">
                </label>
                <button type="submit"
                    style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Ajouter
                    vin</button>
            </form>
        </div>
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
        alert('marked as finished');
    } catch (error) {
        console.error('Failed to marked as finished:', error);
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



onMounted(async () => {
    await Promise.all([
        vinStore.fetchAllVins(),
        ecoleStore.fetchAllEcoles(),
        atelierStore.fetchAtelier(route.params.id)
    ]);
    if (route.params.id) {
        setupEditableAtelier(currentAtelier.value);
    }
});

function setupEditableAtelier(atelier) {
    Object.assign(editableAtelier, atelier);
    if (atelier.startDate) {
        editableAtelier.startDate = new Date(atelier.startDate).toISOString().split('T')[0];
    }
}

async function updateAtelier() {
    await atelierStore.updateAtelier(editableAtelier._id, editableAtelier);
    await atelierStore.fetchAtelier(editableAtelier._id); // Re-fetch atelier to refresh the displayed details
    router.go(0); // Reloads the current route
}

async function deleteAtelier(atelierId) {
    try {
        await atelierStore.deleteAtelier(atelierId);
        router.push({ name: 'ateliers' });
    } catch (error) {
        console.error('Failed to delete atelier:', error);
        alert('Failed to delete atelier');
    }
}

async function markAsFinished(atelierId) {
    try {
        await atelierStore.finishAtelier(atelierId);
        router.go(0);
    } catch (error) {
        console.error('Failed to mark as finished:', error);
        alert('Failed to mark as finished');
    }
}


</script>