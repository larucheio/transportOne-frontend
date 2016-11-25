<template>
  <div>
    <h1>Désinscription à la newsletter</h1>
    <div class="form-group">
      <custom-input ref="email" label="Email à désinscrire" type="text" v-model="email" errorMessage="L'email n'est pas valide." placeholder="nom@domain.ch" min="1" regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"></custom-input>
      <custom-button ref="unsubscribeButton" @click="unsubscribe" text="Désinscrire" pendingText="Désinscription" successText="Désinscrit"></custom-button>
    </div>
  </div>
</template>

<script>
import api from '../../config/api.js'

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    unsubscribe () {
      const isEmailValid = this.$refs.email.isValid(this.email)
      if (!isEmailValid) {
        this.$refs.unsubscribeButton.showError(`L'email n'est pas valide.`)
        return
      }
      this.$http.delete(`${api.subscriptions}/${this.email}`)
      .then((response) => {
        this.$refs.unsubscribeButton.showSuccess()
      }, (response) => {
        this.$refs.unsubscribeButton.showError()
      })
    }
  }
}

</script>
