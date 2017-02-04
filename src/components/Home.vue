<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg-intro bg-cover-xl">
      <div class="container text-center">
        <pricing class="py-5"></pricing>
        <h3 class="text-white pt-5 text-uppercase"><strong>TRANSPORT AGRéE DE PERSONNES ÂgéES – ADULTES – ENFANTS</strong></h3>
        <h3 class="text-white pt-3 text-uppercase"><strong>AVEC OU SANS MOBILITé REDUITE</strong></h3>
        <h3 class="text-white pt-3 text-uppercase"><strong>LA GARANTIE DU MEILLEUR PRIX SUR GENÈVE</strong></h3>
        <h3 class="text-white pt-3 text-uppercase"><strong>TEL : 079.200.28.28</strong></h3>
      </div>
    </div>
    <div class="container py-5 mb-4">
      <div class="row text-center p-3">
        <div class="col-md-3">
          <i class="fa fa-usd fa-5x" aria-hidden="true"></i>
          <h5 class="font-weight-bold m-3 text-uppercase">GARANTIE DU PRIX LE PLUS BAS</h5>
          <p>Faites donc des économies avec nos prix les plus bas sur Genève ! Nos tarifs sont fixes et garanties lors de la réservation.</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-hand-paper-o fa-5x" aria-hidden="true"></i>
          <h5 class="font-weight-bold m-3 text-uppercase">Annulation gratuite</h5>
          <p>Un changement de programme? aucun souci. Vous disposez d&#39;une annulation gratuite avec un préavis de 24 heure. (par téléphone ou par email).</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-clock-o fa-5x" aria-hidden="true"></i>
          <h5 class="font-weight-bold m-3 text-uppercase">Service dans les temps</h5>
          <p>Grace à notre connaissance minutieuse de Genève et de ses environs, nous garantissons un service ponctuel et une arrivée à destination dans les temps.</p>
        </div>
        <div class="col-md-3">
          <i class="fa fa-id-card-o fa-5x" aria-hidden="true"></i>
          <h5 class="font-weight-bold m-3 text-uppercase">Chauffeurs professionels</h5>
          <p>L&#39;ensemble de nos chauffeurs Transport One sont assurés et agréés. C’est pourquoi nous garantissons un service soigné, sécurisé et de qualité.</p>
        </div>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid bg-geneva bg-cover-xl text-center text-white">
      <div class="container">
        <h4 class="py-5">Fondé depuis plus de 20 ans, Transport One est une entreprise familiale agrée dans le transport professionnel de personnes âgées – adulte – enfants.</h4>
      </div>
    </div>
    <div class="container">
      <div class="py-3">
        <h1 class="pb-3">Nos services</h1>
        <p>Transport One permet à tout le monde d’être transporté et accompagné durant leurs déplacements dans notre rayonnante ville de Genève et de ses environs.</p>
        <p>Notre engagement professionnel garantit un service ponctuel de qualité ainsi qu’un accompagnement soigné et sécurisé avec chauffeur privé.</p>
        <p>Laissez-vous donc transporter sereinement tout en faisant des économies!</p>
        <div class="row">
          <div class="col-md-6  mt-5">
            <p>Personne(s):</p>
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-users"></i>Âgées</li>
              <li><i class="fa-li fa fa-users"></i>Adultes</li>
              <li><i class="fa-li fa fa-users"></i>Enfants</li>
              <li><i class="fa-li fa fa-users"></i>Groupe d’amis, familles, club sportif, déplacement d’entreprise...</li>
              <li><i class="fa-li fa fa-users"></i>Avec ou sans mobilité réduite</li>
            </ul>
          </div>
          <div class="col-md-6 mt-5">
            <p>A destination de:</p>
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
            <p>Avec notre service "<strong>attente</strong>" vous n’avez plus de soucis à vous faire. Nos chauffeurs vous attendent dans le véhicule, salle d’attente, ou autre lieu et vous ramène à destination une fois votre rendez-vous terminé.</p>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-md-1 text-center mb-3">
            <i class="fa fa-shopping-basket fa-3x" aria-hidden="true"></i>
          </div>
          <div class="col-md-11">
            <p>De plus, cette année nous avons mis en place un service nommé “<strong>Commission</strong>” :</p>
            <p>Un de nos chauffeurs viens vous cherchez au domicile et vous accompagnes pour vos achats (magasin alimentaire, marché local, magasin de meuble, ...).</p>
            <p>Nous ne restons pas uniquement dans le véhicule a attendre, nous venons avec vous afin de vous aider à porter vos achats et les places dans nos véhicules qui sont aisément adaptés pour placer toutes dimensions d’achat effectuer. Pour finir nous vous raccompagnons à domicile et vous aidons a déposer les commissions effectuées chez vous.</p>

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
