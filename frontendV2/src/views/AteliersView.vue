<template>
    <div>
        <div style="display: flex; width:100%; margin-bottom:20px;">
            <div style="width:50%">
                <h2>Ateliers</h2>
            </div>
            <div style="width:50%; display:flex; flex-direction: row-reverse;">
                <!-- Update to toggle form visibility -->
                <button @click="toggleFormVisibility" class="addAtelier">Ajouter</button>
                <img src="@/assets/icons/calendar-grey.svg" class="info-icon">
            </div>
        </div>

        <!-- Conditionally render the table or the form based on formVisible state -->
        <table v-if="!formVisible">
            <tr>
                <th>Titre</th>
                <th>Date et heure</th>
                <th>Inscrits</th>
                <th>Prix</th>
                <th>École</th>
                <th>Accès à l'atelier</th>
            </tr>
            <tr v-for="atelier in ateliers" :key="atelier._id">
                <td>{{ atelier.title }}</td>
                <td>{{ atelier.formattedStartDate }}</td>
                <td>{{ atelier.participantsMax - atelier.remainingSpots }}/{{ atelier.participantsMax }}</td>
                <td>{{ atelier.price }}€</td>
                <td>{{ atelier.idEcole.nom }}</td>
                <td><a @click="goToAtelier(atelier._id)">ACCESS</a></td>
            </tr>
        </table>

        <!-- Form is displayed based on formVisible state -->
        <div v-if="formVisible">
            <h2>Create Atelier</h2>
            <form @submit.prevent="createAtelier" style="display: flex; flex-direction: column; gap: 10px;">
                <label for="title" style="margin-bottom: 5px;">Title:</label>
                <input id="title" v-model="newAtelier.title" required
                    style="width: 100%; padding: 8px; border:solid 1px grey;">

                <label for="description" style="margin-bottom: 5px;">Description:</label>
                <textarea id="description" v-model="newAtelier.description"
                    style="width: 100%; height: 100px; resize: none; padding: 8px; border:solid 1px grey;"
                    readonly></textarea>

                <div style="display: flex; justify-content: space-between;">
                    <div style="flex: 1; margin-right: 5px;">
                        <label for="startDate" style="margin-bottom: 5px;">Start Date:</label>
                        <input id="startDate" type="dateTime-local" v-model="newAtelier.startDate"
                            style="width: 100%; padding: 8px; border:solid 1px grey;">
                    </div>
                    <div style="flex: 1; margin-left: 5px;">
                        <label for="duration" style="margin-bottom: 5px;">Duration (hours):</label>
                        <input id="duration" type="number" v-model.number="newAtelier.duration"
                            style="width: 100%; padding: 8px; border:solid 1px grey;">
                    </div>
                </div>

                <label for="adresse" style="margin-bottom: 5px;">Adresse:</label>
                <input id="adresse" v-model="newAtelier.adresse" required
                    style="width: 100%; padding: 8px; border:solid 1px grey;">

                <div style="display: flex; justify-content: space-between;">
                    <div style="flex: 1; margin-right: 5px;">
                        <label for="price" style="margin-bottom: 5px;">Price:</label>
                        <input id="price" type="number" v-model.number="newAtelier.price"
                            style="width: 100%; padding: 8px; border:solid 1px grey;">
                    </div>
                    <div style="flex: 1; margin-left: 5px;">
                        <label for="participantsMax" style="margin-bottom: 5px;">Max Participants:</label>
                        <input id="participantsMax" type="number" v-model.number="newAtelier.participantsMax"
                            style="width: 100%; padding: 8px; border:solid 1px grey;">
                    </div>
                </div>

                <label for="idEcole" style="margin-bottom: 5px;">Select an Ecole:</label>
                <select id="idEcole" v-model="newAtelier.idEcole" style="width: 100%; padding: 8px;">
                    <option disabled value="">-- Select an Ecole --</option>
                    <option v-for="ecole in ecoles" :key="ecole._id" :value="ecole._id">
                        {{ ecole.nom }}
                    </option>
                </select>

                <div style="display: flex; justify-content: space-between; gap: 10px;">
                    <button type="submit"
                        style="flex-grow: 1; background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Create</button>
                    <button @click="toggleFormVisibility"
                        style="flex-grow: 1; background-color: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Cancel</button>
                </div>
            </form>


        </div>
    </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useEcoleStore } from '../stores/ecoleStore';
import { useRouter } from 'vue-router';

const atelierStore = useAtelierStore();
const ecoleStore = useEcoleStore();
const router = useRouter();

const ateliers = computed(() => atelierStore.ateliers);
const ecoles = computed(() => ecoleStore.ecoles);

const newAtelier = ref({
    title: '',
    description: '',
    adresse: '',
    startDate: null,
    duration: null,
    price: 0,
    participantsMax: 14,
    idEcole: ''
});

const formVisible = ref(false);  // Manage form visibility

onMounted(async () => {
    await atelierStore.fetchAllAteliers();
    await ecoleStore.fetchAllEcoles();
});

function toggleFormVisibility() {
    formVisible.value = !formVisible.value;
}

async function createAtelier() {
    if (newAtelier.value.title && newAtelier.value.price > 0) {
        try {
            await atelierStore.createAtelier(newAtelier.value);
            newAtelier.value = { title: '', description: '', adresse: '', startDate: null, duration: null, price: 0, participantsMax: 14, idEcole: '' }; // Reset form fields
            formVisible.value = false;  // Hide form after successful creation
            await atelierStore.fetchAllAteliers(); // Refresh the list of ateliers
            alert('Atelier created successfully');
        } catch (error) {
            console.error('Failed to create atelier:', error);
            alert('Failed to create atelier');
        }
    } else {
        alert('Please fill all required fields correctly.');
    }
}

function goToAtelier(id) {
    router.push({ name: 'admin-atelier', params: { id } });
}
</script>



<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.addAtelier {
    background-color: #00A3FF;
    color: white;
    padding: 7px 20px;
    text-align: center;
    justify-content: center;
    border-radius: 5px;
    width: 100px;
}
</style>