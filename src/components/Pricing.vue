<template>
  <div class="row">
  <div class="col-lg-8 offset-lg-2">
  <div class="card shadow">
    <div class="btn-group btn-block" data-toggle="buttons">
      <label class="btn btn-toggle active col-xs-6" @click="changeTravelType(false)">
        <input type="radio">Aller simple
      </label>
      <label class="btn btn-toggle col-xs-6" @click="changeTravelType(true)">
        <input type="radio">Aller-retour
      </label>
    </div>
    <form class="card-block">
      <h3>Prix: {{price}}<i v-if="isLoading" class="fa fa-spinner fa-pulse fa-fw"></i></h3>
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
              <input id="datepicker1" type="text" class="form-control" v-model.lazy="travel1.date">
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
              <input type="time" class="form-control" v-model.lazy="travel1.time">
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
                <input id="datepicker2" type="text" class="form-control" v-model.lazy="travel2.date">
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
                <input type="time" class="form-control" v-model.lazy="travel2.time">
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
import  '../../node_modules/pikaday/css/pikaday.css'

let date = new Date()
let hours = date.getHours()
if (hours < 10) hours = `0${hours}`
let minutes = date.getMinutes()
if (minutes < 10) minutes = `0${minutes}`
const time = `${hours}:${minutes}`
let day = date.getDate()
if (day < 10) day = `0${day}`
let month = date.getMonth()
if (month < 10) month = `0${month}`
date = `${date.getFullYear()}-${month}-${day}`

let data = {
  regions: null,
  travel1: {from: null, to: null, date: date, time: time},
  travel2: {from: null, to: null, date: date, time: time, exist: false},
  price: 'à partir de 25 CHF',
  isLoading: false,
  datepicker1: null,
  datepicker2: null
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
  beforeCreate () {
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
    }, (response) => {})
  },
  mounted () {
    const i18n ={
      previousMonth : 'Mois précédent',
      nextMonth     : 'Mois prochain',
      months        : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
      weekdays      : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
      weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
    }
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
      this.price = ''
      let price
      this.isLoading = true
      this.$http.get(`${api.pricing}/${this.travel1.from.id}@${this.travel1.to.id}`)
      .then((response) => {
        price = response.body.CHF
        if (this.travel2.exist) {
          this.$http.get(`${api.pricing}/${this.travel2.from.id}@${this.travel2.to.id}`)
          .then((response) => {
            this.isLoading = false
            this.price = `${price + response.body.CHF} CHF`
          }, (response) => {
            this.isLoading = false
            this.price = 'à partir de 50 CHF'
          })
        } else {
          this.isLoading = false
          this.price = `${price} CHF`
        }
      }, (response) => {
        this.isLoading = false
        this.price = 'à partir de 25 CHF'
      })
    },
    book: function () {
      this.$router.push('/reservation')
    }
  }
}
</script>

<style scoped>
.btn-toggle {
  background-color: lightgray;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.btn-toggle.active {
  background-color: white;
  margin-right: 1px;
}

.input-group-addon {
  width: 50px;
  background-color: #fff;
}
</style>
