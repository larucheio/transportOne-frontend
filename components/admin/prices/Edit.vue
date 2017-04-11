<template>
  <form v-on:submit.prevent="editPrice">
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <label for="from">Départ</label>
          <select class="custom-select w-100" v-model="price.from" id="from" @change="getPrice">
            <option disabled value="">Choisir une région à modifier</option>
            <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <label for="to">Arrivée</label>
          <select class="custom-select w-100" v-model="price.to" id="to" @change="getPrice">
            <option disabled value="">Choisir une région à modifier</option>
            <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="travelPrice">Tarif</label>
          <input type="number" name="regionPriority" id="travelPrice" v-model="price.price" class="form-control" v-bind="{ disabled: !(price.from && price.to) }">
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" v-bind="{ disabled: !(price.from && price.to) }">Modifier le tarif</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    price: {
      from: '',
      to: '',
      price: ''
    }
  }),
  props: [
    'regions'
  ],
  methods: {
    getPrice: function () {
      if (this.price.from && this.price.to) {
        let places = [this.price.from, this.price.to].sort()
        axios
          .get(`${api.pricing}/${places[0]}@${places[1]}`)
          .then((res) => {
            this.price.price = res.data.CHF
          })
          .catch((res) => {
            this.price.price = 0
          })
      }
    },
    editPrice: function () {
      if (this.price.from && this.price.to) {
        let places = [this.price.from, this.price.to].sort()
        axios({
          method: 'POST',
          url: `${api.pricing}/${places[0]}@${places[1]}`,
          data: {
            'CHF': this.price.price
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          this.price = {
            from: '',
            to: '',
            price: ''
          }
        })
        .catch((res) => {
          // TODO
        })
      }
    }
  }
}
</script>
