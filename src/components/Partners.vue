<template>
  <div>
    <div class="card card-block">
      <h5 class="card-title">Commentaire</h5>
      <textarea class="form-control" v-model="newReview" style="margin-bottom:10px;"></textarea>
      <button class="btn btn-primary" @click="sendReview">Envoyer</button>
    </div>
    <div id="success-alert" class="alert alert-success" role="alert">
      <i class="fa fa-check" aria-hidden="true"></i> Envoyé!
    </div>
    <div id="error-alert" class="alert alert-danger" role="alert">
      <i class="fa fa-times" aria-hidden="true"></i> {{error}}
    </div>
    <review v-for="review in reviews" v-bind:review="review"></review>
    <button class="btn btn-primary" @click="getMoreReviews" v-show="showMorePage">Plus de commentaires</button>
  </div>
</template>

<script>
import auth from '../auth'
import alert from '../alert'

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
      error: null,
      showMorePage: false
    }
  },
  beforeCreate () {
    this.$http.get(`${process.env.AWS_API_ROOT}reviews`)
    .then((response) => {
      this.reviews = response.body.data.Items
      if (this.reviews.length > 0 && this.reviews[this.reviews.length-1].page > 0) {
        this.showMorePage = true
        this.getMoreReviews()
      }
    }, (response) => {})
  },
  mounted: function () {
    alert.hideAll()
  },
  components: {
    'review': Review
  },
  methods: {
    getMoreReviews: function () {
      const page = this.reviews[this.reviews.length-1].page-1
      if (page >= 0) {
        this.$http.get(`${process.env.AWS_API_ROOT}reviews?page=${page}`)
        .then((response) => {
          this.reviews = this.reviews.concat(response.body.data.Items)
          if (this.reviews[this.reviews.length-1].page === 0) this.showMorePage = false
        }, (response) => {})
      }
    },
    sendReview: function () {
      if (!auth.isAuthenticated()) {
        this.error = `Veuillez vous connecter pour envoyer un commentaire`
        alert.show('#error-alert')
        return
      }
      if (this.newReview.length < 100 || this.newReview.length > 1000) {
        this.error = `Veuillez vous écrire au moins 100 caractères et au plus 1000 caractères`
        alert.show('#error-alert')
        return
      }
      const profile = auth.getProfile()
      this.$http.post(`${process.env.AWS_API_ROOT}reviews`,
        {'userId': profile.user_id,
        'review': this.newReview,
        'username': profile.given_name,
        'userPic': profile.picture})
        .then((response) => {
          this.reviews.unshift(
            {'userId': profile.user_id,
            'review': this.newReview,
            'username': profile.given_name,
            'userPic': profile.picture})
          this.newReview = ''
          alert.show('#success-alert')
        }, (response) => {
          this.error = `Le commentaire n'a pas pu être envoyé.`
          alert.show('#error-alert')
        })
      }
    }
  }
  </script>

<style scoped>
</style>
