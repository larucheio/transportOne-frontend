<template>
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
  </div>
</template>

<script>
import auth from '../auth'
import api from '../../config/api.js'

export default {
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
</script>
