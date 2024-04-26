<template>
  <div class="p-4">
  <h1 class="text-2xl font-bold text-gray-900 mb-4">Vins List</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div v-for="vin in vins" :key="vin._id" class="bg-white shadow-lg overflow-hidden">
    <!-- Image du vin -->
    <img :src="vin.fileUrl" alt="Bottle of Wine" class="w-full h-40 object-cover">

    <div class="p-5">
      <h3 class="text-lg font-bold text-gray-900">{{ vin.nom }}</h3>
      <p class="text-gray-600">{{ vin.region }} - {{ vin.cepage }}</p>
      <p class="text-gray-600">Année: {{ vin.annee }} | Quantité: {{ vin.quantite }}</p>
      <p class="text-gray-800 text-sm mt-2">{{ vin.descrption }}</p>
    </div>
    <div class="px-5 py-3 bg-gray-100 flex justify-between items-center">
      <button class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="editVin(vin)">
        Edit
      </button>
      <button class="px-4 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" @click="deleteVin(vin._id)">
        Delete
      </button>
    </div>
  </div>
</div>





  <!-- Edit Form -->
  <div v-if="editFormVisible" class="mt-4 p-4 border border-gray-200 rounded">
    <h2 class="text-xl font-semibold text-gray-800 mb-3">Edit Vin</h2>
    <form @submit.prevent="updateVin" class="space-y-3">
      <input class="p-2 border border-gray-300 w-full" v-model="editableVin.nom" placeholder="Nom" required>
      <input class="p-2 border border-gray-300 w-full" v-model="editableVin.region" placeholder="Region">
      <input class="p-2 border border-gray-300 w-full" v-model="editableVin.cepage" placeholder="Cepage">
      <input class="p-2 border border-gray-300 w-full" type="number" v-model.number="editableVin.annee" placeholder="Annee">
      <input class="p-2 border border-gray-300 w-full" type="number" v-model.number="editableVin.quantite" placeholder="Quantite" required>
      <textarea class="p-2 border border-gray-300 w-full" v-model="editableVin.descrption" placeholder="Description"></textarea>
      <button class="px-4 py-2 bg-green-500 text-white hover:bg-green-600" type="submit">Update Vin</button>
      <button class="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600" @click="editFormVisible = false">Cancel</button>
    </form>
  </div>

  <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Add New Vin</h2>
  <form @submit.prevent="submitVin" class="space-y-3">
    <input class="p-2 border border-gray-300 w-full" v-model="newVin.nom" placeholder="Nom" required>
    <input class="p-2 border border-gray-300 w-full" v-model="newVin.region" placeholder="Region">
    <input class="p-2 border border-gray-300 w-full" v-model="newVin.cepage" placeholder="Cepage">
    <input class="p-2 border border-gray-300 w-full" type="number" v-model.number="newVin.annee" placeholder="Annee">
    <input class="p-2 border border-gray-300 w-full" type="number" v-model.number="newVin.quantite" placeholder="Quantite" required>
    <textarea class="p-2 border border-gray-300 w-full" v-model="newVin.descrption" placeholder="Description"></textarea>
    <input type="file" class="file:px-4 file:py-2 file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:rounded file:text-gray-700 hover:file:bg-gray-100" @change="handleFileChange">
    <button class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600" type="submit">Create Vin</button>
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
  const editableVin = ref({
      _id: '',
      nom: '',
      region: '',
      cepage: '',
      annee: '',
      quantite: '',
      descrption: ''
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
      newVin.value = { nom: '', region: '', cepage: '', annee: '', quantite: '', descrption: '' };
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
      editableVin.value = { nom: '', region: '', cepage: '', annee: '', quantite: '', descrption: '' };  // Reset the form
      await vinStore.fetchAllVins();
  }
  </script>
  