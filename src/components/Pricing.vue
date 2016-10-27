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
            <select class="custom-select btn-block">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon">à</span>
            <select class="custom-select btn-block">
              <option v-for="region in regions" v-bind:value="region">{{region}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
            <input type="date" class="form-control" id="date" placeholder="date">
          </div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
            <input type="time" class="form-control" id="hour" placeholder="hour">
          </div>
        </div>
      </div>
      <div id="round-trip" style="margin-top:10px;" v-if="showRoundTrip">
        <h4>Retour</h4>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">De</span>
              <select class="custom-select btn-block">
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon">à</span>
              <select class="custom-select btn-block">
                <option v-for="region in regions" v-bind:value="region">{{region}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
              <input type="date" class="form-control" id="date" placeholder="date">
            </div>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
              <input type="time" class="form-control" id="hour" placeholder="hour">
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:10px;">
        <button type="submit" class="btn btn-default btn-block" @click="getPrice">Devis</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      regions: ["plo", "carouge"],
      showRoundTrip: false
    }
  },
  methods: {
    getPrice: function (event) {
      this.$emit('getPrice')
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
