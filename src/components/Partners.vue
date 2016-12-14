<template>
  <div>
    <div class="section">
      <custom-input ref="review" label="Donner votre avis sur Transport One." type="text" v-model="newReview" placeholder="Mon avis..." min="1" max="2000" rows="5"></custom-input>
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
        <strong>{{review.username}}</strong><small class="float-xs-right">{{formatedDate}}</small>
        <p>{{review.review}}</p>
      </div>
    </div>`,
  props: ['review'],
  computed: {
    formatedDate: function () {
      let date = new Date(parseInt(this.review.createdAt, 10))
      return date.toLocaleDateString()
    }
  }
}
export default {
  data () {
    return {
      reviews: [],
      newReview: '',
      showMorePage: true,
      reviewsPeriod: new Date().getFullYear()
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
      const profile = auth.getProfile()
      this.$http.post(`${api.reviews}`,
        {'userId': profile.user_id,
        'review': this.newReview,
        'username': profile.given_name,
        'userPic': profile.picture,
        'createdAt': Date.now().toString(),
        'period': new Date().getFullYear().toString()})
        .then((response) => {
          this.$refs.sendReviewButton.showSuccess()
          this.reviews.unshift(
            {'userId': profile.user_id,
            'review': this.newReview,
            'username': profile.given_name,
            'userPic': profile.picture,
            'createdAt': Date.now().toString(),
            'period': new Date().getFullYear().toString()
          })
          this.newReview = ''
        }, (response) => {
          this.$refs.sendReviewButton.showError(`Le commentaire n'a pas pu être envoyé.`)
        })
      }
    }
  }
  </script>

<style scoped>
</style>
