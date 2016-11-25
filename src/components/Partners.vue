<template>
  <div>
    <div class="card card-block">
      <custom-input ref="review" label="Donner votre avis sur Transport One." type="text" v-model="newReview" placeholder="Mon avis..." min="1" max="2000" rows="5"></custom-input>
      <custom-button ref="sendReviewButton" @click="sendReview" text="Envoyer" pendingText="Envoi" successText="Envoyé"></custom-button>
    </div>
    <review v-for="review in reviews" v-bind:review="review"></review>
    <custom-button v-if="showMorePage" ref="getMoreReviewsButton" @click="getMoreReviews" text="Plus de commentaires" pendingText="Recherche des commentaires" successText="Commentaires trouvé"></custom-button>
  </div>
</template>

<script>
import auth from '../auth'
import api from '../../config/api.js'

const Review = {
  template: `<div class="card card-block">
    <div class="media">
      <div class="media-left">
        <img :src="review.userPic" onerror="this.style.display='none'" class="rounded" style="margin-right:10px; margin-bottom:10px;">
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{review.username}}</h4>
        <p>{{review.review}}</p>
        <footer class="blockquote-footer">{{formatedDate}}</cite></footer>
      </div>
    </div>
  </div>`,
  props: ['review'],
  computed: {
    formatedDate: function () {
      let date = new Date(this.review.createdAt)
      return date.toLocaleString()
    }
  }
}
export default {
  data () {
    return {
      reviews: null,
      newReview: '',
      showMorePage: false
    }
  },
  beforeCreate () {
    this.$http.get(`${api.reviews}`)
    .then((response) => {
      this.reviews = response.body.data.Items
      if (this.reviews.length > 0 && this.reviews[this.reviews.length-1].page > 0) {
        this.showMorePage = true
        this.getMoreReviews()
      }
    }, (response) => {})
  },
  components: {
    'review': Review
  },
  methods: {
    getMoreReviews: function () {
      const page = this.reviews[this.reviews.length-1].page-1
      if (page >= 0) {
        this.$http.get(`${api.reviews}?page=${page}`)
        .then((response) => {
          this.$refs.getMoreReviewsButton.showSuccess()
          this.reviews = this.reviews.concat(response.body.data.Items)
          if (this.reviews[this.reviews.length-1].page === 0) this.showMorePage = false
        }, (response) => {
          this.$refs.getMoreReviewsButton.showError()
        })
      }
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
        'userPic': profile.picture})
        .then((response) => {
          this.$refs.sendReviewButton.showSuccess()
          this.reviews.unshift(
            {'userId': profile.user_id,
            'review': this.newReview,
            'username': profile.given_name,
            'userPic': profile.picture,
            'createdAt': new Date()
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
