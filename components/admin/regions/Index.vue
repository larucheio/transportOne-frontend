<template>
  <div>
    <div class="card-block">
      <h6 class="card-title">Ajouter une region</h6>
      <create-region :regions="regions" @updateRegions="updateRegions"/>
    </div>
    <hr>
    <div class="card-block">
      <h6 class="card-title">Modifier une région</h6>
      <edit-region :regions="regions" @updateRegions="updateRegions"/>
    </div>
    <hr>
    <div class="card-block">
      <h6 class="card-title">Supprimer une région</h6>
      <delete-region :regions="regions" @updateRegions="updateRegions"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

import CreateRegion from '~components/admin/regions/Create.vue'
import EditRegion from '~components/admin/regions/Edit.vue'
import DeleteRegion from '~components/admin/regions/Delete.vue'

export default {
  data: () => ({
    regions: []
  }),
  created: function () {
    this.updateRegions()
  },
  methods: {
    updateRegions: function () {
      axios
        .get(`${api.regions}`)
        .then((res) => {
          const regions = res.data.data.Items
          regions.sort(function compare (a, b) {
            return a.priority + a.name < b.priority + b.name ? -1 : 1
          })
          this.regions = regions
        })
    }
  },
  components: {
    CreateRegion,
    EditRegion,
    DeleteRegion
  }
}
</script>
