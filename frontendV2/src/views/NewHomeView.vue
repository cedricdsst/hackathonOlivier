
    <template>
    <div id="app">
      <!-- Section Hero avec Tailwind CSS -->
      <section class=" hero g-cover bg-no-repeat bg-fixed text-center py-32 px-4">
        
        <div class=" header flex flex-col items-center justify-center">
          <h1 class="text-white text-5xl font-bold mb-4">Apprendre à <br> déguster autrement</h1>
          <span class="border-2 w-full border-red-500 my-6"></span>
          <p class="text-white text-xl mb-4">Initiation à l’oenologie à Lyon</p>
          <!-- Ajoutez plus de contenu ou des boutons si nécessaire -->
        </div>
      </section>
      <section class="scoller relative bg-cover bg-center flex justify-center items-end">
        <div class="absolute animate-bounce">
            <a href=""><img src="../assets/img/Icone_mouse_scroll.svg" alt="" ></a>
        </div>
      </section>
      <section class="concepte bg-white flex flex-col items-center justify-center text-center p-6">
        <h2 class="text-2xl font-bold mb-4">Le concept</h2>
        <span class="mx-4 border-2 w-full border-red-500 my-6"></span>
        <div class="flex justify-around items-stretch w-full md:flex-row flex-col">
            <article class="flex flex-col items-center p-4">
            <img src="../assets/img/wine_glass_icon_156828.svg" alt="" class="mb-2">
            <h3 class="text-xl font-semibold mb-1">Dégustation guidée</h3>
            <p>Découvrez les subtilités des vins avec un expert</p>
            </article>
            <article class="flex flex-col items-center p-4">
            <img src="../assets/img/wine_glass_icon_156828.svg" alt="" class="mb-2">
            <h3 class="text-xl font-semibold mb-1">Apprentissage ludique</h3>
            <p>Apprenez à vous amuser grace à des jeux et des quizz</p>
            </article>
            <article class="flex flex-col items-center p-4">
            <img src="../assets/img/wine_glass_icon_156828.svg" alt="" class="mb-2">
            <h3 class="text-xl font-semibold mb-1">Découverte des vins du monde</h3>
            <p>Voyagez à travers les régions viticoles en une séance</p>
            </article>
        </div>
    </section>
    <section class="NextEvent bg-white flex flex-col items-center justify-center text-center p-6">
        <h2 class="text-2xl font-bold mb-4">Prochain événement</h2>
        <span class="mx-4 border-2 w-full border-red-500 my-6"></span>
        <div class="flex flex-col md:flex-row">
            <div class=" event flex flex-col md:flex-row items-center gap-4 w-full">
                <img class="p-2 object-contain h-40 w-auto ml-4 sm:ml-0" src="../assets/img/thumbnail_evenement.jpg" alt="">
                <article class="flex flex-col items-start w-auto gap-2 ">
                    <h4 class="text-lg font-semibold mb-4">Découverte des vins du monde</h4>
                    <p class="text-sm ">Je vous propose une découverte en 4 temps de différents vins du monde.</p>
                    <p class="text-sm font-bold"><strong>Cet événement est réservé au plus de 18 ans.</strong></p>
                </article>        
                <div class="mr-2 md:mb-0 sm:mb-4 ">
                    <button class="text-white bg-black w-10 h-10">+</button>
                </div>
            </div>

            <div class="flex justify-center items-center mt-4 md:mt-0 ">
                <button type="button" class="text-sm border-2 px-4 py-2 w-full hover:bg-gray-200">Voir tous les événements ></button>
            </div>
        </div>
    </section>
    <section class="NextEvent bg-white flex flex-col items-center justify-center text-center p-6">
        <h2 class="text-2xl font-bold mb-4">A propos</h2>
        <span class="mx-4 border-2 w-full border-red-500 my-6"></span>
        <div class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mx-auto p-6">
            <div class="flex-shrink-0">
                <img src="../assets/img/Olivier_bonneton.webp" alt="Olivier Bonneton" class="object-contain h-40 w-40 md:w-48 lg:w-56 rounded-full border-4 border-red-600">
            </div>
            <div class="mt-6 md:mt-0 md:ml-6 lg:ml-10 flex flex-col justify-center">
                <p class="mb-6">Découvrez mon atelier de dégustation de vin à Lyon, spécialement conçu pour les débutants passionnés et curieux. Dans une ambiance chaleureuse et conviviale, je vous invite à un voyage œnologique pour découvrir les vins du monde. Ma table d'animation est le lieu idéal pour échanger, apprendre et partager des moments uniques autour du vin. Rejoignez-nous et laissez-vous guider par nos experts pour une expérience de dégustation inoubliable.</p>
                <button type="button" class="text-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">En savoir plus</button>
            </div>
        </div>
    </section>
      <!-- D'autres sections peuvent être ajoutées ici -->
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
    background-image: url('../assets/img/background_home_banner.jpg');
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
.concepte, .NextEvent{
    color: black;
    margin-top: 80px;
    display: flex;
    justify-content: center;
}
.concepte span, .NextEvent span {
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
.NextEvent{
 display: flex;
 justify-content: center;
 
}
.event{
    background-color: #f1f1f1;
    margin-right: 10px;
}
  /* Ajouter d'autres styles si nécessaire */
  </style>

  

  