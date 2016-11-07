<template>
  <div>
    <pricing v-on:setPrice="getDevisData"></pricing>
    <form v-if="showForm">
      <strong>Prix: {{price}}</strong>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input type="text" class="form-control" id="firstName" placeholder="John" v-model.lazy="firstName">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input type="text" class="form-control" id="lastName" placeholder="Doe" v-model.lazy="lastName">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" class="form-control" id="phone" placeholder="022 123 45 67" v-model.lazy="tel">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="nom@domain.ch" v-model.lazy="email">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="from1">Adresse de départ</label>
            <input type="text" class="form-control" id="from1" placeholder="1 chemin de départ 1204 Genève" v-model.lazy="from1">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="to1">Adresse d'arrivé</label>
            <input type="text" class="form-control" id="to1" placeholder="1 chemin d'arrivé 1204 Genève" v-model.lazy="to1">
          </div>
        </div>
      </div>
      <div class="row" v-if="showRoundTrip">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="from1">Adresse de départ pour le retour</label>
            <input type="text" class="form-control" id="from2" placeholder="1 chemin de départ 1204 Genève" v-model.lazy="from2">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="to1">Adresse d'arrivé pour le retour</label>
            <input type="text" class="form-control" id="to2" placeholder="1 chemin d'arrivé 1204 Genève" v-model.lazy="to2">
          </div>
        </div>
      </div>
      <div class="row">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" aria-describedby="attenteHelp" v-model.lazy="waiting">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Attente</span>
          <small id="attenteHelp" class="form-text text-muted">Le chauffeur vous attend dans la voiture. Prix: 10fr/30min</small>
        </label>
      </div>
      <div class="row">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" aria-describedby="comissionHelp"  v-model.lazy="comission">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Comission</span>
          <small id="comissionHelp" class="form-text text-muted">Le chauffeur vous accompagne pour faire vos courses. Prix: 15fr/30min</small>
        </label>
      </div>
      <div class="row">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" aria-describedby="peopleHelp" v-model.lazy="groupe">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Plus de 4 personnes</span>
          <small id="peopleHelp" class="form-text text-muted">Prix: 10fr</small>
        </label>
      </div>
      <button type="submit" class="btn btn-default btn-block" @click="book">Faire une demande de reservation</button>
    </form>
    <div id="success-alert" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Une personne vous contactera pour confirmer la reservation.
    </div>
    <div id="error-alert" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> {{error}}
    </div>
    <div id="map" style="margin-top:10px;"></div>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
let data = {
  firstName: '',
  lastName: '',
  tel: '',
  email: '',
  price: 0,
  from1: '',
  to1: '',
  from2: '',
  to2: '',
  showRoundTrip: false,
  date1: null,
  time1: null,
  date2: null,
  time2: null,
  waiting: false,
  comission: false,
  groupe: false,
  directionsService: null,
  directionsDisplay: null,
  error: '',
  showForm: false
}

export default {
  name: 'home',
  data () {
    return data
  },
  components: { 'pricing': Pricing },
  mounted () {
    this.initMap()
    $('#success-alert').hide()
    $('#error-alert').hide()
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
  getDevisData (price, showRoundTrip, date1, time1, date2, time2) {
    this.price = price
    this.showRoundTrip = showRoundTrip
    this.date1 = date1
    this.time1 = time1
    this.date2 = date2
    this.time2 = time2
    this.showForm = true
    $('#success-alert').hide()
    $('#error-alert').hide()
  },
  book () {
    if (this.firstName === '' || this.lastName === '' || this.from1 === '' || this.to1 === '' || this.date1 === null || this.date2 === null || this.tel === '' || this.email === '') {
      this.error = 'Veuillez remplir le formulaire avant de reserver.'
      $('#error-alert').alert()
      $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
      return
    }
    let roundTrip = 'aucun'
    if (this.showRoundTrip) {
      roundTrip = `de ${this.from2} à ${this.to2}, le ${this.date2} à ${this.time2}`
    }
    let waiting = ''
    if (this.waiting) {
      waiting = `attente, `
    }
    let comission = ''
    if (this.comission) {
      comission = `comission, `
    }
    let groupe = ''
    if (this.groupe) {
      groupe = `plus de 4 personnes`
    }
    const text = `Nom: ${this.firstName} ${this.lastName}
Tel: ${this.tel} Email: ${this.email}
Aller: de ${this.from1} à ${this.to1}, le ${this.date1} à ${this.time1}
Retour: ${roundTrip}
Options: ${waiting}${comission}${groupe}
Prix du/des trajets: ${this.price}CHF`

    const self = this
    this.$http.post(`${process.env.AWS_API_ROOT}contact`, {'data': text, 'subject': 'Reservation', 'source': this.email})
    .then((response) => {
      self.calcRoute()
      $('#success-alert').alert()
      $('#success-alert').fadeTo(2000, 500).slideUp(500, function () {})
    }, (response) => {
      $('#error-alert').alert()
      $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
    })
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 500px;
}
</style>
