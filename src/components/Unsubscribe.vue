<template>
  <div>
    <h1>Désinscription à la newsletter</h1>
    <div class="form-group">
      <label for="email">Email à désinscrire</label>
      <input type="email" class="form-control" id="email" placeholder="nom@domain.ch" v-model.lazy="email">
      <button class="btn btn-primary" @click="unsubscribe" style="margin-top:10px;">Confirmer</button>
      <alert ref="alert">{{alertMessage}}</alert>
    </div>
  </div>
</template>

<script>
import Alert from './Alert.vue'
import api from '../../config/api.js'

export default {
  components:{
    'alert': Alert
  },
  data () {
    return {
      email: null,
      alertMessage: ''
    }
  },
  methods: {
    unsubscribe () {
      this.$http.delete(`${api.subscriptions}/${this.email}`)
      .then((response) => {
        this.alertMessage = 'Vous avez été désinscrit.'
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = 'Erreur'
        this.$refs.alert.showError()
      })
    }
  }
}

</script>
