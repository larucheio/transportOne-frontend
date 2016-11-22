<template>
  <div>
    <div class="card card-block">
      <h6 class="card-title">Modifier un prix</h6>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Départ</label>
            <select class="custom-select btn-block" v-model.lazy="from">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Arrivée</label>
            <select class="custom-select btn-block" v-model.lazy="to">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Prix (CHF)</label>
            <input type="number" class="form-control"  placeholder="1.5" v-model.lazy="price">
          </div>
        </div>
      </div>
      <button class="btn btn-primary float-xs-right" @click="setPrice">Sauvegarder</button>
    </div>
    <div class="card card-block">
      <h6 class="card-title">Modifier une region</h6>
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
            <label>Nom</label>
            <input type="text" class="form-control" v-model.lazy="regionToSet.name">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Priorité</label>
            <input type="number" class="form-control" v-model.lazy="regionToSet.priority">
          </div>
        </div>
      </div>
      <button class="btn btn-primary float-xs-right" @click="setRegion">Sauvegarder</button>
    </div>
    <div class="card card-block">
      <h6 class="card-title">Ajouter une region</h6>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label>Nom</label>
            <input type="text" class="form-control" v-model.lazy="regionToAdd.name">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Priorité</label>
            <input type="number" class="form-control" v-model.lazy="regionToAdd.priority">
          </div>
        </div>
      </div>
      <button class="btn btn-primary float-xs-right" @click="addRegion">Sauvegarder</button>
    </div>
    <div class="card card-block">
      <h6 class="card-title">Newsletter</h6>
      <div class="form-group">
        <label>Sujet</label>
        <input type="text" class="form-control" v-model.lazy="newsletter.subject">
      </div>
      <div class="form-group">
        <label for="text">Message</label>
        <textarea class="form-control" rows="10" v-model="newsletter.body"></textarea>
      </div>
      <button class="btn btn-primary float-xs-right" @click="sendNewsletter">Envoyer</button>
    </div>
    <alert ref="alert">{{alertMessage}}</alert>
  </div>
</template>

<script>
import auth from '../auth'
import Alert from './Alert.vue'
import api from '../../config/api.js'

export default {
  components:{
    'alert': Alert
  },
  data () {
    return {
      regions: [],
      from: null,
      to: null,
      price: 0,
      regionToSet: {id: '', name: '', priority: 0},
      regionToAdd: {name: '', priority: 0},
      newsletter: {subject: null, body: null},
      alertMessage: ''
    }
  },
  mounted: function () {
    this.getRegions()
  },
  methods: {
    getRegions: function () {
      this.$http.get(`${api.regions}`)
      .then((response) => {
        this.regions = response.body.data.Items.sort(function compare (a, b) {
          if (a.priority + a.name < b.priority + b.name) return -1
          return 1
        })
        this.from = this.regions[0]
        this.to = this.regions[0]
        this.regionToSet = this.regions[0]
      }, (response) => {})
    },
    setPrice: function () {
      this.$http.post(`${api.pricing}/${this.from.id}@${this.to.id}`, {'CHF': this.price})
      .then((response) => {
        this.alertMessage = 'Sauvé'
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = 'Erreur'
        this.$refs.alert.showError()
      })
    },
    setRegion: function () {
      this.$http.post(`${api.regions}/${this.regionToSet.id}`, this.regionToSet)
      .then((response) => {
        this.alertMessage = 'Sauvé'
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = 'Erreur'
        this.$refs.alert.showError()
      })
    },
    addRegion: function () {
      const id = this.regionToAdd.name.replace(/[^A-Za-z0-9]+/g, "")
      this.$http.post(`${api.regions}/${id}`, this.regionToAdd)
      .then((response) => {
        this.getRegions()
        this.alertMessage = 'Sauvé'
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = 'Erreur'
        this.$refs.alert.showError()
      })
    },
    sendNewsletter: function () {
      const body = `<p>${this.newsletter.body}</p>
      <a href="${process.env.SITE_URL}unsubscribe">Se désinscrire</a>`
      this.$http.post(`${api.broadcast}`, {'data': body, 'subject': this.newsletter.subject, 'source': process.env.PUBLIC_EMAIL})
      .then((response) => {
        this.alertMessage = 'Envoyé'
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = 'Erreur'
        this.$refs.alert.showError()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (auth.isAdmin()) next()
    else next('/')
  },
}
</script>
