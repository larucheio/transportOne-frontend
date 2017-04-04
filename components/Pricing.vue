<template>
  <div class="card">
    <div class="card-header p-0">
      <ul class="nav nav-pills card-header-pills m-0">
        <li class="nav-item w-50">
          <a class="nav-link active" href="#">Aller simple</a>
        </li>
        <li class="nav-item w-50">
          <a class="nav-link" href="#">Aller retour</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <h4 class="card-title">Prix: {{price}} CHF</h4>

      <div class="row">
        <div class="col-sm-6 form-group">
          <select class="custom-select" v-model="travel1.from" @change="getPrice">
            <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
          </select>
        </div>
        <div class="col-sm-6 form-group">
          <select class="custom-select" v-model="travel1.to" @change="getPrice">
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
    travel1: {from: null, to: null}
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
        this.travel1 = {from: regions[0].id, to: regions[0].id}
        this.getPrice()
      })
  },
  methods: {
    getPrice () {
      let places = [this.travel1.from, this.travel1.to]
      axios
        .get(`${api.pricing}/${places[0]}@${places[1]}`)
        .then((res) => {
          this.price = res.data.CHF
        })
    }
  }
}
</script>

<style>
</style>
