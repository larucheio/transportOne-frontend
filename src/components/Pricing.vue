<template>
  <div class="jumbotron">
    <h1 class="text-center">Devis</h1>
    <div class="row">
      <div class="col-sm-6">
        <button type="submit" class="btn btn-default">aller simple</button>
      </div>
      <div class="col-sm-6">
        <button type="submit" class="btn btn-default">aller retour</button>
      </div>
    </div>
    <form style="padding:5px;">
      <div class="row">
        <div class="col-sm-6">
          <label>De</label>
          <select>
            <option v-for="region in regions" v-bind:value="region">{{region}}</option>
          </select>
        </div>
        <div class="col-sm-6">
          <label>à</label>
          <select>
            <option v-for="region in regions" v-bind:value="region">{{region}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
            <input type="date" class="form-control" id="date" placeholder="date" v-model="date">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
            <input type="time" class="form-control" id="hour" placeholder="hour">
          </div>
        </div>
        <div class="checkbox">
          <label><input type="checkbox"> aller-retour</label>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        regions: ["plo", "carouge"],
        date: '00/00/0000'
      }
    },
    watch: {
      date: function (newDate) {
        this.hours = ['3h', '4h']
        this.alert()
      }
    },
    methods: {
      // _.debounce is a function provided by lodash to limit how
      // often a particularly expensive operation can be run.
      // In this case, we want to limit how often we access
      // yesno.wtf/api, waiting until the user has completely
      // finished typing before making the ajax request. To learn
      // more about the _.debounce function (and its cousin
      // _.throttle), visit: https://lodash.com/docs#debounce
      alert () {
        alert("w")
      }
    }
  }
  </script>
