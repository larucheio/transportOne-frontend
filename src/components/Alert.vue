<template>
  <transition :name="transition">
    <div :class="position" v-if="show">
      <div :class="style" role="alert">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      position: 'center',
      style: 'alert alert-danger',
      transition: 'fadeOut',
      show: false
    }
  },
  methods: {
    showError () {
      this.position = 'center'
      this.style = 'alert alert-danger'
      this.transition = 'fadeOut'
      this.show = true
      setTimeout(() => {this.show = false}, 3000);
    },
    showSuccess () {
      this.position = 'bottom'
      this.style = 'alert alert-success'
      this.transition = 'slideOut'
      this.show = true
      setTimeout(() => {this.show = false}, 3000);
    }
  }
}
</script>

<style scoped>
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 250px;
  z-index: 10;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 50%;
  min-width: 250px;
  z-index: 10;
}
.alert {
  position:relative;
  left:-50%;
  margin: 0;
}

.fadeOut-leave-active {
  transition: opacity 1.0s ease;
  opacity: 0;
}
.slideOut-leave-active {
  transition: all 1.0s;
  -webkit-transform: translate(0px, 100%);
  transform: translate(0px, 100%);
}
</style>
