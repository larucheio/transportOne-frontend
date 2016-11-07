<template>
  <div class="card">
    <div class="btn-group btn-block" role="group">
      <button id="one-way-btn" @click="travel2.exist = false" type="button" class="btn btn-secondary col-xs-6 active">Aller simple</button>
      <button id="round-trip-btn" @click="travel2.exist = true" type="button" class="btn btn-secondary col-xs-6">Aller-retour</button>
    </div>
    <form style="padding:10px;">
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">De</span>
            <select class="custom-select btn-block" v-model.lazy="travel1.from">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">à</span>
            <select class="custom-select btn-block" v-model.lazy="travel1.to">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
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
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">à</span>
              <select class="custom-select btn-block" v-model.lazy="travel2.to">
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
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
let data = {
  regions: regions,
  travel1: {from: regions[0], to: regions[0], date: '', time: ''},
  travel2: {from: regions[0], to: regions[0], date: '', time: '', exist: false},
  error: null
}
export default {
  data: function () {
    return data
  },
  mounted: function () {
    $('#error-alert').hide()
  },
  methods: {
    getPrice: function (event) {
      if ((this.travel1.date === '' || this.travel1.time === '') || (this.travel2.exist === true && (this.travel2.date === '' || this.travel2.time === ''))) {
        this.error = 'Veuillez remplir tous les champs'
        $('#error-alert').alert()
        $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
        return
      }
      this.$emit('getPrice')
      let price
      this.$http.get(`${process.env.AWS_API_ROOT}pricing/${this.travel1.from}@${this.travel1.to}`)
      .then((response) => {
        price = response.body.CHF
        if (this.travel2.exist) {
          this.$http.get(`${process.env.AWS_API_ROOT}pricing/${this.travel2.from}@${this.travel2.to}`)
          .then((response) => {
            price += response.body.CHF
            this.$emit('setPrice', price, this.travel1, this.travel2)
          }, (response) => {
            this.error = 'Erreur'
            $('#error-alert').alert()
            $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
          })
        } else {
          this.error = 'Erreur'
          this.$emit('setPrice', price, this.travel1, this.travel2)
        }
      }, (response) => {
        $('#error-alert').alert()
        $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
      })
    }
  }
}
</script>

<style scoped>
.btn-secondary {
  border: 0;
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
