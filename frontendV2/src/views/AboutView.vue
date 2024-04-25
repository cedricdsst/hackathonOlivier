<template>
    <section class="hero mb-[100px] g-cover bg-no-repeat text-center py-32 px-4 cust-full-width">
      <div class="header  flex flex-col items-center justify-center">
        <small class="mb-5 text-white">Accueil > À propos</small>
        <h1 class="text-white text-5xl font-bold mb-4">À propos</h1>
        <span class="border-2 w-1/3 border-color-wine my-6"></span>
        <h2 class="text-white mb-4">Laissez vous guider par la douceur de nos saveurs</h2>
    
      </div>
    </section>
    <section class="bg-white py-8">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-semibold border-b-4 border-color-wine w-max pb-4">À propos de nous</h2>
      <p class="mt-4 text-gray-600">
        Passionné par tous types de Savoirs : Spatial, Mathématiques, Physique, Informatique, Intelligence Artificielle, Œnologie…
      </p>
      <p class="mt-2 text-gray-600">
        Après deux années de recherches scientifiques au tout début de ma carrière, je m'investis depuis plus de 25 ans dans l'enseignement des disciplines scientifiques auprès du public universitaire et de la formation pour adultes.
      </p>
      <p class="mt-2 text-gray-600">
        Ma pratique : Faire (re)découvrir les Sciences sous de nouveaux angles (historiques, humains, ludiques, ...) et lier celles-ci à l'Actualité et au Monde d'aujourd'hui et de demain. L'évolution rapide des IA (Midjourney, Dall-e, Chat GPT, Avia, Stable Diffusion,...) en est un parfait exemple et se trouve au coeur de mes différents cours pour illustrer l'interaction entre Connaissances et Applications pratiques.
      </p>

      <!-- PROJETS EN COURS -->
      <div class="mt-6">
        <h3 class="text-2xl font-semibold text-gray-800">Projets en Cours sur 2024 - ...</h3>
        <ul class="list-disc ml-5 mt-2 text-gray-600">
          <li>Thèse de Doctorat sur le rôle et les besoins des professeurs des écoles dans l'enseignement de l'astronomie à l'école primaire.</li>
          <li>Ateliers autour de l'esprit critique et de la zététique (l'art du doute).</li>
          <li>Formateur en dégustation de vins (Ateliers).</li>
          <li>Spectacles Astronomie et Musique.</li>
        </ul>
      </div>

      <!-- PROJETS REALISES -->
      <div class="mt-6">
        <h3 class="text-2xl font-semibold text-gray-800">Projets Réalisés sur la Période 2012 - 2023</h3>
        <ul class="list-disc ml-5 mt-2 text-gray-600">
          <li>Cuisine Moléculaire.</li>
          <li>Organisation de voyages culturels : ROME, FLORENCE, VENISE.</li>
          <li>Conférences grand public : L'univers a-t-il un sens ? La place de l'homme dans l'univers.</li>
          <li>Conférence à deux voix sur les Harmonies du Cosmos avec Philippe Forget, chef d’orchestre.</li>
          <li>Réalisateur d'une émission radiophonique mensuelle : TimeLapse.</li>
          <li>Mise en place d'une chaîne Youtube pour podcaster et enrichir par l'image l'émission TimeLapse. <a href="https://www.youtube.com/c/OlivierBonneton/videos" class="text-red-600 hover:underline">youtube.com/c/OlivierBonneton/videos</a></li>
          <li>Sortie de mon premier livre « TIMELAPSE » disponible sur <a href="https://www.amazon.fr/" class="text-red-600 hover:underline">amazon.fr</a></li>
          <li>Spectacles Astronomie et Musique : Représentations (Festival à Vezelay, Rillieux...) <a href="http://www.spacionotes.com/" class="text-red-600 hover:underline">spacionotes.com</a></li>
        </ul>
      </div>

      <!-- MOOCS & CERTIFICATIONS -->
      <div class="mt-6">
        <h3 class="text-2xl font-semibold text-gray-800">MOOCS & Certifications</h3>
        <ul class="list-disc ml-5 mt-2 text-gray-600">
          <li>Défis et enjeux de la Cybersécurité (Université Bretagne Sud) - Score 84%</li>
          <li>Exercer son esprit critique : données et raisonnements fallacieux - Score 116 % ;-)</li>
          <!-- ... Autres certifications ... -->
          <li>WSET 2 : Wine and Spirit Education Trust Level 2 Mention Distinction</li>
        </ul>
      </div>
    </div>
  </section>

    

    <section class="bg-gray-50 py-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap justify-center items-center">
          <!-- Image container -->
          <div class="w-full md:w-1/2 p-4">
            <!-- First image -->
            <img class="rounded-lg shadow-lg" src="../assets/img/assiette_fromage.jpeg" alt="Dégustation de vin">
          </div>

          <div class="w-full md:w-1/2 p-4">
            <!-- Second image -->
            <img class="rounded-lg shadow-lg" src="../assets/img/planche_degustation.jpg" alt="Assortiment de fromages">
          </div>
        </div>

        <!-- Text Content -->
        <div class="mt-6 text-center">
          <h2 class="text-3xl font-semibold text-gray-800">Un voyage gustatif</h2>
          <p class="mt-4 text-gray-600">
            Plongez dans l'univers des arômes et des saveurs avec nos ateliers de dégustation. Nos séances sont conçues pour éveiller vos sens et affiner votre palais, en vous proposant une harmonie parfaite entre vins exquis et fromages sélectionnés avec soin. Vivez une expérience conviviale et enrichissante, guidée par des sommeliers passionnés.
          </p>
        </div>
      </div>
    </section>


    </template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.hero {
  background-image: radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('../assets/img/verre_rouge.jpg');
  background-size: cover;
  background-position: 0px 0px;
  text-align: left;
  width: auto;
  height: 50vh;
  display: flex;

  /* padding: 100px 0; */
}

.border-color-wine
{
  border-color: var(--default-red);
}

.hero div {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: 180px;
}

.header-banner-img
{
    background-image: url('@/assets/img/verre_rouge.jpg');
}

.cust-full-width
{
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;
}

.scoller {
  background-color: red;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scoller div {
  margin-top: 100px;
}
.scoller div a img {
  width: 32px;
  height: 32px;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}



/* Utiliser les keyframes définies pour créer une classe animate-bounce */
.animate-bounce {
  animation: bounce 1s infinite;
}
.concepte,
.NextEvent {
  color: black;
  margin-top: 80px;
  display: flex;
  justify-content: center;
}
.concepte span,
.NextEvent span {
  width: 20%;
}
.concepte article {
  width: 100%;
  padding: 5px;
  margin: 2px;
  margin-top: 30px;
}
.concepte article img {
  width: 64px;
  height: 64px;
}
.concepte article h3 {
}

.concepte article p {
  padding: 15px;
}
.NextEvent {
  display: flex;
  justify-content: center;
}
.event {
  background-color: #f1f1f1;
  margin-right: 10px;
}

@media (min-width: 1024px) {
  .evenement {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>
