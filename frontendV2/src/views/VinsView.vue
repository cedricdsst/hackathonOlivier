<template>
    <div>
      <h1>Vins List</h1>
      <ul>
        <li v-for="vin in vins" :key="vin._id">
          {{ vin.nom }} - {{ vin.region }} - {{ vin.cepage }} - {{ vin.annee }} - {{ vin.quantite }} - {{ vin.description }}
          <button @click="editVin(vin)">Edit</button>
          <button @click="deleteVin(vin._id)">Delete</button>
        </li>
      </ul>
  
      <!-- Edit Form -->
      <div v-if="editFormVisible">
        <h2>Edit Vin</h2>
        <form @submit.prevent="updateVin">
          <input v-model="editableVin.nom" placeholder="Nom" required>
          <input v-model="editableVin.region" placeholder="Region">
          <input v-model="editableVin.cepage" placeholder="Cepage">
          <input type="number" v-model.number="editableVin.annee" placeholder="Annee">
          <input type="number" v-model.number="editableVin.quantite" placeholder="Quantite" required>
          <textarea v-model="editableVin.description" placeholder="Description"></textarea>
          <button type="submit">Update Vin</button>
          <button @click="editFormVisible = false">Cancel</button>
        </form>
      </div>
  
      <h2>Add New Vin</h2>
      <form @submit.prevent="submitVin">
        <input v-model="newVin.nom" placeholder="Nom" required>
        <input v-model="newVin.region" placeholder="Region">
        <input v-model="newVin.cepage" placeholder="Cepage">
        <input type="number" v-model.number="newVin.annee" placeholder="Annee">
        <input type="number" v-model.number="newVin.quantite" placeholder="Quantite" required>
        <textarea v-model="newVin.description" placeholder="Description"></textarea>
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
      description: ''
  });
  const editableVin = ref({
      _id: '',
      nom: '',
      region: '',
      cepage: '',
      annee: '',
      quantite: '',
      description: ''
  });
  const editFormVisible = ref(false);
  const file = ref(null);
  
  onMounted(async () => {
      await vinStore.fetchAllVins();
  });
  
  function handleFileChange(event) {
      file.value = event.target.files[0];
  }
  
  async function submitVin() {
      await vinStore.createVin(newVin.value, file.value);
      newVin.value = { nom: '', region: '', cepage: '', annee: '', quantite: '', description: '' };
      file.value = null;  // Clear the file input
     
      await vinStore.fetchAllVins();
      
  }
  
  async function deleteVin(vinId) {
      await vinStore.deleteVin(vinId);
      await vinStore.fetchAllVins();
  }
  
  function editVin(vin) {
      editableVin.value = { ...vin };  // Populate the form with the current vin data
      editFormVisible.value = true;
  }
  
  async function updateVin() {
      await vinStore.updateVin(editableVin.value._id, editableVin.value, file.value);
      editFormVisible.value = false;
      editableVin.value = { nom: '', region: '', cepage: '', annee: '', quantite: '', description: '' };  // Reset the form
      await vinStore.fetchAllVins();
  }
  </script>
  