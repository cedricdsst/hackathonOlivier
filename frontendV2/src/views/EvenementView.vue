<template>
  <div v-if="currentAtelier">
    <div class="header-banner header-banner-img cust-full-width">
      <div class="header-gradiant cust-full-width">
        <div class="header-square-1 bg-default-red"></div>
      <div class="header-square-2 bg-default-black"></div>
      <div class="header-square-3 bg-default-black"></div>
      </div>
    </div>
    <div class="content-wrapper">
        <div class="info-event-card">
            <div class="top-left-square bg-default-red"></div>
            <div class="bottom-right-square bg-default-black"></div>
            <h2 class="event-title mb-3 futura-med">{{ currentAtelier.title }}</h2>
            <div class="event-summary mb-3">
                <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/date-svgrepo-com.svg" class="info-icon">{{ currentAtelier.startDate }}</p><br />
                <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/clock-with-white-face_icon-icons.com_72804.svg" class="info-icon">{{ currentAtelier.duration }}h</p><br />
                <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/3289574-clan-family-group-peer-people_107094.svg" class="info-icon">{{ currentAtelier.remainingSpots }} places restantes</p><br />
            </div>
            <p class="mb-3">
                <b>Cet évènement est réservé au plus de 18 ans</b>
            </p>

            <div class="price mb-3">{{ currentAtelier.price }} € par pers.</div>
            <button class="red-btn" @click="openModal">Je souhaite m'inscrire</button>
      </div>
    </div>

    <div class="mb-[100px]">
        <h2>Description de l'atelier</h2>
        <hr class="divider-1" />

        <p>{{ currentAtelier.description }}</p>
        <button class="white-btn mt-4">Bouton optionnel</button>
    </div>

    <div v-if="currentAtelier.finished" class="info-post-event">
      <div>
        <h2 class="text-center">Liste des vins</h2>
        <hr class="divider-1 m-auto" />
        <article class="flex flex-wrap justify-center gap-5">
          <div v-for="vin in vins" :key="vin._id" class="flex flex-col justify-center items-center">
            <img :src="vin.fileUrl" class="bottle-event" />
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
                <p id="incorrect-pass">Mot de passe incorrect</p>
            </div>
            <div class="text-center">
                <button class="red-btn" @click="submitPassword">Soumettre</button>
            </div> 
        </div>
          <div v-if="isPasswordCorrect" class="">
            <!-- Contenu protégé par mot de passe -->
            <h2>PDF</h2>
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
          <article class="flex flex-wrap justify-center gap-5">
            <div class="flex flex-col justify-center items-center">
            </div>
          </article>
        </div>

            <div class="ressource-block">
                <h2 class="text-center">Ressources liées</h2>
                <hr class="divider-1 m-auto" />
                <p class="text-center">Les ressources sont protégées par mot de passe. Veuillez entrer le mot de passe pour continuer :</p>
                <div class="text-center">
                    <input class="m-auto" type="password" placeholder="Mot de passe" />
                </div>
                <div class="text-center">
                    <button class="red-btn">Soumettre</button>
                </div>
        </div>
      </div>
    </div>


    <div class="img-bottom-page mt-[100px] mb-10">
            <div class="top-left-square bg-default-red"></div>
            <div class="bottom-right-square bg-default-black"></div>
        <img src="@/assets/BD118-1024x684.jpg" class="image1">
        <img src="@/assets/c600x400.jpeg" class="image2">
    </div>
<div class="h-10"></div>
    <!-- Modale -->
    <div v-if="isModalVisible" class="modal-container">
        <div class="modal">
            <div class="modal-content">
                <span @click="closeModal" class="close">&times;</span>
                <template v-if="!submitted">
                    <h2 class="futura-med">Inscription à la session "{{ currentAtelier.title }}"</h2>
                    <p class="disclaimer">Attention : vous devez avoir 18 ans pour vous inscrire à cette session</p>
                    <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/date-svgrepo-com.svg" class="info-icon">{{ currentAtelier.startDate }}</p><br />
                    <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/clock-with-white-face_icon-icons.com_72804.svg" class="info-icon">{{ currentAtelier.duration }}h</p><br />
                    <p class="inline-flex text-[12px] font-bold"><img src="@/assets/icons/3289574-clan-family-group-peer-people_107094.svg" class="info-icon">{{ currentAtelier.remainingSpots }} places restantes</p><br />
                
                    <form @submit.prevent="addParticipant">
                    <div class="mb-6 mt-[15px]">
                        <p>Votre email</p>
                        <input class="text-[12px]" type="email" v-model="participantEmail" placeholder="exemple@mail.com" />
                    </div>
                    <button type="submit" class="red-btn">S'inscrire</button>
                    </form>
                </template>
<template v-else>
                    <h2 class="futura-med">Inscription confirmée</h2>
                    <p class="text-[16px] futura-med">Votre inscription a bien été prise en compte. <br /> Vous allez bientôt recevoir un email pour régler vos places afin de valider votre inscription.</p>
                </template>
</div>
</div>
</div>
</div>
</template>

<script setup lang="ts">
const isModalVisible = ref(false)

const submitted = ref(false);

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
        const participantData = { email: participantEmail.value };
        await atelierStore.addParticipantToAtelier(route.params.id, participantData);
        await atelierStore.fetchAtelier(route.params.id);  // Refresh the atelier to show the new participant
        participantEmail.value = '';  // Reset the input after adding
        submitted.value = true;
        //closeModal()

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

let correctPassword = ''

// Fonction asynchrone pour charger les données de l'atelier et mettre à jour le mot de passe correct
const loadAtelierData = async () => {
  await atelierStore.fetchAtelier(route.params.id)
  correctPassword = currentAtelier.value.password
}

// Fonction de chargement des données de l'atelier lors du montage du composant
onMounted(loadAtelierData)

// Watch pour détecter les changements dans currentAtelier et mettre à jour correctPassword
watch(currentAtelier, () => {
  correctPassword = currentAtelier.value.password
})

// Vérifie si le mot de passe saisi est correct
const isPasswordCorrect = ref(false)
const submitPassword = () => {
  if (password.value === correctPassword) {
    isPasswordCorrect.value = true
  } else {
    const incorrectPass = document.getElementById('incorrect-pass');
    const computedStyle = window.getComputedStyle(incorrectPass);
    const displayValue = computedStyle.getPropertyValue('display');

    if (displayValue === 'block') {
            incorrectPass.style.display = "none";
            setTimeout(() => {
                incorrectPass.style.display = "block";
            }, 300);
        } else {
            incorrectPass.style.display = "block";
        }
  }
}
</script>


<style>
.header-banner-img
{
  background-image: url('@/assets/thumbnail_atelier.jpg');
}

.info-event-card
{
  position: relative;
  background-color: var(--default-light-grey);
  padding: 40px;
}

.info-event-card .price
{
  font-size: 20px;
  color: var(--default-red);
}

.content-wrapper
{
  max-height: 340px;
  position: relative;
  max-width : 550px;
  top : -200px;
  z-index: 2;
}

.event-title
{
  color : var(--default-red);
  font-family: 'Futura Std Medium';
}

.img-bottom-page
{
  width: 100%;
  position: relative;
  height: 600px
}

.img-bottom-page img
{
  position: relative;
  width: 60%;
  height: 400px;
  object-fit: cover;
}

.img-bottom-page .image1
{
  border: solid 5px var(--default-black);
}

.img-bottom-page .image2
{
  left: 40%;
  top:-200px;
  border: solid 5px var(--default-red);
}

.info-post-event
{
  width: 100%;
  background-color: var(--default-light-grey);
  margin-bottom: 5rem;
  padding: 50px 20px;
}

.ressource-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ressource-block input, .modal input
{
  width: 245px;
}

.ressource-block input, .ressource-block p
{
  margin: 0 auto 20px auto;
}

.ressource-block button
{
  margin: 0 auto;
}

.ressource-block p
{
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

.modal
{
  position: relative;
  max-width: 1000px;
  margin: 50px auto;
  background-color: var(--default-light-grey);
}

.modal h2 
{
  color: var(--default-red);
}

.futura-med
{
  font-family: 'Futura Std Medium';
  font-weight: bold;
}

.modal .disclaimer
{
  font-weight: bold;
}


.modal-content {
padding: 40px;
}

.modal-content > *
{
  margin-bottom: 15px;
}

.close {
  color: #8B8A8A;
  position: absolute;
  top: 0;
  right: 30px;
  font-size: 40px;
  cursor: pointer;
}

.disclaimer-btn-event
{
    cursor: none;
    max-width: 300px;
    background-color: var(--default-red);
    color: var(--vt-c-white);
    padding: 10px 20px;
    text-align: center;
}

.container-disclaimer-btn-event
{
    position: relative;
    top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.info-icon
{
  margin-right: 10px;
  width: 20px;
}

.bottle-event
{
    width: 230px;
    height: 230px;
    background-color: #ffffff;
    padding: 20px;
}

#incorrect-pass
{
    display: none;
    font-size: 16px;
    color: var(--default-red);
}
</style>