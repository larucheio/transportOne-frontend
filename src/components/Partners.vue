<template>
  <div>
    <div class="card card-block" v-if="isAuthenticated">
      <h5 class="card-title">Commentaire</h5>
      <textarea class="form-control" v-model="newReview" style="margin-bottom:10px;"></textarea>
      <button class="btn btn-primary" @click="sendReview">Envoyer</button>
    </div>
    <review v-for="review in reviews" v-bind:review="review"></review>
    <button class="btn btn-primary" @click="getMoreReviews" v-show="showMorePage">Plus de commentaires</button>
    <alert ref="alert">{{alertMessage}}</alert>
  </div>
</template>

<script>
import auth from '../auth'
import Alert from './Alert.vue'
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
      alertMessage: '',
      showMorePage: false,
      isAuthenticated: auth.isAuthenticated()
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
    'review': Review,
    'alert': Alert
  },
  methods: {
    getMoreReviews: function () {
      const page = this.reviews[this.reviews.length-1].page-1
      if (page >= 0) {
        this.$http.get(`${api.reviews}?page=${page}`)
        .then((response) => {
          this.reviews = this.reviews.concat(response.body.data.Items)
          if (this.reviews[this.reviews.length-1].page === 0) this.showMorePage = false
        }, (response) => {})
      }
    },
    sendReview: function () {
      if (this.newReview.length < 100 || this.newReview.length > 1000) {
        this.alertMessage = `Veuillez vous écrire au moins 100 caractères et au plus 1000 caractères`
        this.$refs.alert.showError()
        return
      }
      const profile = auth.getProfile()
      this.$http.post(`${api.reviews}`,
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
        }, (response) => {
          this.alertMessage = `Le commentaire n'a pas pu être envoyé.`
          this.$refs.alert.showError()
        })
      }
    }
  }
  </script>

<style scoped>
</style>
