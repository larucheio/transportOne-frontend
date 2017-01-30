<template>
  <div class="row">
  <div class="col-lg-8 offset-lg-2">
  <div class="card bg-transparent text-center">
    <div class="btn-group btn-block" data-toggle="buttons">
      <label id="oneWayToggle" class="btn btn-toggle w-50" @click="changeTravelType(false)">
        <input type="radio">Aller Simple
      </label>
      <label id="roundTripToggle" class="btn btn-toggle w-50" @click="changeTravelType(true)">
        <input type="radio">Aller-Retour
      </label>
    </div>
    <form class="card-block bg-white-08 rounded-bottom">
      <h3>Prix: {{displayedPrice}} CHF<i v-if="isLoading" class="fa fa-spinner fa-pulse fa-fw"></i></h3>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">De</span>
              <select class="form-control btn-block" v-model.lazy="travel1.from" @change="getPrice">
                <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">à</span>
              <select class="form-control btn-block" v-model.lazy="travel1.to" @change="getPrice">
                <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
              <input id="datepicker1" type="text" class="form-control bg-white" v-model.lazy="travel1.date" readonly>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
              <select class="form-control btn-block" v-model.lazy="travel1.time">
                <option v-for="time in times" v-bind:value="time">{{time}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="round-trip" v-show="travel2.exist">
        <h6>Retour</h6>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">De</span>
                <select class="form-control btn-block" v-model.lazy="travel2.from" @change="getPrice">
                  <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">à</span>
                <select class="form-control btn-block" v-model.lazy="travel2.to" @change="getPrice">
                  <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
                <input id="datepicker2" type="text" class="form-control bg-white" v-model.lazy="travel2.date" readonly>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
                <select class="form-control btn-block" v-model.lazy="travel2.time">
                  <option v-for="time in times" v-bind:value="time">{{time}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <custom-button v-if="!isBooking" @click="book" customClass="btn btn-primary btn-block" componentClass="" text="Réserver"></custom-button>
    </form>
  </div>
</div>
</div>
</template>

<script>
import api from '../../config/api.js'
import pikaday from 'pikaday'
import i18n from '../i18n/fr-CH.json'

let date = new Date()
let currentTime = date.getHours()
let day = date.getDate()
if (day < 10) day = `0${day}`
let month = date.getMonth()
if (month < 10) month = `0${month}`
date = `${date.getFullYear()}-${month}-${day}`

let times = []
for (let i = currentTime + 1; i < currentTime + 25; i++) {
  times.push(`${i%24}:00`)
  for (let j = 15; j < 60; j+=15) {
    times.push(`${i%24}:${j}`)
  }
}

let data = {
  regions: null,
  travel1: {from: null, to: null, date: date, time: times[0]},
  travel2: {from: null, to: null, date: date, time: times[0], exist: false},
  price: 0,
  isLoading: false,
  times: times
}
export default {
  props: {
    isBooking: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return data
  },
  mounted () {
    if (!this.regions) {
      this.$http.get(`${api.regions}`)
      .then((response) => {
        this.regions = response.body.data.Items.sort(function compare (a, b) {
          if (a.priority + a.name < b.priority + b.name)
          return -1;
          return 1;
        })
        this.travel1.from = this.regions[0]
        this.travel1.to = this.regions[0]
        this.travel2.from = this.regions[0]
        this.travel2.to = this.regions[0]
        this.$emit('updatePrice')
      }, (response) => {})
    } else this.$emit('updatePrice')
    if (this.travel2.exist) $('#roundTripToggle').addClass("active")
    else $('#oneWayToggle').addClass("active")
    this.picker1 = new pikaday({
      field: document.getElementById('datepicker1'),
      firstDay: 1,
      format: 'D MMM YYYY',
      minDate: new Date(),
      maxDate: new Date(2030, 12, 31),
      yearRange: [2016,2030],
      i18n: i18n
    })
    this.picker2 = new pikaday({
      field: document.getElementById('datepicker2'),
      firstDay: 1,
      format: 'D MMM YYYY',
      minDate: new Date(),
      maxDate: new Date(2030, 12, 31),
      yearRange: [2016,2030],
      i18n: i18n
    })
  },
  methods: {
    changeTravelType: function (isRoundTrip) {
      if (this.travel2.exist === isRoundTrip) return
      this.travel2.exist = isRoundTrip
      this.$emit('changeTravelType', isRoundTrip)
      this.getPrice()
    },
    getPrice: function () {
      if ((this.travel1.date === '' || this.travel1.time === '') || (this.travel2.exist === true && (this.travel2.date === '' || this.travel2.time === ''))) {
        this.$refs.getPriceButton.showError( 'Veuillez remplir tous les champs.')
        return
      }
      this.price = 0
      let price
      this.isLoading = true
      this.$http.get(`${api.pricing}/${this.travel1.from.id}@${this.travel1.to.id}`)
      .then((response) => {
        price = response.body.CHF
        if (this.travel2.exist) {
          this.$http.get(`${api.pricing}/${this.travel2.from.id}@${this.travel2.to.id}`)
          .then((response) => {
            this.isLoading = false
            this.price = price + response.body.CHF
            this.$emit('updatePrice')
          }, (response) => {
            this.isLoading = false
            this.$emit('updatePrice')
          })
        } else {
          this.isLoading = false
          this.price = price
          this.$emit('updatePrice')
        }
      }, (response) => {
        this.isLoading = false
        this.$emit('updatePrice')
      })
    },
    book: function () {
      this.$router.push('/reservation')
    }
  },
  computed: {
    displayedPrice: function () {
      return this.price !== 0 ? this.price : 'à partir de 25'
    }
  }
}
</script>

<style scoped>
.btn-toggle {
  background-color: rgba(222, 222, 222, 0.5);
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-bottom: 0;
}
.btn-toggle.active {
  background-color: rgba(255, 255, 255, 0.8);
  margin-right: 1px;
}

.input-group-addon {
  width: 50px;
  background-color: #fff;
}
</style>
