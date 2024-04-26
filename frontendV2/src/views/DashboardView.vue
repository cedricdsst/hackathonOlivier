<template>
  <div v-if="!isChildOfAdminRoute">
    <p>Panel d'administration > Tableau de bord</p>
    <h2 class="pb-4">Tableau de bord</h2>

    <div class="px-4 grid grid-cols-3 gap-10">
      <div class="flex flex-col bg-[#27AC34] text-white dashboard-card">
        <h3>Prochain évènement</h3>
        <h2 class="inline-flex font-bold"><img src="@/assets/icons/calendar-svgrepo-com-2.svg"
            class="dashboard-icon my-auto">{{ closestAtelier ? closestAtelier.formattedStartDate : 'Aucun événement prochain' }}</h2>
      </div>

      <div class="flex flex-col bg-[#CE9400] text-white dashboard-card">
        <h3>Inscriptions en attente</h3>
        <h2 class="inline-flex font-bold"><img src="@/assets/icons/clock-white.svg" class="dashboard-icon my-auto">{{ unpaidCount }}
        </h2>
      </div>

      <div @click="goToVins()" class="flex flex-col bg-[#8C2C2C] text-white dashboard-card">
        <h3>Bouteilles en cave</h3>
        <h2 class="inline-flex font-bold"><img src="@/assets/icons/wine_glass_icon_156828.svg"
            class="dashboard-icon my-auto"> {{ totalVinQuantity }}</h2>
      </div>
    </div>

    <div class="dasboard-info">
      <div class="flex gap-10">
        <div class="dashboard-info-card">
          <h3 class="mb-4">Inscriptions en attentes</h3>
          <table>
  <thead>
    <tr>
      <th>Email</th>
      <th>Atelier lié</th>
      <th colspan="3">Actions rapides</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(participant, index) in unpaidParticipants" :key="index">
      <td>{{ participant.email }}</td>
      <td>{{ participant.atelierTitle }}</td>
      <td><img @click="goToAtelier(participant.atelierId)" src="@/assets/icons/eye-see-show-svgrepo-com.svg" class="w-4" /></td>
      
    </tr>
  </tbody>
</table>

        </div>

        <div class="dashboard-info-card">
          <h3 class="mb-4">Stock faible / épuisé</h3>
          <table>
  <thead>
    <tr>
      <th>Vin</th>
      <th>Quantité restante</th>
      <th colspan="2">Actions rapides</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(vin, index) in lowStockVins" :key="index">
      <td>{{ vin.nom }}</td>
      <td>{{ vin.quantite }}</td>
      <td><img src="@/assets/icons/eye-see-show-svgrepo-com.svg" class="w-4" @click="goToVins()" /></td>
      
    </tr>
  </tbody>
</table>

        </div>
      </div>

    </div>

  </div>
  <RouterView v-if="isChildOfAdminRoute" />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAtelierStore } from '../stores/atelierStore';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useVinStore } from '../stores/vinStore';
const vinStore = useVinStore(); 
const router = useRouter();

const route = useRoute();

const isChildOfAdminRoute = computed(() => {
  const isAdminChild = route.matched.some(route => {
    return route.name.startsWith('admin-');
  });
  return isAdminChild;
});
// Access the store
const atelierStore = useAtelierStore();

onMounted(async () => {
  await atelierStore.fetchAllAteliers(); // Ensure ateliers are loaded

  await vinStore.fetchAllVins();

});

// Computed property to find the closest atelier
const closestAtelier = computed(() => {
  const now = new Date();
  return atelierStore.ateliers.reduce((closest, atelier) => {
    const atelierDate = new Date(atelier.startDate);
    const closestDate = closest ? new Date(closest.startDate) : null;

    if (closestDate === null || (atelierDate >= now && atelierDate < closestDate)) {
      return atelier;
    }
    return closest;
  }, null);
});

const unpaidParticipants = computed(() => {
  return atelierStore.unpaidParticipants;
});

const unpaidCount = computed(() => {
  return unpaidParticipants.value.length;
});

const totalVinQuantity = computed(() => vinStore.totalQuantity);

function goToAtelier(id) {
    router.push({ name: 'admin-atelier', params: { id } });
}

function goToVins() {
    router.push({ name: 'admin-cave'});
}

const lowStockVins = computed(() => {
  return vinStore.vins.filter(vin => vin.quantite <= 2);
});

</script>


<style scoped>
.dashboard-card {
  padding: 30px 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
}

.dashboard-icon {
  margin-right: 15px;
  height: 24px;
  width: 24px;
}

.dashboard-info-card {
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

.dashboard-info-card th {
  text-align: start;
  font-weight: bold;
}

.dashboard-info-card thead tr {
  border-bottom: solid 1px;
}

.dasboard-info {
  padding: 40px 20px;
}

.dashboard-info-card table {
  width: 100%;
  font-size: 12px;
}
</style>