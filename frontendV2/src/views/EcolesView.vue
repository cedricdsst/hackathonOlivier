<template>
  <div>
    <h1>Ecoles</h1>
    <ul>
      <li v-for="ecole in ecoles" :key="ecole._id">
        {{ ecole.nom }} - {{ ecole.adresse }}
        <button @click="editEcole(ecole)">Edit</button> <!-- Edit button -->
        <button @click="deleteEcole(ecole._id)">Delete</button>
      </li>
    </ul>

    <!-- Edit Form -->
    <div v-if="editFormVisible">
      <h2>Edit Ecole</h2>
      <form @submit.prevent="updateEcole">
        <input type="text" v-model="editableEcole.nom" placeholder="Name" required>
        <input type="text" v-model="editableEcole.adresse" placeholder="Address">
        <button type="submit">Update Ecole</button>
        <button @click="editFormVisible = false">Cancel</button>
      </form>
    </div>

    <h2>Add New Ecole</h2>
    <form @submit.prevent="addEcole">
      <input type="text" v-model="newEcole.nom" placeholder="Name" required>
      <input type="text" v-model="newEcole.adresse" placeholder="Address">
      <button type="submit">Add Ecole</button>
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
};

const deleteEcole = async (id) => {
  await ecoleStore.deleteEcole(id);
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
  