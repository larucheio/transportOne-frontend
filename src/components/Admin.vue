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
          <custom-input ref="editPricePrice" label="Prix (CHF)" type="number" v-model="price" placeholder="10.5" min="1"></custom-input>
        </div>
      </div>
      <button class="btn btn-primary float-xs-right" @click="setPrice">Sauvegarder</button>
    </div>
    <div id="success-alert-price" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-price" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
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
            <custom-input ref="setRegionName" label="Nom" type="text" v-model="regionToSet.name" placeholder="Genève" min="1"></custom-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <custom-input ref="setRegionPriority" label="Priorité" type="number" v-model="regionToSet.priority" placeholder="0" min="1"></custom-input>
          </div>
        </div>
      </div>
      <button class="btn btn-primary float-xs-right" @click="setRegion">Sauvegarder</button>
    </div>
    <div id="success-alert-setRegion" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-setRegion" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
    <div class="card card-block">
      <h6 class="card-title">Ajouter une region</h6>
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
      <button class="btn btn-primary float-xs-right" @click="addRegion">Sauvegarder</button>
    </div>
    <div id="success-alert-addRegion" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-addRegion" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
    <div class="card card-block">
      <h6 class="card-title">Newsletter</h6>
      <div class="form-group">
        <custom-input ref="newsletterSubject" label="Sujet" type="text" v-model="newsletter.subject" placeholder="Promotion" min="1"></custom-input>
      </div>
      <div class="form-group">
        <custom-input ref="newsletterMessage" label="Message" type="text" v-model="newsletter.body" placeholder="Bonjour..." min="1" max="2000" rows="10"></custom-input>
      </div>
      <button class="btn btn-primary float-xs-right" @click="sendNewsletter">Envoyer</button>
    </div>
    <div id="success-alert-newsletter" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Envoyé
    </div>
    <div id="error-alert-newsletter" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import alert from '../alert'
import api from '../../config/api.js'

export default {
  data () {
    return {
      regions: [],
      from: null,
      to: null,
      price: 0,
      regionToSet: {id: '', name: '', priority: 0},
      regionToAdd: {name: '', priority: 0},
      newsletter: {subject: '', body: ''}
    }
  },
  mounted: function () {
    this.getRegions()
    alert.hideAll()
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
    const isPriceValid = this.$refs.setRegionPriority.isValid(this.price)
    if (!isPriceValid) return
      this.$http.post(`${api.pricing}/${this.from.id}@${this.to.id}`, {'CHF': this.price})
      .then((response) => {
        alert.show('#success-alert-price')
      }, (response) => {
        alert.show('#error-alert-price')
      })
    },
    setRegion: function () {
      const isNameValid = this.$refs.setRegionName.isValid(this.regionToSet.name)
      const isPriorityValid = this.$refs.setRegionPriority.isValid(this.regionToSet.priority)
      if (!(isNameValid && isPriorityValid)) return
      this.$http.post(`${api.regions}/${this.regionToSet.id}`, this.regionToSet)
      .then((response) => {
        alert.show('#success-alert-setRegion')
      }, (response) => {
        alert.show('#error-alert-setRegion')
      })
    },
    addRegion: function () {
      const isNameValid = this.$refs.addRegionName.isValid(this.regionToAdd.name)
      const isPriorityValid = this.$refs.addRegionPriority.isValid(this.regionToAdd.priority)
      if (!(isNameValid && isPriorityValid)) return
      const id = this.regionToAdd.name.replace(/[^A-Za-z0-9]+/g, "")
      this.$http.post(`${api.regions}/${id}`, this.regionToAdd)
      .then((response) => {
        this.getRegions()
        alert.show('#success-alert-addRegion')
      }, (response) => {
        alert.show('#error-alert-addRegion')
      })
    },
    sendNewsletter: function () {
      const isSubjectValid = this.$refs.newsletterSubject.isValid(this.newsletter.subject)
      const isMessageValid = this.$refs.newsletterMessage.isValid(this.newsletter.body)
      if (!(isSubjectValid && isMessageValid)) return
      const body = `<p>${this.newsletter.body}</p>
      <a href="${process.env.SITE_URL}unsubscribe">Se désinscrire</a>`
      this.$http.post(`${api.broadcast}`, {'data': body, 'subject': this.newsletter.subject, 'source': process.env.PUBLIC_EMAIL})
      .then((response) => {
        alert.show('#success-alert-newsletter')
      }, (response) => {
        alert.show('#error-alert-newsletter')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (auth.isAdmin()) next()
    else next('/')
  },
}
</script>
