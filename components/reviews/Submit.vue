<template>
  <form @submit.prevent="createReview">
    <div class="form-group">
      <el-rate
        v-model="rate"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>
    <div class="form-group">
      <textarea v-model="review" name="review" id="review" rows="8" cols="80" class="form-control" placeholder="Votre avis..."></textarea>
    </div>
    <button type="submit" name="submit review" class="btn btn-primary">Envoyer votre avis</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '~components/apiroutes.js'

export default {
  data: () => ({
    rate: 0,
    review: ''
  }),
  methods: {
    createReview: function () {
      const profile = JSON.parse(localStorage.getItem('user'))
      const username = profile.name ? profile.name : profile.given_name

      axios({
        method: 'POST',
        url: `${api.reviews}`,
        data: {
          'userId': profile.user_id,
          'review': this.review,
          'rate': this.rate,
          'createdAt': Date.now().toString(),
          'period': new Date().getFullYear().toString(),
          'username': username,
          'userPic': profile.picture
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        this.rate = 0
        this.review = ''
        this.$emit('updateReviewsList')
      })
      .catch((res) => {
        // TODO
      })
    }
  }
}
</script>
