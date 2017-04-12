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
          <el-select v-model="travel1_from" filterable placeholder="De" class="w-100">
            <el-option
              v-for="region in regions"
              :label="region.name"
              :value="region.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-6 form-group">
          <el-select v-model="travel1_to" filterable placeholder="À" class="w-100">
            <el-option
              v-for="region in regions"
              :label="region.name"
              :value="region.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 form-group">
          <el-date-picker
            v-model="travel1_date"
            type="date"
            placeholder="Date"
            :clearable="false"
            class="w-100"
            >
          </el-date-picker>
        </div>
        <div class="col-sm-6 form-group">
          <el-time-select
            v-model="travel1_time"
            :picker-options="{
              start: '06:00',
              step: '00:15',
              end: '19:00'
            }"
            placeholder="Heure"
            :clearable="false"
            class="w-100">
          </el-time-select>
        </div>
      </div>

      <div v-if="isRoundTrip">
        <div>
          Retour
        </div>
        <div class="row">
          <div class="col-sm-6 form-group">
            <el-select v-model="travel2_from" filterable placeholder="De" class="w-100">
              <el-option
                v-for="region in regions"
                :label="region.name"
                :value="region.id">
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-6 form-group">
            <el-select v-model="travel2_to" filterable placeholder="À" class="w-100">
              <el-option
                v-for="region in regions"
                :label="region.name"
                :value="region.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 form-group">
            <el-date-picker
              v-model="travel2_date"
              type="date"
              placeholder="Date"
              :clearable="false"
              class="w-100"
              >
            </el-date-picker>
          </div>
          <div class="col-sm-6 form-group">
            <el-time-select
              v-model="travel2_time"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '19:00'
              }"
              placeholder="Heure"
              :clearable="false"
              class="w-100">
            </el-time-select>
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
    price: 'à partir de 25',
    travel1_from: '',
    travel1_to: '',
    travel1_date: '',
    travel1_time: '',
    travel2_from: '',
    travel2_to: '',
    travel2_date: '',
    travel2_time: '',
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
        this.getPrice()
      })
  },
  watch: {
    travel1_from: function () { this.getPrice() },
    travel1_to: function () { this.getPrice() },
    travel2_from: function () { this.getPrice() },
    travel2_to: function () { this.getPrice() }
  },
  methods: {
    getPriceForATravel (travel) {
      let places = [travel.from, travel.to].sort()
      return axios.get(`${api.pricing}/${places[0]}@${places[1]}`)
    },
    getPrice: function () {
      let x = this
      let travel1 = {from: this.travel1_from, to: this.travel1_to, date: this.travel1_date, time: this.travel1_time}
      let travel2 = {from: this.travel2_from, to: this.travel2_to, date: this.travel2_date, time: this.travel2_time}
      axios.all([this.getPriceForATravel(travel1), this.getPriceForATravel(travel2)])
        .then(axios.spread(function (travel1, travel2) {
          x.price = 0
          x.price += parseInt(travel1.data.CHF)
          console.log(x.price)
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
