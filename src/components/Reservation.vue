<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg-reservation bg-cover">
      <div class="container">
        <pricing ref="pricing" @changeTravelType="changeTravelType" @updatePrice="getDevisData" :isBooking="true"></pricing>
      </div>
    </div>
    <div class="container">
      <div class="section pt-3">
        <form>
          <div class="row">
            <div class="col-sm-6">
              <custom-input ref="firstName" label="Prénom" type="text" v-model="user.firstName" placeholder="John" min="1"></custom-input>
            </div>
            <div class="col-sm-6">
              <custom-input ref="lastName" label="Nom" type="text" v-model="user.lastName" placeholder="Doe" min="1"></custom-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <custom-input ref="tel" label="Téléphone" type="tel" v-model="user.tel" placeholder="022 123 45 67" regexp="^[+]?[0-9]{9,12}$" min="1" errorMessage="Le numéro n'est pas valide."></custom-input>
            </div>
            <div class="col-sm-6">
              <custom-input ref="email" label="Email" type="text" v-model="user.email" placeholder="nom@domain.ch" regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" errorMessage="L'email n'est pas valide."></custom-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <custom-input ref="from1" label="Adresse de départ" type="text" v-model="travel1.from" placeholder="1 chemin de départ 1204 Genève" min="1"></custom-input>
            </div>
            <div class="col-sm-6">
              <custom-input ref="to1" label="Adresse d'arrivé" type="text" v-model="travel1.to" placeholder="1 chemin d'arrivé 1204 Genève" min="1"></custom-input>
            </div>
          </div>
          <div class="row" v-if="travel2.exist">
            <div class="col-sm-6">
              <custom-input ref="from2" label="Adresse de départ retour" type="text" v-model="travel2.from" placeholder="1 chemin de départ 1204 Genève" min="1"></custom-input>
            </div>
            <div class="col-sm-6">
              <custom-input ref="to2" label="Adresse d'arrivé retour" type="text" v-model="travel2.to" placeholder="1 chemin d'arrivé 1204 Genève" min="1"></custom-input>
            </div>
          </div>
          <div>
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" aria-describedby="attenteHelp" v-model.lazy="options.waiting" @click="options.comission = false; options.waiting = true">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><i class="fa fa-pause-circle-o mx-1" aria-hidden="true"></i> Attente</span>
              <small id="attenteHelp" class="form-text text-muted ml-2">CHF 10.-/30min</small>
            </label>
            <i class="fa fa-info-circle text-primary pointer mr-5" aria-hidden="true" data-toggle="modal" data-target="#attenteInfo"></i>
            <div class="modal fade" id="attenteInfo" tabindex="-1" role="dialog" aria-labelledby="attenteInfoTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="attenteInfoTitle">Attente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Avec notre service attente, vous n’avez plus de soucis à vous faire. Nos chauffeurs vous attendent dans le véhicule, salle d’attente, ou autre lieu et vous ramènent à destination une fois votre rendez-vous terminé.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" aria-describedby="comissionHelp"  v-model.lazy="options.comission" @click="options.waiting = false; options.comission = true">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><i class="fa fa-shopping-basket mx-1" aria-hidden="true"></i>Commission</span>
              <small id="comissionHelp" class="form-text text-muted mx-2">CHF 15.-/30min</small>
            </label>
            <i class="fa fa-info-circle text-primary pointer" aria-hidden="true" data-toggle="modal" data-target="#comissionInfo"></i>
            <div class="modal fade" id="comissionInfo" tabindex="-1" role="dialog" aria-labelledby="comissionInfoTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="comissionInfoTitle">Commission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Un de nos chauffeurs vient vous chercher au domicile et vous accompagne pour vos achats (magasin alimentaire, marché local, magasin de meuble...).</p>
                    <p>Nous ne restons pas uniquement dans le véhicule a attendre, nous venons avec vous afin de vous aider à porter vos achats et les places dans nos véhicules qui sont aisément adaptés pour placer toutes dimensions d’achat effectuer. Pour finir nous vous raccompagnons à domicile et vous aidons a déposer les commissions effectuées chez vous.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" aria-describedby="peopleHelp" v-model.lazy="options.groupe">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><i class="fa fa-users mx-1" aria-hidden="true"></i>Plus de 8 personnes</span>
              <small id="peopleHelp" class="form-text text-muted mx-2">Véhicule supplémentaire</small>
            </label>
          </div>
          <div class="form-group">
            <custom-input ref="comment" label="Commentaire" type="text" v-model="comment" :placeholder="commentText" max="2000" rows="8"></custom-input>
          </div>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" aria-describedby="attenteHelp" v-model.lazy="isSubscribing">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description"><small class="form-text text-muted">Recevoir des offres par email.</small></span>
          </label>
          <div class="pricetag card card-block shadow mb-3">
            <h4>Détails</h4>
            <p>Trajet(s): {{displayedPrice}} CHF</p>
            <p>{{displayedGroupePrice}}</p>
            <strong>Prix total: {{totalPrice}} CHF (TTC)</strong>
            <small class="form-text text-muted" v-show="options.waiting || options.comission">Le prix n'inclut pas le prix de l'attente ou commission. Il sera ajouté en fonction de la durée réalisée de l'option choisit.</small>
          </div>
          <custom-button ref="bookButton" @click="book" text="Réserver" pendingText="Réserve" successText="Réservé"></custom-button>
        </form>
      </div>
      <div id="map" class="section"></div>
    </div>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
import api from '../../config/api.js'
import auth from '../auth'

let data = {
  user: {firstName: '', lastName: '', tel: '', email: ''},
  price: 0,
  priceDetailsTravel1: 'Faites une demande de devis pour connaitre le prix exact',
  priceDetailsTravel2: 'Aucun',
  travel1: {from: '', to: '', date: null, time: null},
  travel2: {from: '', to: '', date: null, time: null, exist: false},
  options: {waiting: false, comission: false, groupe: false},
  comment: '',
  directionsService: null,
  directionsDisplay: null,
  isSubscribing: true,
  commentText: `Bonjour,

Merci de nous faire part d'éventuelles informations supplémentaires, entre autres si la personne est en fauteuil roulant ou par exemple si nous devons monter chercher la personne à son domicile.

D’autres détails tels que « Code d’entrée » ou « appeler le client une fois que nous sommes là » peuvent être aussi annotés.`
}
export default {
  name: 'home',
  data () {
    return data
  },
  head: {
    title: {
      inner: 'Réservation - Transport One'
    },
    meta: [
      { name: 'description', content: 'Réserverz votre trajet dès aujourd\'hui sur notre site internet.', id: 'description' }
    ]
  },
  components: { 'pricing': Pricing },
  mounted () {
    this.initMap()
    if (auth.isAuthenticated()) {
      this.user.firstName = auth.getProfile().given_name
      this.user.lastName = auth.getProfile().family_name
      if (typeof auth.getProfile().user_metadata !== 'undefined') {
        this.user.tel = auth.getProfile().user_metadata.tel
        this.user.email = auth.getProfile().user_metadata.email
        this.travel1.from = auth.getProfile().user_metadata.from
        this.travel1.to = auth.getProfile().user_metadata.to
      }
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
        origin: this.travel1.from,
        destination: this.travel1.to,
        travelMode: 'DRIVING'
      }
      const self = this
      this.directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          self.directionsDisplay.setDirections(result)
        }
      })
    },
    changeTravelType (isRoundTrip) {
      this.travel2.exist = isRoundTrip
    },
    getDevisData () {
      this.price = this.$refs.pricing.price
      this.travel1.date = this.$refs.pricing.travel1.date
      this.travel1.time = this.$refs.pricing.travel1.time
      this.travel2.date = this.$refs.pricing.travel2.date
      this.travel2.time = this.$refs.pricing.travel2.time
      this.travel2.exist = this.$refs.pricing.travel2.exist
      if (this.$refs.pricing.regions.length > 0) {
        this.priceDetailsTravel1 = `De ${this.$refs.pricing.travel1.from.name} à ${this.$refs.pricing.travel1.to.name}, le ${this.travel1.date} à ${this.travel1.time}.`
        if (this.travel2.exist) this.priceDetailsTravel2 = `De ${this.$refs.pricing.travel2.from.name} à ${this.$refs.pricing.travel2.to.name}, le ${this.travel2.date} à ${this.travel2.time}.`
        else this.priceDetailsTravel2 = 'Aucun'
      }
    },
    book () {
      this.getDevisData()
      const isFirstNameValid = this.$refs.firstName.isValid(this.user.firstName)
      const isLastNameValid = this.$refs.lastName.isValid(this.user.lastName)
      const isTelValid = this.$refs.tel.isValid(this.user.tel)
      const isEmailValid = this.$refs.email.isValid(this.user.email)
      const isCommentValid = this.$refs.comment.isValid(this.comment)
      const isFrom1Valid = this.$refs.from1.isValid(this.travel1.from)
      const isTo1Valid = this.$refs.to1.isValid(this.travel1.to)
      const isFrom2Valid = true
      const isTo2Valid = true
      if (this.travel2.exist) {
        const isFrom2Valid = this.$refs.from2.isValid(this.travel2.from)
        const isTo2Valid = this.$refs.to2.isValid(this.travel2.to)
      }
      if (!(isFirstNameValid && isLastNameValid && isTelValid && isEmailValid && isCommentValid && isFrom1Valid && isTo1Valid && isFrom2Valid && isTo2Valid)) {
        this.$refs.bookButton.showError('Veuillez remplir tous les champs.')
        return
      }
      if (this.travel1.date === null || this.travel1.time === null) {
        this.$refs.bookButton.showError('Veuillez entrer une heure et une date.')
        return
      }
      if (this.user.email.length > 0) this.subscribe()

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
        groupe = `plus de 3 personnes`
      }
      const text = `Nom: ${this.user.firstName} ${this.user.lastName}
Tel: ${this.user.tel} Email: ${this.user.email}
Aller: de ${this.travel1.from} à ${this.travel1.to}, le ${this.travel1.date} à ${this.travel1.time}
Retour: ${roundTrip}
Options: ${waiting}${comission}${groupe}
Prix du/des trajets: ${this.price} CHF
Détails aller: ${this.priceDetailsTravel1}
Détails retour: ${this.priceDetailsTravel2}
Commentaire: ${this.comment}`
      const self = this
      this.$http.post(`${api.contact}`, {'data': text, 'subject': 'Reservation', 'source': this.user.email})
      .then((response) => {
        this.saveReservation()
        this.$refs.bookButton.showSuccess()
        self.calcRoute()
      }, (response) => {
        this.$refs.bookButton.showError('Erreur')
      })
      auth.setProfileAttribute({tel: this.user.tel, email: this.user.email, from: this.travel1.from, to: this.travel1.to})
    },
    subscribe () {
      if (this.isSubscribing) {
        this.$http.post(`${api.subscriptions}/${this.user.email}`)
        .then((response) => {}, (response) => {})
      }
    },
    saveReservation () {
      let reservation = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        tel: this.user.tel,
        price: this.price,
        from1: this.travel1.from,
        to1: this.travel1.to,
        date1: this.travel1.to,
        time1: this.travel1.to,
        waiting: this.options.waiting,
        comission: this.options.comission,
        groupe: this.options.groupe
      }
      if (auth.getProfile()) reservation.userId = auth.getProfile().user_id
      if (this.user.email) reservation.email = this.user.email
      if (this.travel2.exist) {
        reservation.from2 = this.travel2.from
        reservation.to2 = this.travel2.to
        reservation.date2 = this.travel2.date
        reservation.time2 = this.travel2.time
      }
      if (this.comment) reservation.comment = this.comment
      this.$http.post(`${api.reservations}`, reservation)
    }
  },
  computed: {
    totalPrice: function () {
      let total = this.price
      if (this.options.groupe) total *= 2
      if (this.price === 0) return `à partir de ${total + 25}`
      return total
    },
    displayedGroupePrice: function () {
      return this.options.groupe ? 'Plus de 8 personnes: prix doublé' : ''
    },
    displayedPrice: function () {
      return this.price !== 0 ? this.price : 'à partir de 25'
    }
  }
}
</script>

<style scoped>
#map {
  height: 500px;
}
</style>
