<template>
    <div>
        <h1>Vins List</h1>
        <ul>
            <li v-for="vin in vins" :key="vin._id">
                {{ vin.nom }} - {{ vin.region }} - {{ vin.cepage }} - {{ vin.annee }} - {{ vin.quantite }} - {{
                vin.descrption }}
                <button @click="deleteVin(vin._id)">DELETE</button>
            </li>
        </ul>

        <h2>Add New Vin</h2>
        <form @submit.prevent="submitVin">
            <input v-model="newVin.nom" placeholder="Nom" required>
            <input v-model="newVin.region" placeholder="Region">
            <input v-model="newVin.cepage" placeholder="Cepage">
            <input type="number" v-model.number="newVin.annee" placeholder="Annee">
            <input type="number" v-model.number="newVin.quantite" placeholder="Quantite" required>
            <textarea v-model="newVin.descrption" placeholder="Description"></textarea>
            <input type="file" @change="handleFileChange">
            <button type="submit">Create Vin</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVinStore } from '@/stores/vinStore';

const vinStore = useVinStore();
const vins = computed(() => vinStore.vins);
const newVin = ref({
    nom: '',
    region: '',
    cepage: '',
    annee: '',
    quantite: '',
    descrption: ''
});
const file = ref(null);



function handleFileChange(event) {
    file.value = event.target.files[0];
}

async function submitVin() {
    await vinStore.createVin(newVin.value, file.value);
    newVin.value = { nom: '', region: '', cepage: '', annee: '', quantite: '', descrption: '' };
    file.value = null; // Clear the file input
    vinStore.fetchAllVins();
}

async function deleteVin(vinId) {

    try {
        await vinStore.deleteVin(vinId);
        await vinStore.fetchAllVins();
        alert('vin deleted sucessfuly');
    } catch (error) {
        console.error('Failed to delete vin:', error);
        alert('Failed to delete vin');
    }
}

onMounted(() => {
    vinStore.fetchAllVins();
});
</script>