<template>
  <div class="card card-block">
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
      <custom-input ref="message" label="Message" type="text" v-model="newsmessage" placeholder="Bonjour..." min="1" max="2000" rows="10"></custom-input>
      <button class="btn btn-default btn-block" @click="sendMessage">Envoyer</button>
    </form>
    <div id="success-alert" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Une personne vous contactera pour confirmer la reservation.
    </div>
    <div id="error-alert" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i>  {{error}}
    </div>
  </div>
</template>

<script>
import alert from '../alert'
import api from '../../config/api.js'
import auth from '../auth'

export default {
  data () {
    return {
      user: {firstName: '', lastName: '', tel: '', email: ''},
      message: '',
      error: ''
    }
  },
  mounted () {
    alert.hideAll()
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
      if (!(isFirstNameValid && isLastNameValid && isTelValid && isEmailValid && isMessageValid)) return
      if (this.user.firstName === '' || this.user.lastName === '' || this.user.tel === '' || this.user.email === '') {
        this.error = `Veuillez remplir le formulaire avant de l'envoyer.`
        alert.show('#error-alert')
        return
      }
      if (this.message.length < 100 || this.message.length > 2000) {
        this.error = `Le message doit contenir entre 100 et 2000 caractères.`
        alert.show('#error-alert')
        return
      }
      const text = `Nom: ${this.user.firstName} ${this.user.lastName}
Tel: ${this.user.tel} Email: ${this.user.email}
Message: ${this.message}`
      const self = this
      this.$http.post(`${api.contact}`, {'data': text, 'subject': 'Contact', 'source': this.user.email})
      .then((response) => {
        this.message = ''
        alert.show('#success-alert')
      }, (response) => {
        this.error = `Erreur, le message n'a pas pu être envoyé.`
        alert.show('#error-alert')
      })
      auth.setProfileAttribute({tel: this.user.tel, email: this.user.email, from: this.travel1.from, to: this.travel1.to})
    }
  }
}
</script>

<style scoped>
</style>
