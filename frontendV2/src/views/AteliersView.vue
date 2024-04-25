<template>
    <div>
        <h1>Ateliers</h1>
        <ul>
            <li v-for="atelier in ateliers" :key="atelier._id" @click="goToAtelier(atelier._id)">
                {{ atelier.title }} - {{ atelier.price }}€
            </li>
        </ul>

        <h2>Create Atelier</h2>
        <form @submit.prevent="createAtelier">
            <input v-model="newAtelier.title" placeholder="Title" required>
            <textarea v-model="newAtelier.description" placeholder="Description"></textarea>
            <input type="date" v-model="newAtelier.startDate" placeholder="Start Date">
            <input type="number" v-model.number="newAtelier.duration" placeholder="Duration (hours)">
            <input v-model="newAtelier.adresse" placeholder="Adresse" required>
            <input type="number" v-model.number="newAtelier.price" placeholder="Price" required>
            <input type="number" v-model.number="newAtelier.participantsMax" placeholder="Max Participants">

            <!-- Dropdown for selecting Ecole -->
            <select v-model="newAtelier.idEcole">
                <option disabled value="">Select an Ecole</option>
                <option v-for="ecole in ecoles" :key="ecole._id" :value="ecole._id">
                    {{ ecole.nom }}
                </option>
            </select>

            <button type="submit">Create</button>
        </form>
    </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useEcoleStore } from '../stores/ecoleStore';
import { useRouter } from 'vue-router';

const atelierStore = useAtelierStore();
const ecoleStore = useEcoleStore();  // Ensure you have this store
const router = useRouter();

const ateliers = computed(() => atelierStore.ateliers);
const ecoles = computed(() => ecoleStore.ecoles);  // Use computed for reactivity on ecoles

const newAtelier = ref({
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

onMounted(async () => {
    await atelierStore.fetchAllAteliers();
    await ecoleStore.fetchAllEcoles();  // Fetch Ecoles on mounted
    console.log(JSON.stringify(atelierStore.ateliers));
});

function goToAtelier(id) {
    router.push({ name: 'atelier', params: { id } });
}

async function createAtelier() {
    if (newAtelier.value.title && newAtelier.value.price > 0) {
        try {
            await atelierStore.createAtelier(newAtelier.value);
            newAtelier.value = { ...newAtelier.value, title: '', description: '', startDate: null, duration: null, finished: false, price: 0, participantsMax: 14, idEcole: '' };
            alert('Atelier created successfully');
        } catch (error) {
            console.error('Failed to create atelier:', error);
            alert('Failed to create atelier');
        }
        await atelierStore.fetchAllAteliers();
    } else {
        alert('Please fill all required fields correctly.');
    }
}
</script>
