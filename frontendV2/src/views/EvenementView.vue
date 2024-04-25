<template>
  <div v-if="currentAtelier">
    <div class="header-banner header-banner-img cust-full-width">
      <div class="header-gradiant cust-full-width"></div>
    </div>
    <div class="content-wrapper">
      <div class="info-event-card">
        <div class="top-left-square bg-default-red"></div>
        <div class="bottom-right-square bg-default-black"></div>
        <h2 class="event-title mb-3">{{ currentAtelier.title }}</h2>
        <div class="event-summary mb-3">
          <p class="inline-flex">
            <img src="@/assets/icons/date-svgrepo-com.svg" class="info-icon" />{{
              currentAtelier.startDate
            }}
          </p>
          <br />
          <p class="inline-flex">
            <img
              src="@/assets/icons/clock-with-white-face_icon-icons.com_72804.svg"
              class="info-icon"
            />{{ currentAtelier.duration }}h
          </p>
          <br />
          <p class="inline-flex">
            <img
              src="@/assets/icons/3289574-clan-family-group-peer-people_107094.svg"
              class="info-icon"
            />{{ currentAtelier.remainingSpots }} places restantes
          </p>
          <br />
        </div>
        <p class="mb-3">
          {{ currentAtelier.description }} <br />
          <b>Cet évènement est réservé au plus de 18 ans</b>
        </p>

        <div class="price mb-3">{{ currentAtelier.price }} € par pers.</div>
        <button class="red-btn" @click="openModal">Je souhaite m'inscrire</button>
      </div>
    </div>

    <div class="mb-10">
      <h2>Description de l'atelier</h2>
      <hr class="divider-1" />

      <p>
        Lorem ipsum dolor sit amet consectetur adipiscing elit morbi, vitae aenean cras feugiat
        massa etiam quisque mi, convallis sed nibh iaculis praesent sem lobortis. Montes phasellus
        non orci senectus nostra, dictumst bibendum magnis vivamus ridiculus scelerisque, risus
        blandit et torquent. Habitant sed ligula malesuada aptent quisque lobortis, dignissim
        egestas montes in nisi, lectus nibh felis rhoncus donec. Cum aliquet blandit euismod montes
        himenaeos, non aliquam libero etiam laoreet magna, erat platea fringilla nam. Ante magna
        tempor consequat ad potenti elementum pellentesque volutpat, mattis ultrices sagittis non
        interdum vestibulum venenatis id, eget lectus semper odio fusce nec lacus.
      </p>
      <button class="white-btn mt-4">Bouton optionnel</button>
    </div>

    <div v-if="currentAtelier.finished" class="info-post-event">
      <div>
        <h2 class="text-center">Liste des vins</h2>
        <hr class="divider-1 m-auto" />
        <article class="flex flex-wrap justify-center gap-5">
          <div v-for="vin in vins" :key="vin._id" class="flex flex-col justify-center items-center">
            <img :src="vin.fileUrl" class="w-52" />
            <p>{{ vin.nom }}</p>
          </div>
        </article>
      </div>

      <div class="ressource-block">
        <h2 class="text-center">Ressources liées</h2>
        <hr class="divider-1 m-auto" />
        <div>
          <div v-if="!isPasswordCorrect">
            <p class="text-center">
              Les ressources sont protégées par mot de passe. Veuillez entrer le mot de passe pour
              continuer :
            </p>
            <div class="text-center">
            <input class="m-auto" type="password" v-model="password" placeholder="Mot de passe" />
            <button class="red-btn" @click="submitPassword">Soumettre</button>
          </div>
        </div>
          <!-- Contenu à afficher si le mot de passe est correct -->
          <div v-if="isPasswordCorrect">
            <!-- Votre contenu protégé par mot de passe -->
            <h2>Ressources orotefgé par mdp oeeeeeeee</h2>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="info-post-event">
      <div class="container-disclaimer-btn-event">
        <button class="disclaimer-btn-event">
          Cette section sera déverrouillée à la fin de l'évènement
        </button>
      </div>
      <div class="blur">
        <div>
          <h2 class="text-center">Liste des vins</h2>
          <hr class="divider-1 m-auto" />
          <article v-for="vin in vins" :key="vin._id" class="flex flex-wrap justify-center gap-5">
            <div class="flex flex-col justify-center items-center">
              <img :src="vin.fileUrl" class="w-52" />
              <p>{{ vin.nom }}</p>
            </div>
          </article>
        </div>

        <div class="ressource-block">
          <h2 class="text-center">Ressources liées</h2>
          <hr class="divider-1 m-auto" />
          <p class="text-center">
            Les ressources sont protégées par mot de passe. Veuillez entrer le mot de passe pour
            continuer :
          </p>
          <input class="m-auto" type="password" v-model="password" placeholder="Mot de passe" />
          <button class="red-btn" @click="submitPassword">Soumettre</button>

          <!-- Contenu à afficher si le mot de passe est correct -->
          <div v-if="isPasswordCorrect">
            <!-- Votre contenu protégé par mot de passe -->
            <h2>Ressources orotefgé par mdp oeeeeeeee</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="img-bottom-page mb-10">
      <div class="top-left-square bg-default-red"></div>
      <div class="bottom-right-square bg-default-black"></div>
      <img src="@/assets/BD118-1024x684.jpg" class="image1" />
      <img src="@/assets/c600x400.jpeg" class="image2" />
    </div>
    <div class="h-10"></div>
    <!-- Modale -->
    <div v-if="isModalVisible" class="modal-container">
      <div class="modal">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>
          <h2>Inscription à la session "{{ currentAtelier.title }}"</h2>
          <p class="disclaimer">
            Attention : vous devez avoir 18 ans pour vous inscrire à cette session
          </p>
          <p class="inline-flex">
            <img src="@/assets/icons/date-svgrepo-com.svg" class="info-icon" />{{
              currentAtelier.startDate
            }}
          </p>
          <br />
          <p class="inline-flex">
            <img
              src="@/assets/icons/clock-with-white-face_icon-icons.com_72804.svg"
              class="info-icon"
            />{{ currentAtelier.duration }}h
          </p>
          <br />
          <p class="inline-flex">
            <img
              src="@/assets/icons/3289574-clan-family-group-peer-people_107094.svg"
              class="info-icon"
            />{{ currentAtelier.remainingSpots }} places restantes
          </p>
          <br />

          <form @submit.prevent="addParticipant">
            <p>Votre email</p>
            <input type="email" v-model="participantEmail" placeholder="exemple@mail.com" />

            <button type="submit" class="red-btn">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isModalVisible = ref(false)

import { ref, onMounted, computed, watch, reactive } from 'vue'
import { useAtelierStore } from '../stores/atelierStore'
import { useEcoleStore } from '../stores/ecoleStore'
import { useRoute, useRouter } from 'vue-router'
import { useVinStore } from '@/stores/vinStore'

const atelierStore = useAtelierStore()
const ecoleStore = useEcoleStore()
const route = useRoute()
const router = useRouter() // Create a router instance
const currentAtelier = computed(() => atelierStore.currentAtelier)
const participantEmail = ref('')
const password = ref('') // Variable pour stocker le mot de passe saisi par l'utilisateur

const vinStore = useVinStore()
const vins = computed(() => vinStore.vins)

async function addParticipant() {
  if (participantEmail.value) {
    const participantData = { email: participantEmail.value }
    await atelierStore.addParticipantToAtelier(route.params.id, participantData)
    await atelierStore.fetchAtelier(route.params.id) // Refresh the atelier to show the new participant
    participantEmail.value = '' // Reset the input after adding
    alert('Participant added successfully')
    closeModal()
  }
}

onMounted(async () => {
  await Promise.all([atelierStore.fetchAtelier(route.params.id)])
  await Promise.all([vinStore.fetchAllVins(route.params.id)])
})

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const submitRegistration = () => {
  console.log('Inscription confirmée pour :', currentAtelier.title)
  // ajouter ici la logique pour effectuer une action d'inscription
  // Une fois l'inscription réussie, fermer la modale
  closeModal()
}

let correctPassword = ''

// Fonction asynchrone pour charger les données de l'atelier et mettre à jour le mot de passe correct
const loadAtelierData = async () => {
  await atelierStore.fetchAtelier(route.params.id)
  correctPassword = currentAtelier.value.password
}

// Appeler la fonction de chargement des données de l'atelier lors du montage du composant
onMounted(loadAtelierData)

// Utiliser watch pour détecter les changements dans currentAtelier et mettre à jour correctPassword
watch(currentAtelier, () => {
  correctPassword = currentAtelier.value.password
})

// Méthode pour vérifier si le mot de passe saisi est correct
const isPasswordCorrect = ref(false)
const submitPassword = () => {
  if (password.value === correctPassword) {
    isPasswordCorrect.value = true // Afficher le contenu si le mot de passe est correct
  } else {
    alert('Mot de passe incorrect')
  }
}
</script>

<style>
.header-banner-img {
  background-image: url('@/assets/thumbnail_atelier.jpg');
}

.info-event-card {
  position: relative;
  background-color: var(--default-light-grey);
  padding: 40px;
}

.info-event-card .price {
  font-size: 20px;
  color: var(--default-red);
}

.content-wrapper {
  max-height: 340px;
  position: relative;
  max-width: 550px;
  top: -100px;
  z-index: 2;
}

.event-title {
  color: var(--default-red);
  font-family: 'Futura Std Medium';
}

.img-bottom-page {
  width: 100%;
  position: relative;
  height: 600px;
}

.img-bottom-page img {
  position: relative;
  width: 60%;
  height: 400px;
  object-fit: cover;
}

.img-bottom-page .image1 {
  border: solid 5px var(--default-black);
}

.img-bottom-page .image2 {
  left: 40%;
  top: -200px;
  border: solid 5px var(--default-red);
}

.info-post-event {
  width: 100%;
  background-color: var(--default-light-grey);
  margin-bottom: 5rem;
  padding: 20px;
}

.ressource-block {
  display: flex;
  flex-direction: column;
}

.ressource-block input,
.modal input {
  width: 245px;
}

.ressource-block input,
.ressource-block p {
  margin: 0 auto 20px auto;
}

.ressource-block button {
  margin: 0 auto;
}

.ressource-block p {
  max-width: 245px;
  font-size: 12px;
}

.modal-container {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  max-width: 1000px;
  margin: 50px auto;
  background-color: var(--default-light-grey);
}

.modal h2 {
  color: var(--default-red);
}

.modal .disclaimer {
  font-weight: bold;
}

.modal-content {
  padding: 20px;
}

.modal-content > * {
  margin-bottom: 1.5rem;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

.disclaimer-btn-event {
  max-width: 300px;
  background-color: var(--default-red);
  color: var(--vt-c-white);
  padding: 10px 20px;
  text-align: center;
}

.container-disclaimer-btn-event {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.info-icon {
  margin-right: 5px;
  width: 20px;
}
</style>
