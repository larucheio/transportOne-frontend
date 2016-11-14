<template>
  <div>
    <h1>Désinscription à la newsletter</h1>
    <div class="form-group">
      <label for="email">Email à désinscrire</label>
      <input type="email" class="form-control" id="email" placeholder="nom@domain.ch" v-model.lazy="email">
      <button class="btn btn-primary" @click="unsubscribe" style="margin-top:10px;">Confirmer</button>
      <div id="success-alert" class="alert alert-success" role="alert">
        <i class="fa fa-check" aria-hidden="true"></i> Désinscrit!
      </div>
      <div id="error-alert" class="alert alert-danger" role="alert">
        <i class="fa fa-times" aria-hidden="true"></i> Erreur
      </div>
    </div>
  </div>
</template>

<script>
import alert from '../alert'

export default {
  data () {
    return {
      email: null
    }
  },
  mounted: function () {
    alert.hide()
  },
  methods: {
    unsubscribe () {
      this.$http.delete(`${process.env.AWS_API_ROOT}subscribtions/${this.email}`)
      .then((response) => {
        alert.show('#success-alert')
      }, (response) => {
        alert.show('#error-alert')
      })
    }
  }
}

</script>
