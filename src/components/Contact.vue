<template>
  <div>
    <div class="jumbotron jumbotron-fluid py-0 py-sm-5">
      <div class="container rounded">
        <div class="row">
          <div class="col-sm-6 text-sm-right">
            <img src="~assets/logo.svg" alt="Transport One" width="200" itemprop="image" class="mb-4">
          </div>
          <div class="col-sm-6">
            <div itemscope itemtype="http://schema.org/LocalBusiness">
              <p itemprop="name">
                <strong class="text-uppercase">Transport One</strong>
              </p>
              <i class="fa fa-map-marker"></i>
              <address itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <span itemprop="streetAddress">15 chemin de vers</span><br>
                <span itemprop="postalCode">1228</span>, <span itemprop="addressLocality">Plan-les-Ouates</span><br>
                <span itemprop="addressRegion">Genève</span>, <span itemprop="addressCountry">Suisse</span>
              </address>
              <p>
                <i class="fa fa-female"></i><i class="fa fa-male"></i></br>
                <span itemprop="founders" itemscope itemtype="https://schema.org/Person">
                  <span itemprop="givenName">Bernadette </span><span itemprop="familyName">LANGEL</span>
                </span> & <br>
                <span itemprop="founders" itemscope itemtype="https://schema.org/Person">
                  <span itemprop="givenName">Timothy Taylor </span><span itemprop="familyName">LANGEL</span>
                </span>
              </p>
              <p>
                <i class="fa fa-phone"></i></br>
                <a href="tel:+41799002828" itemprop="telephone" content="+41799002828">+41 (0) 79 900 28 28</a><br>
                <a href="mailto:info@transportone.ch" itemprop="email" content="info@transportone.ch">info@transportone.ch</a>
              </p>
              <p>
                <i class="fa fa-clock-o"></i><br>
                <span itemprop="openingHours" content="Mo,Tu,We,Th,Fr,Sa,Su 06:00-19:00">Du lundi au dimanche, de 6h à 19h</span>
              </p>
              <span class="d-none" itemprop="priceRange">$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <form>
        <div class="row mt-5">
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
  head: {
    title: {
      inner: 'Contact - Transport One'
    },
    meta: [
      { name: 'description', content: 'Contactez-nous pour toute question ou réservation et nous vous répondrons avec plaisir.', id: 'description' }
    ]
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
.jumbotron {
  background-image: url('~assets/img/contact/jumbotron.jpg');
  background-size: cover;
}

.jumbotron .container {
  background-color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 64px;
}
</style>
