<template>
  <div class="container mt-5">
    <div class="section">
      <h6>Modifier un prix</h6>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Départ</label>
            <select class="custom-select btn-block" v-model.lazy="priceToSet.from" @change="getPrice">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Arrivée</label>
            <select class="custom-select btn-block" v-model.lazy="priceToSet.to" @change="getPrice">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <custom-input ref="editPricePrice" label="Prix (CHF)" type="number" v-model="priceToSet.price" placeholder="10.5" min="1"></custom-input>
        </div>
      </div>
      <custom-button ref="editPriceSaveButton" @click="setPrice" text="Sauvegarder" pendingText="Sauvegarde" successText="Sauvegardé"></custom-button>
    </div>
    <div class="section">
      <h6>Modifier une region</h6>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Region</label>
            <select class="custom-select btn-block" v-model.lazy="regionToSet">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <custom-input ref="setRegionName" label="Nom" type="text" v-model="regionToSet.name" placeholder="Genève" min="1"></custom-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <custom-input ref="setRegionPriority" label="Priorité" type="number" v-model="regionToSet.priority" placeholder="0" min="1"></custom-input>
          </div>
        </div>
      </div>
      <custom-button ref="editRegionSaveButton" @click="setRegion" text="Sauvegarder" pendingText="Sauvegarde" successText="Sauvegardé"></custom-button>
    </div>
    <div class="section">
      <h6>Ajouter une region</h6>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <custom-input ref="addRegionName" label="Nom" type="text" v-model="regionToAdd.name" placeholder="Genève" min="1"></custom-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <custom-input ref="addRegionPriority" label="Priorité" type="number" v-model="regionToAdd.priority" placeholder="0" min="1"></custom-input>
          </div>
        </div>
      </div>
      <custom-button ref="addRegionSaveButton" @click="addRegion" text="Sauvegarder" pendingText="Sauvegarde" successText="Sauvegardé"></custom-button>
    </div>
    <div class="section">
      <h6>Newsletter</h6>
      <div class="form-group">
        <custom-input ref="newsletterSubject" label="Sujet" type="text" v-model="newsletter.subject" placeholder="Promotion" min="1"></custom-input>
      </div>
      <div class="form-group">
        <custom-input ref="newsletterMessage" label="Message" type="text" v-model="newsletter.body" placeholder="Bonjour..." min="1" max="2000" rows="10"></custom-input>
      </div>
      <custom-button ref="newsletterSendButton" @click="sendNewsletter" text="Envoyer" pendingText="Envoie" successText="Envoyé"></custom-button>
    </div>
    <div class="section">
      <h6>Reservations</h6>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Période</label>
            <select class="custom-select btn-block" v-model.lazy="reservations.period">
              <option v-for="period in reservations.periods" v-bind:value="period">{{period}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <custom-input ref="reservations" label="Filtre" type="text" v-model="reservations.filter" placeholder="Jean"></custom-input>
          </div>
        </div>
      </div>
      <custom-button ref="listReservations" @click="listReservations" text="Rechercher" pendingText="Recherche" successText="Trouvé"></custom-button>
      <div class="reservations">
        <reservation v-for="reservation in reservations.reservations" v-bind:reservation="reservation"></reservation>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import api from '../../config/api.js'

const Reservation = {
  template: `
    <div class="card card-block shadow">
      <p>{{formatedDate}}</p>
      <div class="row">
        <div class="col-md-3">
          <p>{{reservation.firstName}} {{reservation.lastName}}</p>
        </div>
        <div class="col-md-3">
          <p>Tél: {{reservation.tel}}</p>
        </div>
        <div class="col-md-3">
          <p>Email: {{reservation.email}}</p>
        </div>
        <div class="col-md-3">
        <p>Prix: {{reservation.price}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p>Aller: de {{reservation.from1}} à {{reservation.to1}}</p>
        </div>
        <div class="col-md-6">
          <p>Retour: {{reservation.from2 ? roundTrip: 'aucun'}}</p>
        </div>
      </div>
      <p>Options: {{reservation.waiting ? 'attente' : ''}} {{reservation.comission ? 'comission' : ''}} {{reservation.group ? 'groupe' : ''}}</p>
    </div>`,
  props: ['reservation'],
  computed: {
    formatedDate: function () {
      let date = new Date(this.reservation.createdAt)
      return date.toLocaleDateString()
    },
    roundTrip: function () {
      return `de ${reservation.from1} à ${reservation.to1}`
    }
  }
}

export default {
  data () {
    return {
      regions: [],
      priceToSet: {from: null, to: null, price: 0},
      regionToSet: {id: '', name: '', priority: 0},
      regionToAdd: {name: '', priority: 0},
      newsletter: {subject: '', body: ''},
      reservations: {periods: [], period: null, filter: null, reservations: []}
    }
  },
  mounted: function () {
    this.getRegions()
    for (let i = new Date().getFullYear(); i > 2015; i--) this.reservations.periods.push(i)
    this.reservations.period = this.reservations.periods[0]
  },
  methods: {
    getRegions: function () {
      this.$http.get(`${api.regions}`)
      .then((response) => {
        this.regions = response.body.data.Items.sort(function compare (a, b) {
          if (a.priority + a.name < b.priority + b.name) return -1
          return 1
        })
        this.priceToSet.from = this.regions[0]
        this.priceToSet.to = this.regions[0]
        this.regionToSet = this.regions[0]
        this.getPrice()
      }, (response) => {})
    },
    getPrice: function () {
      this.$http.get(`${api.pricing}/${this.priceToSet.from.id}@${this.priceToSet.to.id}`)
      .then((response) => {
        this.priceToSet.price = response.body.CHF
      }, (response) => {
        this.priceToSet.price = 0
      })
    },
    setPrice: function () {
      const isPriceValid = this.$refs.setRegionPriority.isValid(this.priceToSet.price)
      if (!isPriceValid) {
        this.$refs.editPriceSaveButton.showError('Veuillez remplir tous les champs.')
        return
      }
      this.$http.post(`${api.pricing}/${this.priceToSet.from.id}@${this.priceToSet.to.id}`,
        {'CHF': this.priceToSet.price},
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
      .then((response) => {
        this.$refs.editPriceSaveButton.showSuccess()
      }, (response) => {
        this.$refs.editPriceSaveButton.showError()
      })
    },
    setRegion: function () {
      const isNameValid = this.$refs.setRegionName.isValid(this.regionToSet.name)
      const isPriorityValid = this.$refs.setRegionPriority.isValid(this.regionToSet.priority)
      if (!(isNameValid && isPriorityValid)) {
        this.$refs.editRegionSaveButton.showError('Veuillez remplir tous les champs.')
        return
      }
      this.$http.post(`${api.regions}/${this.regionToSet.id}`,
        this.regionToSet,
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
      .then((response) => {
        this.$refs.editRegionSaveButton.showSuccess()
      }, (response) => {
        this.$refs.editRegionSaveButton.showError()
      })
    },
    addRegion: function () {
      const isNameValid = this.$refs.addRegionName.isValid(this.regionToAdd.name)
      const isPriorityValid = this.$refs.addRegionPriority.isValid(this.regionToAdd.priority)
      if (!(isNameValid && isPriorityValid)) {
        this.$refs.addRegionSaveButton.showError('Veuillez remplir tous les champs.')
        return
      }
      const id = this.regionToAdd.name.replace(/[^A-Za-z0-9]+/g, "")
      this.$http.post(`${api.regions}/${id}`,
        this.regionToAdd,
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
      .then((response) => {
        this.$refs.addRegionSaveButton.showSuccess()
        this.getRegions()
      }, (response) => {
        this.$refs.addRegionSaveButton.showError()
      })
    },
    sendNewsletter: function () {
      const isSubjectValid = this.$refs.newsletterSubject.isValid(this.newsletter.subject)
      const isMessageValid = this.$refs.newsletterMessage.isValid(this.newsletter.body)
      if (!(isSubjectValid && isMessageValid)) {
        this.$refs.newsletterSendButton.showError('Veuillez remplir tous les champs.')
        return
      }
      const body = `<p>${this.newsletter.body}</p>
      <a href="${process.env.SITE_URL}unsubscribe">Se désinscrire</a>`
      this.$http.post(`${api.broadcast}`,
        {'data': body, 'subject': this.newsletter.subject, 'source': process.env.PUBLIC_EMAIL},
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
      .then((response) => {
        this.$refs.newsletterSendButton.showSuccess()
      }, (response) => {
        this.$refs.newsletterSendButton.showError()
      })
    },
    listReservations: function () {
      const filter = this.reservations.filter ? `?filter=${this.reservations.filter}` : ''
      this.$http.get(`${api.reservations}/${this.reservations.period}${filter}`)
      .then((response) => {
        this.$refs.listReservations.showSuccess()
        this.reservations.reservations = response.body.data.Items
      }, (response) => {
        this.$refs.listReservations.showError()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (auth.isAdmin()) next()
    else next('/')
  },
  components: {
    'reservation': Reservation
  },
}
</script>

<style scoped>
.reservations {
  margin-top: 50px;
}
</style>
