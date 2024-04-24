<template>
  <div id="app">
    <!-- Section Hero avec Tailwind CSS -->
    <section class="hero g-cover bg-no-repeat text-center py-32 px-4 cust-full-width">
      <div class="header flex flex-col items-center justify-center">
        <small class="mb-5">Accueil > Evenement</small>
        <h1 class="text-white text-5xl font-bold mb-4">Evenement à venir</h1>
        <span class="border-2 w-full border-red-500 my-6"></span>
        <p class="text-white text-xl mb-4">Inscriptions réservées aux plus de 18 ans</p>
    
      </div>
    </section>

<!--     <div class="header-banner header-banner-img cust-full-width">
        <div class="header-gradiant cust-full-width">
        <small class="mb-5">Accueil > Evenement</small>
        <h1 class="text-white text-5xl font-bold mb-4">Evenement à venir</h1>
        <span class="border-2 w-full border-red-500 my-6"></span>
        <p class="text-white text-xl mb-4">Inscriptions réservées aux plus de 18 ans</p>

        </div>
    </div> -->


    <section v-for="article in articles" :key="article.id" class="flex flex-col items-center pt-10 pb-5 m-auto bg-white ">
      <div class="max-w-md mx-auto bg-[#F2F2F2] overflow-hidden md:max-w-6xl p-2">
        <div class="md:flex">
          <div class="md:shrink-0">
            <img class="w-full object-cover" src="../assets/img/vins.png" alt="vin" />
          </div>
          <div class="p-5 flex flex-col justify-center">
            <article class="pb-4">
              <h3 class="text-[#8C2C2C] font-semibold">{{ article.title }}</h3>

              <div class="flex gap-4">
                <div class="flex gap-1 items-center">
                  <img class="" src="../assets/icons/calendar.svg" />
                  <p class="text-black text-[10px]">{{ article.date }}</p>
                </div>
                <div class="flex gap-1">
                  <img class="" src="../assets/icons/clock.svg" />
                  <p class="text-black text-[10px]">{{ article.time }}</p>
                </div>
                <div class="flex gap-1">
                  <img class="" src="../assets/icons/places_restantes.svg" />
                  <p class="text-black text-[10px]">{{ article.remainingPlaces }} places restantes</p>
                </div>
              </div>
            </article>

            <p class="mt-2 text-black text-sm">
              {{ article.description }} <br />
            </p>
            <p class="mt-2 text-black text-sm">
              <strong> Cet évenement est réservé au plus de 18 ans.</strong>
            </p>
          </div>
          <div class="mr-2 md:mb-0 sm:mb-4 flex items-center">
            <a href="" class="text-white bg-black px-2">+</a>
          </div>
        </div>
      </div>
    </section>


    
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      articles: [
        // Vous pouvez remplir cet array avec les données de vos articles provenant de la base de données
        {
          id: 1,
          title: "Découverte des vins du monde",
          imageSrc: "../assets/img/vins.png",
          date: "18 mai 2024",
          time: "21h30",
          remainingPlaces: 3,
          description: "Je vous propose une découverte en 4 temps de différents vins du monde. Cet événement est réservé au plus de 18 ans."
        },
        // Ajoutez d'autres objets d'article ici si nécessaire
      ]
    };
  }
};
</script>

<style scoped>
/* Assurez-vous d'ajuster les styles selon les besoins de votre design */
.hero {
  background-image: url('../assets/img/verre_rouge.jpg');
  background-size: cover;
  background-position: 0px 0px;
  text-align: left;
  width: auto;
  height: 620px;
  display: flex;

  /* padding: 100px 0; */
}


.hero div {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: 50px;
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
/* Ajouter d'autres styles si nécessaire */
</style>
