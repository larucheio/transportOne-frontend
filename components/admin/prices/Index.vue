<template>
  <div class="card-block">
    <h6 class="card-title">Modifier un tarif</h6>
    <edit-prices :regions="regions" @updateRegions="updateRegions"/>
  </div>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

import EditPrices from '~components/admin/prices/Edit.vue'

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
    EditPrices
  }
}
</script>
