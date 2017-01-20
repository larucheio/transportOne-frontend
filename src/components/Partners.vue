<template>
  <div>
    <div class="section">
      <p>Donner votre avis sur Transport One.</p>
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
      <div class="media-left">
        <img :src="review.userPic" onerror="this.style.display='none'" class="rounded" style="margin-right:10px; margin-bottom:10px;">
      </div>
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
      this.$http.delete(`${api.reviews}/${this.review.period}@${this.review.createdAt}`)
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
      }).then((response) => {
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
        'rate': this.rate})
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
