<template>
    <div class="header-banner header-banner-img cust-full-width">
        <div class="header-gradiant cust-full-width"></div>
    </div>
    <div class="content-wrapper">
        <div class="info-event-card">
            <div class="top-left-square bg-default-red"></div>
            <div class="bottom-right-square bg-default-black"></div>
            <h2 class="event-title">Découverte des vins du monde</h2>
            <div class="event-summary">
                <p>Date</p>
                <p>Durée</p>
                <p>Places restantes</p>
            </div>
            <p>
                Je vous propose une découverte <br />
                <b>Cet évènement est réservé au plus de 18 ans</b>
            </p>

            <div>Prix</div>
            <button class="red-btn">Je souhaite m'inscrire</button>
        </div>
    </div>

    <div class="mb-10">
        <h2>Titre niveau 2</h2>
        <hr class="divider-1" />

        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi, vitae aenean cras feugiat massa etiam quisque mi, convallis sed nibh iaculis praesent sem lobortis. Montes phasellus non orci senectus nostra, dictumst bibendum magnis vivamus ridiculus scelerisque, risus blandit et torquent. Habitant sed ligula malesuada aptent quisque lobortis, dignissim egestas montes in nisi, lectus nibh felis rhoncus donec. Cum aliquet blandit euismod montes himenaeos, non aliquam libero etiam laoreet magna, erat platea fringilla nam. Ante magna tempor consequat ad potenti elementum pellentesque volutpat, mattis ultrices sagittis non interdum vestibulum venenatis id, eget lectus semper odio fusce nec lacus.</p>
        <button class="white-btn mb-10 mt-4">Bouton optionnel</button>
    </div>

    <div class="img-bottom-page mb-10">
            <div class="top-left-square bg-default-red"></div>
            <div class="bottom-right-square bg-default-black"></div>
        <img src="@/assets/BD118-1024x684.jpg" class="image1">
        <img src="@/assets/c600x400.jpeg" class="image2">
    </div>
</template>
<script>
</script>

<style>
.header-banner-img
{
    background-image: url('@/assets/thumbnail_atelier.jpg');
}

.info-event-card
{
    background-color: var(--default-light-grey);
    padding: 40px;
}

.content-wrapper
{
    max-height: 340px;
    position: relative;
    max-width : 550px;
    top : -100px;
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
</style>