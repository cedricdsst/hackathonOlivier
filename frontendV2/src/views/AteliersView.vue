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
            <input type="number" v-model.number="newAtelier.price" placeholder="Price" required>
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref, onMounted } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useRouter } from 'vue-router';

const atelierStore = useAtelierStore();
const router = useRouter();

const ateliers = computed(() => atelierStore.ateliers);  // Use computed to ensure reactivity

const newAtelier = ref({
    title: '',
    price: 0
});

function goToAtelier(id) {
    router.push({ name: 'atelier', params: { id } });
}

async function createAtelier() {
    if (newAtelier.value.title && newAtelier.value.price > 0) {
        try {
            await atelierStore.createAtelier(newAtelier.value);
            newAtelier.value.title = '';
            newAtelier.value.price = 0;
            alert('Atelier created successfully');
        } catch (error) {
            console.error('Failed to create atelier:', error);
            alert('Failed to create atelier');
        }
    } else {
        alert('Please fill all the fields correctly.');
    }
}

onMounted(() => {
    atelierStore.fetchAllAteliers();
});
</script>
