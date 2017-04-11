<template>
  <form v-on:submit.prevent="deleteRegion">
    <div class="row">
      <div class="col-12 form-group">
        <select class="custom-select w-100" v-model="selectedRegionID">
          <option disabled value="">Choisir une région à supprimer</option>
          <option v-for="region in regions" v-bind:value="region.id">{{region.name}}</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-danger" v-bind="{ disabled: !selectedRegionID }">Supprimer la région</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    selectedRegionID: ''
  }),
  props: [
    'regions'
  ],
  methods: {
    deleteRegion: function () {
      axios({
        method: 'DELETE',
        url: `${api.regions}/${this.selectedRegionID}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        this.selectedRegionID = ''
        this.$emit('updateRegions')
      })
      .catch((res) => {
        // TODO
      })
    }
  }
}
</script>
