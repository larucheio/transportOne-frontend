<template>
  <div class="hello">
    <strong>Modifier un prix</strong>
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">De</span>
          <select class="custom-select btn-block" v-model.lazy="from">
            <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">à</span>
          <select class="custom-select btn-block" v-model.lazy="to">
            <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-3" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">CHF</span>
          <input type="number" class="form-control"  placeholder="1.5" v-model.lazy="price">
        </div>
      </div>
      <div class="col-md-1" style="margin-top:10px;">
        <button type="submit" class="btn btn-default" @click="setPrice"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
      </div>
    </div>
    <div id="success-alert-price" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-price" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
    <strong>Modifier une region</strong>
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">Region</span>
          <select class="custom-select btn-block" v-model.lazy="regionToSet">
            <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">Nom</span>
          <input type="text" class="form-control" v-model.lazy="regionToSet.name">
        </div>
      </div>
      <div class="col-md-3" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">Priorité</span>
          <input type="number" class="form-control" v-model.lazy="regionToSet.priority">
        </div>
      </div>
      <div class="col-md-1" style="margin-top:10px;">
        <button type="submit" class="btn btn-default" @click="setRegion"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
      </div>
    </div>
    <div id="success-alert-setRegion" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-setRegion" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
    <strong>Ajouter une region</strong>
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-8" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">Nom</span>
          <input type="text" class="form-control" v-model.lazy="regionToAdd.name">
        </div>
      </div>
      <div class="col-md-3" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">Priorité</span>
          <input type="number" class="form-control" v-model.lazy="regionToAdd.priority">
        </div>
      </div>
      <div class="col-md-1" style="margin-top:10px;">
        <button type="submit" class="btn btn-default" @click="addRegion"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
      </div>
    </div>
    <div id="success-alert-addRegion" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert-addRegion" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
    <strong>Newsletter</strong>
    <div class="input-group">
      <span class="input-group-addon">Sujet</span>
      <input type="text" class="form-control" v-model.lazy="newsletter.subject">
    </div>
    <label for="text" style="margin-t:10px;">Text</label>
    <textarea class="form-control" id="text" v-model="newsletter.body" style="margin-bottom:10px;"></textarea>
    <button class="btn btn-primary" @click="sendNewsletter">Envoyer</button>
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

export default {
  data () {
    return {
      regions: [],
      from: null,
      to: null,
      price: 0,
      regionToSet: {id: '', name: '', priority: 0},
      regionToAdd: {name: '', priority: 0},
      newsletter: {subject: null, body: null}
    }
  },
  mounted: function () {
    this.getRegions()
    alert.hide('#success-alert-price')
    alert.hide('#error-alert-price')
    alert.hide('#success-alert-setRegion')
    alert.hide('#error-alert-setRegion')
    alert.hide('#success-alert-addRegion')
    alert.hide('#error-alert-addRegion')
    alert.hide('#success-alert-newsletter')
    alert.hide('#error-alert-newsletter')
  },
  methods: {
    getRegions: function () {
      this.$http.get(`${process.env.AWS_API_ROOT}regions`)
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
      this.$http.post(`${process.env.AWS_API_ROOT}pricing/${this.from.id}@${this.to.id}`, {'CHF': this.price})
      .then((response) => {
        alert.show('#success-alert-price')
      }, (response) => {
        alert.show('#error-alert-price')
      })
    },
    setRegion: function () {
      this.$http.post(`${process.env.AWS_API_ROOT}regions/${this.regionToSet.id}`, this.regionToSet)
      .then((response) => {
        alert.show('#success-alert-setRegion')
      }, (response) => {
        alert.show('#error-alert-setRegion')
      })
    },
    addRegion: function () {
      const id = this.regionToAdd.name.replace(/[^A-Za-z0-9]+/g, "")
      this.$http.post(`${process.env.AWS_API_ROOT}regions/${id}`, this.regionToAdd)
      .then((response) => {
        this.getRegions()
        alert.show('#success-alert-addRegion')
      }, (response) => {
        alert.show('#error-alert-addRegion')
      })
    },
    sendNewsletter: function () {
      const body = `<p>${this.newsletter.body}</p>
<a href="http://localhost:8080/#/unsubscribe">Se désinscrire</a>`
      this.$http.post(`${process.env.AWS_API_ROOT}subscribtions/broadcast`, {'data': body, 'subject': this.newsletter.subject, 'source': process.env.PUBLIC_EMAIL})
      .then((response) => {
        alert.show('#success-alert-newsletter')
      }, (response) => {
        alert.show('#error-alert-newsletter')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (auth.isAdmin())
      next()
    else
      next('/')
  },
}
</script>
