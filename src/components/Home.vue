<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg-intro bg-cover-xl">
      <div class="container text-center">
        <pricing class="py-2 py-md-5"></pricing>
        <h1 class="text-white pt-4 pt-md-5 text-uppercase font-weight-bold h2">Transport de personnes âgées - adultes - enfants avec ou sans mobilité réduite</h1>
        <p class="text-white pt-2 pt-md-3 text-uppercase font-weight-bold h2">La garantie du meilleur prix sur Genève</p>
        <p class="text-white pt-2 pt-md-3 text-uppercase font-weight-bold h2"><a href="tel:+41799002828" class="text-white">Tel : 079 900 28 28</a></p>
      </div>
    </div>
    <div class="container py-5 mb-4">
      <div class="row text-center p-3">
        <div class="col-md-3">
          <i class="fa fa-usd fa-5x" aria-hidden="true"></i>
          <h3 class="font-weight-bold m-3 text-uppercase h4">Garantie du prix le plus bas</h3>
          <p>Faites donc des économies avec nos prix les plus bas sur Genève ! Nos tarifs sont fixes et garantis lors de la réservation.</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-hand-paper-o fa-5x" aria-hidden="true"></i>
          <h3 class="font-weight-bold m-3 text-uppercase h4">Annulation gratuite</h3>
          <p>Un changement de programme? Aucun souci. Vous disposez d'une annulation gratuite avec un préavis de 24 heures. (par téléphone ou par email).</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-clock-o fa-5x" aria-hidden="true"></i>
          <h3 class="font-weight-bold m-3 text-uppercase h4">Service dans les temps</h3>
          <p>Grâce à notre connaissance minutieuse de Genève et de ses environs, nous garantissons un service ponctuel et une arrivée à destination dans les temps.</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-id-card-o fa-5x" aria-hidden="true"></i>
          <h3 class="font-weight-bold m-3 text-uppercase h4">Chauffeurs professionels</h3>
          <p>L'ensemble de nos chauffeurs Transport One sont assurés et agréés. C’est pourquoi nous garantissons un service soigné, sécurisé et de qualité.</p>
        </div>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid bg-geneva bg-cover-xl text-center text-white">
      <div class="container">
        <h4 class="py-5">Fondé il y a plus de 20 ans, Transport One est une entreprise familiale agrée dans le transport de personnes âgées – adultes – enfants.</h4>
      </div>
    </div>
    <div class="container">
      <div class="py-5">
        <h2 class="text-uppercase mb-4">Nos services</h2>
        <p>Transport One permet à tout le monde d’être transporté et accompagné durant leurs déplacements dans notre rayonnante ville de Genève et de ses environs.</p>
        <p>Notre engagement professionnel garantit un service ponctuel de qualité ainsi qu’un accompagnement soigné et sécurisé avec chauffeur privé.</p>
        <p>Nous avons l'expérience et le savoir-faire pour le transport de personnes à mobilité réduite, comme les personnes agées ou handicapées.</p>
        <p>Laissez-vous donc transporter sereinement tout en faisant des économies !</p>
        <div class="row">
          <div class="col-md-6 mt-5">
            <p>Clientele :</p>
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-users"></i>Personnes âgées</li>
              <li><i class="fa-li fa fa-users"></i>Adultes</li>
              <li><i class="fa-li fa fa-users"></i>Enfants</li>
              <li><i class="fa-li fa fa-users"></i>Groupe d’amis, familles, club sportif, déplacement d’entreprise...</li>
              <li><i class="fa-li fa fa-users"></i>Personnes à mobilité réduite</li>
            </ul>
          </div>
          <div class="col-md-6 mt-5">
            <p>À destination de :</p>
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-map-marker"></i>Rendez-vous médicaux</li>
              <li><i class="fa-li fa fa-map-marker"></i>Centre de bien-être</li>
              <li><i class="fa-li fa fa-map-marker"></i>École</li>
              <li><i class="fa-li fa fa-map-marker"></i>Rendez-vous privé</li>
              <li><i class="fa-li fa fa-map-marker"></i>Aéroport, Gare, autre destination...</li>
            </ul>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-md-1 text-center mb-3">
            <i class="fa fa-pause-circle-o fa-4x" aria-hidden="true"></i>
          </div>
          <div class="col-md-11">
            <p>Avec notre service « <strong>attente</strong> » vous n’avez plus de soucis à vous faire. Nos chauffeurs vous attendent dans le véhicule, salle d’attente, ou autre lieu et vous ramènent à destination une fois votre rendez-vous terminé.</p>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-md-1 text-center mb-3">
            <i class="fa fa-shopping-basket fa-3x" aria-hidden="true"></i>
          </div>
          <div class="col-md-11">
            <p>De plus, cette année nous avons mis en place un service nommé « <strong>Commission</strong> » :</p>
            <p>Un de nos chauffeurs vient vous chercher à votre domicile et vous accompagne pour vos achats (magasin alimentaire, marché local, magasin de meuble...).</p>
            <p>De plus, nous ne restons pas uniquement dans le véhicule à attendre, nous venons avec vous afin de vous aider à porter vos achats et les placer dans nos véhicules qui sont aisément adaptés pour transporter toutes dimensions d’achat effectué. Pour finir, nous vous raccompagnons à domicile et vous aidons à déposer les commissions réalisées chez vous.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
export default {
  components: { 'pricing': Pricing }
}
</script>

<style>
</style>
