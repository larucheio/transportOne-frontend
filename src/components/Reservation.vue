<template>
  <div>
    <div class="row">
      <div class="col-lg-9">
        <pricing v-on:setPrice="getDevisData"></pricing>
      </div>
      <div class="col-lg-3">
        <div class="card card-block">
          <h3 class="card-title">Prix: {{price}}</h3>
          <b class="card-text">Aller</b>
          <p class="card-text">{{priceDetailsTravel1}}</p>
          <b class="card-text">Retour</b>
          <p class="card-text">{{priceDetailsTravel2}}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input type="text" class="form-control" id="firstName" placeholder="John" v-model.lazy="user.firstName">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input type="text" class="form-control" id="lastName" placeholder="Doe" v-model.lazy="user.lastName">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="phone">Téléphone</label>
              <input type="tel" class="form-control" id="phone" placeholder="022 123 45 67" v-model.lazy="user.tel">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="nom@domain.ch" v-model.lazy="user.email">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="from1">Adresse de départ</label>
              <input type="text" class="form-control" id="from1" placeholder="1 chemin de départ 1204 Genève" v-model.lazy="travel1.from">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="to1">Adresse d'arrivé</label>
              <input type="text" class="form-control" id="to1" placeholder="1 chemin d'arrivé 1204 Genève" v-model.lazy="travel1.to">
            </div>
          </div>
        </div>
        <div class="row" v-if="travel2.exist">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="from1">Adresse de départ pour le retour</label>
              <input type="text" class="form-control" id="from2" placeholder="1 chemin de départ 1204 Genève" v-model.lazy="travel2.from">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="to1">Adresse d'arrivé pour le retour</label>
              <input type="text" class="form-control" id="to2" placeholder="1 chemin d'arrivé 1204 Genève" v-model.lazy="travel2.to">
            </div>
          </div>
        </div>
        <div>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" aria-describedby="attenteHelp" v-model.lazy="options.waiting">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Attente</span>
            <small id="attenteHelp" class="form-text text-muted">Le chauffeur vous attend dans la voiture. Prix: 10fr/30min</small>
          </label>
        </div>
        <div>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" aria-describedby="comissionHelp"  v-model.lazy="options.comission">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Comission</span>
            <small id="comissionHelp" class="form-text text-muted">Le chauffeur vous accompagne pour faire vos courses. Prix: 15fr/30min</small>
          </label>
        </div>
        <div>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" aria-describedby="peopleHelp" v-model.lazy="options.groupe">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Plus de 4 personnes</span>
            <small id="peopleHelp" class="form-text text-muted">Prix: 10fr</small>
          </label>
        </div>
        <div class="form-group">
          <label for="comment">Commentaire</label>
          <textarea class="form-control" v-model="comment" id="comment"></textarea>
        </div>
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" aria-describedby="attenteHelp" v-model.lazy="isSubscribing">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description"><small class="form-text text-muted">Recevoir des offres par email.</small></span>
        </label>
        <button type="submit" class="btn btn-default btn-block" @click="book">Faire une demande de reservation</button>
        <div id="booking-success-alert" class="alert alert-success" role="alert">
          <i class="fa fa-check" aria-hidden="true"></i> Une personne vous contactera pour confirmer la reservation.
        </div>
        <div id="booking-error-alert" class="alert alert-danger" role="alert">
          <i class="fa fa-times" aria-hidden="true"></i> {{error}}
        </div>
        <div id="map" style="margin-top:10px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
import alert from '../alert'
import api from '../../config/api.js'
import auth from '../auth'

let data = {
  user: {firstName: '', lastName: '', tel: '', email: ''},
  price: 'à partir de 25 CHF',
  priceDetailsTravel1: 'Faite une demande de devis pour connaitre le prix exact',
  priceDetailsTravel2: 'Aucun',
  travel1: {from: null, to: null, date: null, time: null},
  travel2: {from: null, to: null, date: null, time: null, exist: false},
  options: {waiting: false, comission: false, groupe: false},
  comment: '',
  directionsService: null,
  directionsDisplay: null,
  error: '',
  isSubscribing: true
}
export default {
  name: 'home',
  data () {
    return data
  },
  components: { 'pricing': Pricing },
  mounted () {
    this.initMap()
    alert.hideAll()
    if (auth.isAuthenticated()) {
      this.user.firstName = auth.getProfile().given_name
      this.user.lastName = auth.getProfile().family_name
      this.user.tel = auth.getProfile().user_metadata.tel
      this.user.email = auth.getProfile().user_metadata.email
      this.travel1.from = auth.getProfile().user_metadata.from
      this.travel1.to = auth.getProfile().user_metadata.to
    }
  },
  methods: {
    initMap () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.2, lng: 6.1667},
        zoom: 11,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true
      })
      map.addListener('drag', function (e) {})
      map.addListener('dragend', function (e) {})
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(map)
    },
    calcRoute () {
      const request = {
        origin: 'AEROPORT DE GENEVE',
        destination: 'carouge',
        travelMode: 'DRIVING'
      }
      const self = this
      this.directionsService.route(request, function (result, status) {
        if (status == 'OK') {
          self.directionsDisplay.setDirections(result)
        }
      })
    },
    getDevisData (price, travel1, travel2) {
      this.price = isNaN(price) ? 'à partir de 25 CHF' : `${price} CHF`
      this.travel1.date = travel1.date
      this.travel1.time = travel1.time
      this.travel2.exist = travel2.exist
      this.travel2.date = travel2.date
      this.travel2.time = travel2.time
      this.priceDetailsTravel1 = `De ${travel1.from.name} à ${travel1.to.name}, le ${travel1.date} à ${this.travel1.time}.`
      if (travel2.exist) this.priceDetailsTravel2 = `De ${travel2.from.name} à ${travel2.to.name}, le ${this.travel2.date} à ${this.travel2.time}.`
      else this.priceDetailsTravel2 = 'Aucun'
      alert.hideAll()
    },
    book () {
      if (this.user.firstName === '' || this.user.lastName === '' || this.user.tel === '' || this.user.email === ''
      || this.travel1.from === '' || this.travel1.to === '' || this.travel1.date === null || this.travel1.time === null) {
        this.error = 'Veuillez remplir le formulaire avant de reserver.'
        alert.show('#booking-error-alert')
        return
      }
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
        this.subscribe()
      } else {
        this.error = `L'address email est invalide.`
        alert.show('#booking-error-alert')
        return
      }
      let roundTrip = 'aucun'
      if (this.travel2.exist) {
        roundTrip = `de ${this.travel2.from} à ${this.travel2.to}, le ${this.travel2.date} à ${this.travel2.time}`
      }
      let waiting = ''
      if (this.options.waiting) {
        waiting = `attente, `
      }
      let comission = ''
      if (this.options.comission) {
        comission = `comission, `
      }
      let groupe = ''
      if (this.options.groupe) {
        groupe = `plus de 4 personnes`
      }
      const text = `Nom: ${this.user.firstName} ${this.user.lastName}
Tel: ${this.user.tel} Email: ${this.user.email}
Aller: de ${this.travel1.from} à ${this.travel1.to}, le ${this.travel1.date} à ${this.travel1.time}
Retour: ${roundTrip}
Options: ${waiting}${comission}${groupe}
Prix du/des trajets: ${this.price}CHF
Détails aller: ${this.priceDetailsTravel1}
Détails retour: ${this.priceDetailsTravel2}
Commentaire: ${this.comment}`
      const self = this
      this.$http.post(`${api.contact}`, {'data': text, 'subject': 'Reservation', 'source': this.user.email})
      .then((response) => {
        self.calcRoute()
        alert.show('#booking-success-alert')
      }, (response) => {
        this.error = 'erreur'
        alert.show('#booking-error-alert')
      })
      auth.setProfileAttribute({tel: this.user.tel, email: this.user.email, from: this.travel1.from, to: this.travel1.to})
    },
    subscribe () {
      if (this.isSubscribing) {
        this.$http.post(`${api.subscriptions}/${this.user.email}`)
        .then((response) => {}, (response) => {})
      }
    }
  }
}
</script>

<style scoped>
#map {
  height: 500px;
}
</style>
