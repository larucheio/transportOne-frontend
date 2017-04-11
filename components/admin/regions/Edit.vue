<template>
  <form v-on:submit.prevent="editRegion">
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <label for="regions">Régions</label>
          <select class="custom-select w-100" v-model="region" id="regions">
            <option disabled value="">Choisir une région à modifier</option>
            <option v-for="region in regions" v-bind:value="region">{{region.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <label for="regionName">Nom</label>
          <input type="text" name="regionName" id="regionName" v-model="region.name" class="form-control" v-bind="{disabled: !region}">
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="regionPriority">Priorité</label>
          <input type="number" name="regionPriority" id="regionPriority" v-model="region.priority" class="form-control" v-bind="{disabled: !region}">
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" v-bind="{ disabled: !(region.name && region.priority) }">Modifier la région</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    region: ''
  }),
  props: [
    'regions'
  ],
  methods: {
    editRegion: function () {
      axios({
        method: 'POST',
        url: `${api.regions}/${this.region.id}`,
        data: {
          ...this.region
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        this.region = ''
        this.$emit('updateRegions')
      })
      .catch((res) => {
        // TODO
      })
    }
  }
}
</script>
