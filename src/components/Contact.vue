<template>
  <div class="card card-block">
    <form>
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
    </form>
    <alert ref="alert">{{alertMessage}}</alert>
  </div>
</template>

<script>
import Alert from './Alert.vue'
import api from '../../config/api.js'
import auth from '../auth'

export default {
  components:{
    'alert': Alert
  },
  data () {
    return {
      user: {firstName: '', lastName: '', tel: '', email: ''},
      message: '',
      alertMessage: ''
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
      if (this.user.firstName === '' || this.user.lastName === '' || this.user.tel === '' || this.user.email === '') {
        this.alertMessage = `Veuillez remplir le formulaire avant de l'envoyer.`
        this.$refs.alert.showError()
        return
      }
      if (this.message.length < 100 || this.message.length > 2000) {
        this.alertMessage = `Le message doit contenir entre 100 et 2000 caractères.`
        this.$refs.alert.showError()
        return
      }
      const text = `Nom: ${this.user.firstName} ${this.user.lastName}
Tel: ${this.user.tel} Email: ${this.user.email}
Message: ${this.message}`
      const self = this
      this.$http.post(`${api.contact}`, {'data': text, 'subject': 'Contact', 'source': this.user.email})
      .then((response) => {
        this.message = ''
        this.alertMessage = `Message envoyé.`
        this.$refs.alert.showSuccess()
      }, (response) => {
        this.alertMessage = `Erreur, le message n'a pas pu être envoyé.`
        this.$refs.alert.showError()
      })
      auth.setProfileAttribute({tel: this.user.tel, email: this.user.email, from: this.travel1.from, to: this.travel1.to})
    }
  }
}
</script>

<style scoped>
</style>
