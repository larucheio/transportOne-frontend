<template>
  <div :class="componentClass">
    <div v-if="hasError" class="text-danger">{{error}}</div>
    <button @click="clicked" :class="customClass">{{text}} <i :class="icon"></i></button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    error: {
      type: String,
      default: 'Error'
    },
    componentClass: {
      type: String,
      default: 'float-xs-right'
    },
    customClass: {
      type: String,
      default: 'btn btn-primary float-xs-right'
    }
  },
  data () {
    return {
      hasError: false,
      icon: null,
    }
  },
  methods: {
    showPending () {
      this.hasError = false
      this.icon = 'fa fa-spinner fa-pulse fa-fw'
    },
    showSuccess () {
      this.icon = 'fa fa-check'
      setTimeout(() => {this.icon = null}, 2000);
    },
    showError () {
      this.hasError = true
      this.icon = 'fa fa-times'
      setTimeout(() => {this.icon = null}, 2000);
    },
    clicked () {
      this.$emit('click')
    }
  }
}
</script>
