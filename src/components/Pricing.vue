<template>
  <div class="card">
    <div class="btn-group btn-block" data-toggle="buttons">
      <label class="btn btn-toggle active col-xs-6" @click="travel2.exist = false">
        <input type="radio">Aller simple
      </label>
      <label class="btn btn-toggle col-xs-6" @click="travel2.exist = true">
        <input type="radio">Aller-retour
      </label>
    </div>
    <form style="padding:10px;">
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">De</span>
            <select class="custom-select btn-block" v-model.lazy="travel1.from">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">à</span>
            <select class="custom-select btn-block" v-model.lazy="travel1.to">
              <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
            <input type="date" class="form-control" placeholder="date" v-model.lazy="travel1.date">
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
            <input type="time" class="form-control" placeholder="hour" v-model.lazy="travel1.time">
          </div>
        </div>
      </div>
      <div id="round-trip" style="margin-top:10px;" v-if="travel2.exist">
        <h4>Retour</h4>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">De</span>
              <select class="custom-select btn-block" v-model.lazy="travel2.from">
                <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">à</span>
              <select class="custom-select btn-block" v-model.lazy="travel2.to">
                <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
              <input type="date" class="form-control" placeholder="date" v-model.lazy="travel2.date">
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
              <input type="time" class="form-control" placeholder="hour" v-model.lazy="travel2.time">
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:10px;">
        <button type="submit" class="btn btn-default btn-block" @click="getPrice">Devis</button>
        <div id="error-alert" class="alert alert-danger" role="alert">
          <i class="fa fa-times" aria-hidden="true"></i> {{error}}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import alert from '../alert'
import api from '../../config/api.js'

let data = {
  regions: null,
  travel1: {from: null, to: null, date: '', time: ''},
  travel2: {from: null, to: null, date: '', time: '', exist: false},
  error: null
}
export default {
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
  mounted: function () {
    alert.hideAll()
  },
  methods: {
    getPrice: function (event) {
      if ((this.travel1.date === '' || this.travel1.time === '') || (this.travel2.exist === true && (this.travel2.date === '' || this.travel2.time === ''))) {
        this.error = 'Veuillez remplir tous les champs'
        alert.show('#error-alert')
        return
      }
      this.$emit('getPrice')
      let price
      this.$http.get(`${api.pricing}/${this.travel1.from.id}@${this.travel1.to.id}`)
      .then((response) => {
        price = response.body.CHF
        if (this.travel2.exist) {
          this.$http.get(`${api.pricing}/${this.travel2.from.id}@${this.travel2.to.id}`)
          .then((response) => {
            price += response.body.CHF
            this.$emit('setPrice', price, this.travel1, this.travel2)
          }, (response) => {
            this.error = 'Erreur'
            alert.show('#error-alert')
          })
        } else {
          this.$emit('setPrice', price, this.travel1, this.travel2)
        }
      }, (response) => {
        price = 'à partir de 25 CHF'
        this.$emit('setPrice', price, this.travel1, this.travel2)
      })
    }
  }
}
</script>

<style scoped>
.btn-secondary {
  border: 0;
}

.btn-toggle {
  background-color: lightgray;
}

.btn-toggle.active {
  background-color: white;
}

.input-group-addon {
  width: 50px;
  background-color: #fff;
}
.custom-select {
  height: 44px;
}
.container {
  background-color: #ccc;
}
</style>
