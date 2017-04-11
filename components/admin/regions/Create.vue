<template>
  <form v-on:submit.prevent="addRegion">
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label for="regionName">Nom</label>
          <input type="text" name="regionName" id="regionName" v-model="region.name" class="form-control">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="regionPriority">Priorité</label>
          <input type="number" name="regionPriority" id="regionPriority" v-model="region.priority" class="form-control">
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" v-bind="{ disabled: !(region.name && region.priority) }">Ajouter une région</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    region: {
      id: '',
      name: '',
      priority: '0'
    }
  }),
  props: [
    'regions'
  ],
  methods: {
    addRegion: function () {
      // valide les inputs

      // génère un ID pour la DB
      this.region.id = this.region.name.replace(/[^A-Za-z0-9]+/g, '')

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
        this.region = {
          id: '',
          name: '',
          priority: 0
        }
        this.$emit('updateRegions')
      })
      .catch((res) => {
        // TODO
      })
    }
  }
}
</script>
