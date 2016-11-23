<template>
  <div>
    <h1>Désinscription à la newsletter</h1>
    <div class="form-group">
      <custom-input ref="email" label="Email à désinscrire" type="text" v-model="email" placeholder="nom@domain.ch" min="1" regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" errorMessage="L'email n'est pas valide."></custom-input>
      <custom-button ref="unsubscribeButton" @click="unsubscribe" text="Désinscrire"></custom-button>
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
import api from '../../config/api.js'

export default {
  data () {
    return {
      email: ''
    }
  },
  mounted: function () {
    alert.hideAll()
  },
  methods: {
    unsubscribe () {
      const isEmailValid = this.$refs.email.isValid(this.email)
      if (!isEmailValid) return
      this.$refs.unsubscribeButton.showPending()
      this.$http.delete(`${api.subscriptions}/${this.email}`)
      .then((response) => {
        this.$refs.unsubscribeButton.showSuccess()
        alert.show('#success-alert')
      }, (response) => {
        this.$refs.unsubscribeButton.showError()
        alert.show('#error-alert')
      })
    }
  }
}

</script>
