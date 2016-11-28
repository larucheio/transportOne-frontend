<template>
  <div class="last-section">
    <form>
      <div class="row">
        <div class="col-sm-6">
          <custom-input ref="firstName" label="Prénom" type="text" v-model="user.firstName" placeholder="John" min="1"></custom-input>
        </div>
        <div class="col-sm-6">
          <custom-input ref="lastName" label="Nom" type="text" v-model="user.lastName" placeholder="Doe" min="1"></custom-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <custom-input ref="tel" label="Téléphone" type="tel" v-model="user.tel" placeholder="022 123 45 67" regexp="^[+]?[0-9]{9,12}$" min="1" errorMessage="Le numéro n'est pas valide."></custom-input>
        </div>
        <div class="col-sm-6">
          <custom-input ref="email" label="Email" type="text" v-model="user.email" placeholder="nom@domain.ch" min="1" regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" errorMessage="L'email n'est pas valide."></custom-input>
        </div>
      </div>
      <custom-input ref="message" label="Message" type="text" v-model="message" placeholder="Bonjour..." min="100" max="2000" rows="10"></custom-input>
      <custom-button ref="sendButton" @click="sendMessage" text="Envoyer" pendingText="Envoi" successText="Envoyé"></custom-button>
    </form>
  </div>
</template>

<script>
import api from '../../config/api.js'
import auth from '../auth'

export default {
  data () {
    return {
      user: {firstName: '', lastName: '', tel: '', email: ''},
      message: ''
    }
  },
  mounted () {
    if (auth.isAuthenticated()) {
      this.user.firstName = auth.getProfile().given_name
      this.user.lastName = auth.getProfile().family_name
      if (typeof auth.getProfile().user_metadata !== 'undefined') {
        this.user.tel = auth.getProfile().user_metadata.tel
        this.user.email = auth.getProfile().user_metadata.email
      }
    }
  },
  methods: {
    sendMessage () {
      const isFirstNameValid = this.$refs.firstName.isValid(this.user.firstName)
      const isLastNameValid = this.$refs.lastName.isValid(this.user.lastName)
      const isTelValid = this.$refs.tel.isValid(this.user.tel)
      const isEmailValid = this.$refs.email.isValid(this.user.email)
      const isMessageValid = this.$refs.message.isValid(this.message)
      if (!(isFirstNameValid && isLastNameValid && isTelValid && isEmailValid && isMessageValid)) {
        this.$refs.sendButton.showError('Veuillez remplir tous les champs.')
        return
      }
      const text = `Nom: ${this.user.firstName} ${this.user.lastName}
Tel: ${this.user.tel} Email: ${this.user.email}
Message: ${this.message}`
      const self = this
      this.$http.post(`${api.contact}`, {'data': text, 'subject': 'Contact', 'source': this.user.email})
      .then((response) => {
        this.$refs.sendButton.showSuccess()
        this.message = ''
      }, (response) => {
        this.$refs.sendButton.showError(`Erreur, le message n'a pas pu être envoyé.`)
      })
      auth.setProfileAttribute({tel: this.user.tel, email: this.user.email})
    }
  }
}
</script>

<style scoped>
</style>
