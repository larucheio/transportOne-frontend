<template>
  <div>
    <div class="media">
      <img :src="review.userPic" onerror="this.style.display='none'" class="d-flex rounded mr-2 mb-2" height="50" width="50" alt="profile picture">
      <div class="media-body">
        <div class="d-flex justify-content-start">
          <strong  class="mr-2">{{review.username}}</strong>
          <el-rate v-model="review.rate" disabled></el-rate>
          <small class="ml-auto">{{formatedDate}}</small>
        </div>
        <p>{{review.review}}</p>
        <!-- <custom-button v-if="showDeleteButton" ref="deleteReviewsButton" @click="deleteReview" text="Supprimer" pendingText="Supprime" successText="Supprimé" customClass="btn btn-danger float-xs-right morph"></custom-button>
        <custom-button v-if="showUndoButton" ref="undoButton" @click="setReview" text="Récupérer" pendingText="Récupère" successText="Récupéré"></custom-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'review'
  ],
  computed: {
    formatedDate: function () {
      let date = new Date(parseInt(this.review.createdAt, 10))
      return date.toLocaleDateString()
    }
  }
}
</script>
