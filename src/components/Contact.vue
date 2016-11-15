<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" class="form-control" id="firstName" placeholder="John" v-model.lazy="user.firstName">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input type="text" class="form-control" id="lastName" placeholder="Doe" v-model.lazy="user.lastName">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input type="tel" class="form-control" id="phone" placeholder="022 123 45 67" v-model.lazy="user.tel">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" placeholder="nom@domain.ch" v-model.lazy="user.email">
        </div>
      </div>
    </div>
    <label for="message">Message</label>
    <textarea class="form-control" v-model.lazy="message" id="message" style="margin-bottom:10px;" rows="10"></textarea>
    <button class="btn btn-default btn-block" @click="sendMessage">Envoyer</button>
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
  },
  methods: {
    sendMessage () {
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
    }
  }
}
</script>

<style scoped>
</style>
