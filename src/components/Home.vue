<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg-intro bg-cover-xl">
      <div class="container text-center">
        <pricing class="py-5"></pricing>
        <h3 class="text-white pt-5 text-uppercase"><strong>Transport accompagné de qualité avec chauffeur privé</strong></h3>
        <h3 class="text-white pt-3 text-uppercase"><strong>Prix le plus bas garantie sur Genève dès 25CHF</strong></h3>
        <h3 class="text-white pt-3 text-uppercase"><strong>Ponctuelle, serviable, disponible et sécurisé</strong></h3>
      </div>
    </div>
    <div class="container">
      <div class="py-5">
        <div class="row text-center">
          <div class="col-md-3">
            <i class="fa fa-usd fa-5x" aria-hidden="true"></i>
            <h5 class="font-weight-bold m-3">Garantie meilleurs prix</h5>
            <p>Faites des économies avec nos prix les plus bas de Genève. Nos tarifs sont fixes et garanties lors de la réservation.</p>
          </div>
          <div class="col-md-3">
            <i class="fa fa-hand-paper-o fa-5x" aria-hidden="true"></i>
            <h5 class="font-weight-bold m-3">Annulation gratuite</h5>
            <p>Un changement de programme? aucun souci. Vous disposez d&#39;une annulation gratuite avec un préavis de 24 heure. (par téléphone ou par email).</p>
          </div>
          <div class="col-md-3">
            <i class="fa fa-clock-o fa-5x" aria-hidden="true"></i>
            <h5 class="font-weight-bold m-3">Service dans les temps</h5>
            <p>Grace à notre connaissance minutieuse de Genève et ses environs, nous garantissons un service ponctuelle et dans les temps.</p>
          </div>
          <div class="col-md-3">
            <i class="fa fa-id-card-o fa-5x" aria-hidden="true"></i>
            <h5 class="font-weight-bold m-3">Chauffeurs professionels</h5>
            <p>Laissez-vous transporter sereinement! L&#39;ensemble des chauffeurs Transport One est assuré et agréé. Nous garantissons un service soigné et de qualité.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid bg-geneva bg-cover-xl text-center text-white">
      <div class="container">
        <h3 class="py-5">Fondé en 1998, Transport One est une entreprise familial spécialisée dans le transport accompagné avec chauffeur privé.</h3>
      </div>
    </div>
    <div class="container">
      <div class="py-5">
        <h1 class="pb-3">Nos services</h1>
        <p>Transport One permet à tout le monde d’être transporté et accompagné durant leurs déplacements, tout en faisant des économies!
          Laissez-vous donc transporter sereinement dans notre rayonnante ville de Genève et ses environs.
        </p>
        <p>Notre engagement professionnel garantit un service ponctuel et de qualité ainsi qu’un accompagnement soigné et sécurisé.</p>
        <div class="row">
          <div class="col-md-6">
            <p>Que ce soit pour:</p>
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-map-marker"></i>Rendez-vous médicaux</li>
              <li><i class="fa-li fa fa-map-marker"></i>Centre de bien-être</li>
              <li><i class="fa-li fa fa-map-marker"></i>École</li>
              <li><i class="fa-li fa fa-map-marker"></i>Rendez-vous privé</li>
              <li><i class="fa-li fa fa-map-marker"></i>Toute autre destination</li>
            </ul>
          </div>
          <div class="col-md-6">
            <p>Et que vous soyez:</p>
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-users"></i>Personnes âgées</li>
              <li><i class="fa-li fa fa-users"></i>Adultes</li>
              <li><i class="fa-li fa fa-users"></i>Enfants</li>
              <li><i class="fa-li fa fa-users"></i>Groupe d’amis, familles, employé d’entreprise...</li>
              <li><i class="fa-li fa fa-users"></i>Avec ou sans mobilité réduite (personne en fauteuil roulant non inclus excepté si elle est dans la capacité d’être installé sur l’un de nos siege)</li>
            </ul>
          </div>
        </div>
        <p>Nous avons mis en place un service “Commision” qui comprend un aller-retour à domicile tout en accompagnant la personne pour les commissions, la Poste ou autre demande requérant une aide.</p>
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
