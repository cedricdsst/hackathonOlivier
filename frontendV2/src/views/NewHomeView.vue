
    <template>
    <div id="app" class="">

      <!-- Section Hero avec Tailwind CSS bg-white text-center py-20 px-4 -->
      <section class="hero g-cover bg-no-repeat bg-fixed text-center py-32 px-4 header-gradiant
">
        
        <div class=" header flex flex-col items-center justify-center">
          <h1 class="text-white text-5xl font-bold mb-4">Apprendre à <br> déguster autrement</h1>
          <span class="border-2 w-full border-VinColor my-6"></span>
          <p class="text-white text-xl mb-4">Initiation à l’oenologie à Lyon</p>
          <!-- Ajoutez plus de contenu ou des boutons si nécessaire -->
        </div>
      </section>
      
      <section class="scoller relative bg-cover bg-center flex justify-center items-end">
        <div class="absolute animate-bounce">
            <a href=""><img src="../assets/img/Icone_mouse_scroll.svg" alt="" ></a>
        </div>
      </section>
      
      <section class="concepte mt-20 bg-white flex flex-col items-center justify-center text-center py-20 px-4 ">
        <h2 class="text-2xl font-bold mb-4">Le concept</h2>
        <span class="mx-6 border-2 w-full border-VinColor my-6"></span>
        <div class="flex justify-around items-stretch w-full md:flex-row flex-col">
            <article class="flex mx-10 flex-col items-center p-4">
              <img src="../assets/img/wine_glass_icon_156828.svg" alt="" class="mb-2">
              <h3 class="text-xl font-semibold mb-1">Dégustation guidée</h3>
              <p>Découvrez les subtilités des vins avec un expert</p>
            </article>
            <article class="flex mx-10 flex-col items-center p-4">
              <img src="../assets/img/test-svgrepo-com.svg" alt="" class="mb-2">
              <h3 class="text-xl font-semibold mb-1">Apprentissage ludique</h3>
              <p>Apprenez à vous amuser grace à des jeux et des quizz</p>
            </article>
              <article class="flex mx-10 flex-col items-center p-4">
              <img src="../assets/img/world-1-svgrepo-com.svg" alt="" class="mb-2">
              <h3 class="text-xl font-semibold mb-1">Découverte des vins du monde</h3>
            <p>Voyagez à travers les régions viticoles en une séance</p>
            </article>
        </div>
      </section>
      
      <section class="NextEvent bg-white flex flex-col items-center justify-center text-center py-20 px-4">
          <h2 class="text-2xl font-bold mb-4">Prochain événement</h2>
          <span class="mx-4 border-2 w-full border-VinColor my-6"></span>
          <div class="flex flex-col md:flex-row">
            <div class="event flex flex-col md:flex-row items-center gap-4 w-full">
                <img class="p-2 object-contain h-40 w-auto ml-4 sm:ml-0" src="../assets/img/thumbnail_evenement.jpg" alt="">
                <article class="flex flex-col items-start w-auto gap-2">
                    <h4 class="text-lg font-semibold mb-4">Découverte des vins du monde</h4>
                    <p class="text-sm">Je vous propose une découverte en 4 temps de différents vins du monde.</p>
                    <p class="text-sm font-bold"><strong>Cet événement est réservé au plus de 18 ans.</strong></p>
                </article>        
                <div class="mr-2 md:mb-0 sm:mb-4">
                    <button class="text-white bg-black w-10 h-10 hover:bg-VinColor">+</button>
                </div>
            </div>

            <div class="flex justify-center items-center mt-4 sm:mt-2">
                <button type="button" class="text-sm text-white bg-VinColor px-4 py-2 whitespace-nowrap">
                    Voir tous les événements
                </button>
            </div>
        </div>

      </section>
      
      <section class="Apropos bg-white flex flex-col items-center justify-center text-center py-20 px-4 ">
          <h2 class="text-2xl font-bold mb-4">A propos</h2>
          <span class="mx-4 border-2 w-full border-VinColor my-6"></span>
          <div class="flex flex-col md:flex-row items-center md:items-start md:text-left p-6">
              <div class="sm:w-full flex justify-center md:justify-end mb-10">
                  <img src="../assets/img/Olivier_cropped.png" alt="Olivier Bonneton" class="object-contain h-40 md:w-48 lg:w-full md:self-end self-center">
              </div>
              <div class=" flex flex-col items-start px-20">
                  <p class="mb-6 text-left ">Découvrez mon atelier de dégustation de vin à Lyon, spécialement conçu pour les débutants passionnés et curieux. Dans une ambiance chaleureuse et conviviale, je vous invite à un voyage œnologique pour découvrir les vins du monde. Ma table d'animation est le lieu idéal pour échanger, apprendre et partager des moments uniques autour du vin. Rejoignez-nous et laissez-vous guider par nos experts pour une expérience de dégustation inoubliable.</p>
                  <button type="button" class="text-white bg-VinColor py-2 px-4 transition-colors md:self-start self-center">En savoir plus</button>
              </div>
          </div>
      </section>

      <section class="py-20 px-4 mt-10">
    <div class="relative w-full h-full mb-10"> <!-- Assurez-vous que le conteneur a une hauteur suffisante -->
        <!-- Première image (gauche) -->
        <img src="../assets/img/gallerie_plateau.jpg" alt="Plateau 1" class="absolute ml-20 top-0 left-1/4 transform -translate-x-1/2 w-1/3 z-10">
        
        <!-- Troisième image (droite) -->
        <img src="../assets/img/gallerie_plateau.jpg" alt="Plateau 3" class="absolute top-0 left-3/4 transform -translate-x-1/2 w-1/3 z-30">
        
        <!-- Deuxième image (centre, en bas et en partie en dessous de la troisième) -->
        <img src="../assets/img/gallerie_plateau.jpg" alt="Plateau 2" class="absolute bottom-0 left-[45%] transform -translate-x-1/2 w-1/4 z-20" style="transform: translateY(50%);">
    </div>
</section>
<div ><span class="my-10 bg-white"></span></div>
    </div>
  </template>
  <script>
  export default {
    name: 'HomePage'
    // Vous pouvez ajouter des données, des méthodes et des composants ici si nécessaire
  }
  </script>
  
  <style scoped>
  /* Assurez-vous d'ajuster les styles selon les besoins de votre design */
  .hero {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/img/background_home_banner.jpg');
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

  .scoller {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scoller div {
    margin-top: 100px;
  }
  .scoller div a img {
    width: 32px ;
    height: 32px ;


  }
  @keyframes bounce {
  0%, 100% {
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
.concepte, .NextEvent, .Apropos {
    color: black;

}
.concepte span, .NextEvent span, .Apropos span{
    width: 5%;
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
.NextEvent{
 display: flex;
 justify-content: center;
 
}
/* button {
  background-color: #8c2c2c;
} */
.event{
    background-color: #f1f1f1;
    margin-right: 10px;
}
  /* Ajouter d'autres styles si nécessaire */
  </style>

  

  