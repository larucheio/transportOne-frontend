<template>
  <div class="card">
    <div class="btn-group btn-block" role="group">
      <button id="one-way-btn" @click="showRoundTrip = false" type="button" class="btn btn-secondary col-xs-6 active">Aller simple</button>
      <button id="round-trip-btn" @click="showRoundTrip = true" type="button" class="btn btn-secondary col-xs-6">Aller-retour</button>
    </div>
    <form style="padding:10px;">
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">De</span>
            <select class="custom-select btn-block" v-model.lazy="from1">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">à</span>
            <select class="custom-select btn-block" v-model.lazy="to1">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
            <input type="date" class="form-control" placeholder="date" v-model.lazy="date1">
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
            <input type="time" class="form-control" placeholder="hour" v-model.lazy="time1">
          </div>
        </div>
      </div>
      <div id="round-trip" style="margin-top:10px;" v-if="showRoundTrip">
        <h4>Retour</h4>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">De</span>
              <select class="custom-select btn-block" v-model.lazy="from2">
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">à</span>
              <select class="custom-select btn-block" v-model.lazy="to2">
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
              <input type="date" class="form-control" placeholder="date" v-model.lazy="date2">
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
              <input type="time" class="form-control" placeholder="hour" v-model.lazy="time2">
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
  showRoundTrip: false,
  from1: regions[0],
  to1: regions[0],
  from2: regions[0],
  to2: regions[0],
  date1: null,
  time1: null,
  date2: null,
  time2: null,
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
      if ((this.date1 === null || this.time1 === null) || (this.showRoundTrip === true && (this.date2 === null || this.time2 === null))) {
        this.error = 'Veuillez remplir tous les champs'
        $('#error-alert').alert()
        $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
        return
      }
      this.$emit('getPrice')
      let price
      this.$http.get(`${process.env.AWS_API_ROOT}pricing/${this.from1}@${this.to1}`)
      .then((response) => {
        price = response.body.CHF
        if (this.showRoundTrip) {
          this.$http.get(`${process.env.AWS_API_ROOT}pricing/${this.from2}@${this.to2}`)
          .then((response) => {
            price += response.body.CHF
            this.$emit('setPrice', price, this.showRoundTrip, this.date1, this.time1, this.date2, this.time2)
          }, (response) => {
            this.error = 'Erreur'
            $('#error-alert').alert()
            $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {})
          })
        } else {
          this.error = 'Erreur'
          this.$emit('setPrice', price, this.showRoundTrip, this.date1, this.time1, this.date2, this.time2)
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
