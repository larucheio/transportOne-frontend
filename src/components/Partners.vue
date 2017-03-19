<template>
  <div class="container mt-5">
    <h3 class="text-uppercase mb-4">Partenaires</h3>
    <p>Transport One est en collaboration avec de nombreux instituts, mairies, foyers, associations, fondations et autres clients privés.</p>
    <p>N'hésitez pas à nous <a href="#/contact" >contacter</a> pour toute demande de renseignements, devis ou autres informations concernant la mise en place de contrat fixe pour des transports journalier, hebdomadaire, mensuel ou sur toute l'année.</p>
    <p>Voici une sélection de nos fidèles partenaires avec qui nous travaillons depuis plus de dix ans.</p>
    <div class="row">
      <div class="col-sm-6">
        <p><img src="../assets/imad.gif" alt="IMAD" height="50" class="m-3">
          <br>IMAD - institution genevoise de maintien à domicile
          <br><i class="fa fa-phone mr-1"></i>022 420 20 00
          <br><i class="fa fa-envelope mr-1"></i><a href='mailto:info@imad-ge.ch' class="text-muted">info@imad-ge.ch</a>
        </p>
      </div>
      <div class="col-sm-6">
        <p><img src="../assets/collonge-bellerive.jpg" alt="collonge-bellerive" height="50" class="m-3">
          <br>Mairie de Collonge-Bellerive
          <br><i class="fa fa-phone mr-1"></i>022 722 11 50
          <br><i class="fa fa-envelope mr-1"></i><a href='mailto:info@collonge-bellerive.ch' class="text-muted">info@collonge-bellerive.ch</a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <p><img src="../assets/plo.png" alt="PLO" height="50" class="m-3">
          <br>Mairie de Plan-Les-Ouates
          <br><i class="fa fa-phone mr-1"></i>022 884 64 00
          <br><i class="fa fa-envelope mr-1"></i><a href='mailto:info@plan-les-ouates.ch' class="text-muted">info@plan-les-ouates.ch</a>
        </p>
      </div>
      <div class="col-sm-6">
        <p><img src="../assets/caroubier.svg" alt="caroubier" height="50" class="m-3">
          <br>Foyer de jour « Le Carroubier »
          <br><i class="fa fa-phone mr-1"></i>022 343 60 66
          <br><i class="fa fa-envelope mr-1"></i><a href='mailto:caroubier@ge.pro-senectute.ch' class="text-muted">caroubier@ge.pro-senectute.ch</a>
        </p>
      </div>
    </div>
    <p><img src="../assets/oasis.png" alt="oasis" height="50" class="m-3">
      <br>Association Foyer de Jour l&#39;Oasis
      <br><i class="fa fa-phone mr-1"></i>079 200 28 28
      <br><i class="fa fa-envelope mr-1"></i><a href='mailto:email@domain.com' class="text-muted">oasis@ge.pro-senectute.ch</a>
    </p>
    <div class="section my-5">
      <h2 class="text-uppercase mb-4">Votre avis nous intéresse</h2>
      <p>Soucieux d’améliorer nos services en continu, votre opinion permet à Transport One de s’impliquer totalement dans la dynamique client et de rester toujours au fait de vos préoccupations et de vos souhaits.</p>
      <p>C’est pourquoi nous vous encourageons vivement à noter la qualité de votre transport et de nous laisser votre avis !</p>
      <span v-for="id in 5" @click="rating(id)">
        <i v-if="id > rate" class="fa fa-star-o fa-lg star" aria-hidden="true"></i>
        <i v-else class="fa fa-star fa-lg star" aria-hidden="true"></i>
      </span>
      <custom-input ref="review" label="" type="text" v-model="newReview" placeholder="Mon avis..." min="1" max="2000" rows="5"></custom-input>
      <custom-button ref="sendReviewButton" @click="sendReview" text="Envoyer" pendingText="Envoi" successText="Envoyé"></custom-button>
    </div>
    <h6>Avis</h6>
    <review v-for="review in reviews" v-bind:review="review"></review>
    <custom-button v-if="showMorePage" ref="getMoreReviewsButton" @click="getReviews" text="Plus de commentaires" pendingText="Recherche des commentaires" successText="Commentaires trouvé"></custom-button>
  </div>
</template>

<script>
import auth from '../auth'
import api from '../../config/api.js'

const Review = {
  template: `
    <div class="media">
      <img :src="review.userPic" onerror="this.style.display='none'" class="d-flex rounded mr-2 mb-2" height="50" width="50" alt="profile picture">
      <div class="media-body">
        <div class="d-flex justify-content-start">
          <strong  class="mr-2">{{review.username}}</strong>
          <span v-for="id in 5">
            <i v-if="id > review.rate" class="fa fa-star-o fa-lg star" aria-hidden="true"></i>
            <i v-else class="fa fa-star fa-lg star" aria-hidden="true"></i>
          </span>
          <small class="ml-auto">{{formatedDate}}</small>
        </div>
        <p>{{review.review}}</p>
        <custom-button v-if="showDeleteButton" ref="deleteReviewsButton" @click="deleteReview" text="Supprimer" pendingText="Supprime" successText="Supprimé" customClass="btn btn-danger float-xs-right morph"></custom-button>
        <custom-button v-if="showUndoButton" ref="undoButton" @click="setReview" text="Récupérer" pendingText="Récupère" successText="Récupéré"></custom-button>
      </div>
    </div>`,
  props: ['review'],
  data () {
    return {
      showDeleteButton: auth.isAdmin(),
      showUndoButton: false
    }
  },
  computed: {
    formatedDate: function () {
      let date = new Date(parseInt(this.review.createdAt, 10))
      return date.toLocaleDateString()
    }
  },
  methods: {
    deleteReview: function () {
      this.$http.delete(`${api.reviews}/${this.review.period}@${this.review.createdAt}`,
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
      .then((response) => {
        this.$refs.deleteReviewsButton.showSuccess()
        this.showDeleteButton = false
        this.showUndoButton = true
      }, (response) => {
        this.$refs.deleteReviewsButton.showError()
      })
    },
    setReview: function () {
      this.$http.post(`${api.reviews}`,  {
        'userId': this.review.userId,
        'review': this.review.review,
        'username': this.review.username,
        'userPic': this.review.userPic,
        'createdAt': this.review.createdAt,
        'period': this.review.period,
        'rate': this.review.rate
        },
        {headers: {Authorization: `Bearer ${auth.getToken()}`}}).then((response) => {
        this.$refs.undoButton.showSuccess()
        this.showUndoButton = false
        this.showDeleteButton = true
      }, (response) => {
        this.$refs.undoButton.showError()
      })
    }
  }
}
export default {
  data () {
    return {
      reviews: [],
      newReview: '',
      showMorePage: true,
      reviewsPeriod: new Date().getFullYear(),
      rate: 0
    }
  },
  mounted () {
    this.$http.get(`${api.reviews}/${this.reviewsPeriod}`)
    .then((response) => {
      this.reviews = this.reviews.concat(response.body.data.Items)
      this.reviewsPeriod--
      this.getReviews()
    }, (response) => {
      this.showMorePage = false
    })
  },
  components: {
    'review': Review
  },
  methods: {
    getReviews: function () {
      this.$http.get(`${api.reviews}/${this.reviewsPeriod}`)
      .then((response) => {
        this.reviews = this.reviews.concat(response.body.data.Items)
        this.reviewsPeriod--
        this.$refs.getMoreReviewsButton.showSuccess()
        if (this.reviewsPeriod < 2016) this.showMorePage = false
      }, (response) => {
        this.$refs.getMoreReviewsButton.showError()
        this.showMorePage = false
      })
    },
    sendReview: function () {
      if (!auth.isAuthenticated()) {
        this.$refs.sendReviewButton.showError(`Vous devez vous connecter pour donner votre avis.`)
        auth.login()
        return
      }
      const isReviewValid = this.$refs.review.isValid(this.newReview)
      if (!isReviewValid) {
        this.$refs.sendReviewButton.showError('Veuillez remplir tous les champs.')
        return
      }
      if (this.rate === 0) {
        this.$refs.sendReviewButton.showError('Veuillez donner une note.')
        return
      }
      const profile = auth.getProfile()
      this.$http.post(`${api.reviews}`,
        {'userId': profile.user_id,
        'review': this.newReview,
        'username': profile.given_name,
        'userPic': profile.picture,
        'createdAt': Date.now().toString(),
        'period': new Date().getFullYear().toString(),
        'rate': this.rate},
        {headers: {Authorization: `Bearer ${auth.getToken()}`}})
        .then((response) => {
          this.$refs.sendReviewButton.showSuccess()
          this.reviews.unshift(
            {'userId': profile.user_id,
            'review': this.newReview,
            'username': profile.given_name,
            'userPic': profile.picture,
            'createdAt': Date.now().toString(),
            'period': new Date().getFullYear().toString(),
            'rate': this.rate
          })
          this.newReview = ''
        }, (response) => {
          this.$refs.sendReviewButton.showError(`Le commentaire n'a pas pu être envoyé.`)
        })
      },
      rating: function (rate) {
        this.rate = rate
      }
    }
  }
  </script>

<style scoped>
</style>
