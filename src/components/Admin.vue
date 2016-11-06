<template>
  <div class="hello">
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">De</span>
          <select class="custom-select btn-block" v-model.lazy="from">
            <option v-for="region in regions" v-bind:value="region">{{region}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-4" style="margin-top:10px;">
        <div class="input-group">
          <span class="input-group-addon">à</span>
          <select class="custom-select btn-block" v-model.lazy="to">
            <option v-for="region in regions" v-bind:value="region">{{region}}</option>
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
    <div id="success-alert" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Sauvé
    </div>
    <div id="error-alert" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> Erreur
    </div>
  </div>
</template>

<script>
import {auth} from '../auth'

export default {
  data () {
    return {
      regions: regions,
      from: regions[0],
      to: regions[0],
      price: 0
    }
  },
  mounted: function () {
    $('#success-alert').hide()
    $('#error-alert').hide()
  },
  methods: {
    setPrice: function (event) {
      this.$http.post(`${process.env.AWS_API_ROOT}pricing/${this.from}@${this.to}`, {'CHF': this.price})
      .then((response) => {
        $('#success-alert').alert()
        $('#success-alert').fadeTo(2000, 500).slideUp(500, function () {
          $('#success-alert').slideUp(500)
        })
      }, (response) => {
        $('#error-alert').alert()
        $('#error-alert').fadeTo(2000, 500).slideUp(500, function () {
          $('#error-alert').slideUp(500)
        })
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
