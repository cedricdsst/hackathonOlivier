<template>
<div class="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
  <h1 class="text-2xl font-semibold text-gray-800 mb-6">Écoles</h1>
  <ul class="space-y-4">
    <li v-for="ecole in ecoles" :key="ecole._id" class="flex justify-between items-center bg-gray-100 p-4">
      <span class="font-medium text-gray-700">{{ ecole.nom }} - {{ ecole.adresse }}</span>
      <div>
        <button @click="editEcole(ecole)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 ease-in-out mr-2">Edit</button>
        <button @click="deleteEcole(ecole._id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 transition duration-300 ease-in-out">Delete</button>
      </div>
    </li>
  </ul>

  <!-- Edit Form -->
  <div v-if="editFormVisible" class="mt-6 p-6 bg-gray-50">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Editer École</h2>
    <form @submit.prevent="updateEcole" class="space-y-4">
      <input type="text" v-model="editableEcole.nom" placeholder="Name" required class="w-full p-2 border-2 border-gray-200 ">
      <input type="text" v-model="editableEcole.adresse" placeholder="Address" class="w-full p-2 border-2 border-gray-200 ">
      <div class="flex justify-between">
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  transition duration-300 ease-in-out">Update École</button>
        <button @click="editFormVisible = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 transition duration-300 ease-in-out">Cancel</button>
      </div>
    </form>
  </div>


  <h2 class="text-xl font-semibold text-gray-800 mb-4 mt-20">Ajouter école</h2>
  <form @submit.prevent="addEcole" class="space-y-4">
    <input type="text" v-model="newEcole.nom" placeholder="Name" required class="w-full p-2 border-2 border-gray-200">
    <input type="text" v-model="newEcole.adresse" placeholder="Address" class="w-full p-2 border-2 border-gray-200">
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 ease-in-out">Add École</button>
  </form>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEcoleStore } from '../stores/ecoleStore';

const ecoleStore = useEcoleStore();
const ecoles = computed(() => ecoleStore.ecoles);
const newEcole = ref({ nom: '', adresse: '' });
const editableEcole = ref({ nom: '', adresse: '', _id: '' });
const editFormVisible = ref(false);

onMounted(async () => {
  await ecoleStore.fetchAllEcoles();
});

const addEcole = async () => {
  await ecoleStore.createEcole(newEcole.value);
  newEcole.value = { nom: '', adresse: '' };  // Reset form fields
  await ecoleStore.fetchAllEcoles();
};

const deleteEcole = async (id) => {
  try {
    await ecoleStore.deleteEcole(id);
    await ecoleStore.fetchAllEcoles();  // Refresh the list after deletion
    alert('Ecole deleted successfully');
  } catch (error) {
    console.error('Failed to delete ecole:', error);
    alert(error.message);  // Display the error message from the backend
  }
};

const editEcole = (ecole) => {
  editableEcole.value = {...ecole};  // Clone the ecole to avoid direct mutation
  editFormVisible.value = true;
  
};

const updateEcole = async () => {
  await ecoleStore.updateEcole(editableEcole.value._id, editableEcole.value);
  await ecoleStore.fetchAllEcoles();  // Refresh the list
  editFormVisible.value = false;
  editableEcole.value = { nom: '', adresse: '', _id: '' };  // Reset editable Ecole
};
</script>


<style scoped>
  /* Add your CSS styles if needed */
  </style>
