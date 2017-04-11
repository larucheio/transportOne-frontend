<template>
  <section class="container">
    <h1>Admin</h1>

    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tabsReservations" role="tab">Réservations</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tabsNewsletter" role="tab">Newsletter</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tabsTarifs" role="tab">Tarifs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#tabsRegions" role="tab">Régions</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane" id="tabsReservations" role="tabpanel">...</div>
      <div class="tab-pane" id="tabsNewsletter" role="tabpanel">...</div>
      <div class="tab-pane" id="tabsTarifs" role="tabpanel">
        <admin-prices/>
      </div>
      <div class="tab-pane active" id="tabsRegions" role="tabpanel">
        <admin-regions/>
      </div>
    </div>
  </section>
</template>

<script>
import AdminRegions from '~components/admin/regions/Index.vue'
import AdminPrices from '~components/admin/prices/Index.vue'

export default {
  middleware: 'admin',
  components: {
    AdminRegions,
    AdminPrices
  }
}
</script>

<style>
</style>
