<template>
  <div class="card text-center">
    <div class="card-header p-0 border-0">
      <ul class="nav nav-tabs card-header-tabs m-0">
        <li class="nav-item w-50">
          <a class="nav-link border-0 active" href="#" data-toggle="tab" @click="roundTrip(false)">Aller simple</a>
        </li>
        <li class="nav-item w-50">
          <a class="nav-link border-0" href="#" data-toggle="tab" @click="roundTrip(true)">Aller retour</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <h4 class="card-title">Prix: {{price}} CHF</h4>

      <div class="row">
        <div class="col-sm-6 form-group">
          <select class="custom-select w-100" v-model="travel[0].from" @change="getPrice">
            <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
          </select>
        </div>
        <div class="col-sm-6 form-group">
          <select class="custom-select w-100" v-model="travel[0].to" @change="getPrice">
            <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 form-group">
          <input type="date" class="form-control" name="" value="">
        </div>
        <div class="col-sm-6 form-group">
          <input type="time" class="form-control" name="" value="">
        </div>
      </div>

      <div v-if="isRoundTrip">
        <div>
          Retour
        </div>
        <div class="row">
          <div class="col-sm-6 form-group">
            <select class="custom-select w-100" v-model="travel[1].from" @change="getPrice">
              <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
            </select>
          </div>
          <div class="col-sm-6 form-group">
            <select class="custom-select w-100" v-model="travel[1].to" @change="getPrice">
              <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 form-group">
            <input type="date" class="form-control" name="" value="">
          </div>
          <div class="col-sm-6 form-group">
            <input type="time" class="form-control" name="" value="">
          </div>
        </div>
      </div>

      <input type="submit" class="form-control btn btn-primary" name="" value="Réserver">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    regions: [],
    price: '',
    travel: [
      {from: null, to: null},
      {from: null, to: null}
    ],
    isRoundTrip: false
  }),
  created () {
    axios
      .get(`${api.regions}`)
      .then((res) => {
        const regions = res.data.data.Items
        regions.sort(function compare (a, b) {
          return a.priority + a.name < b.priority + b.name ? -1 : 1
        })
        this.regions = regions
        this.travel = [
          {from: regions[0].id, to: regions[0].id},
          {from: regions[0].id, to: regions[0].id}
        ]
        this.getPrice()
      })
  },
  methods: {
    getPriceForATravel (travel) {
      let places = [travel.from, travel.to].sort()
      return axios.get(`${api.pricing}/${places[0]}@${places[1]}`)
    },
    getPrice () {
      let x = this
      axios.all([this.getPriceForATravel(this.travel[0]), this.getPriceForATravel(this.travel[1])])
        .then(axios.spread(function (travel1, travel2) {
          x.price = 0
          x.price += parseInt(travel1.data.CHF)
          x.isRoundTrip ? x.price += parseInt(travel2.data.CHF) : null
        }))
    },
    roundTrip: function (isRoundTrip) {
      this.isRoundTrip = isRoundTrip
      this.getPrice()
    }
  }
}
</script>

<style>
</style>
