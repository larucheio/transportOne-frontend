<template>
  <div :class="componentClass">
    <div v-if="hasError" class="text-danger">{{errorText}}</div>
    <button @click="clicked" :class="buttonClass">{{buttonText}} <i :class="icon"></i></button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Bouton'
    },
    error: {
      type: String,
      default: 'Erreur'
    },
    pendingText: {
      type: String,
      default: 'En cours'
    },
    successText: {
      type: String,
      default: 'Réussit'
    },
    componentClass: {
      type: String,
      default: 'float-xs-right'
    },
    customClass: {
      type: String,
      default: 'btn btn-primary float-xs-right morph'
    }
  },
  data () {
    return {
      hasError: false,
      icon: null,
      isPending: false,
      buttonText: this.text,
      errorText: this.error,
      buttonClass: this.customClass
    }
  },
  methods: {
    showPending () {
      this.hasError = false
      this.isPending = true
      this.icon = 'fa fa-spinner fa-pulse fa-fw'
      this.buttonText = this.pendingText
      this.errorText = this.error
      setTimeout(() => {
        if (this.isPending) this.showError('Pas de réponse, veuillez vérifier votre connexion.')
      }, 10000);
    },
    showSuccess () {
      this.isPending = false
      this.icon = 'fa fa-check'
      this.buttonText = this.successText
      this.buttonClass += ' btn-success'
      setTimeout(() => {
        this.icon = null
        this.buttonText = this.text
        this.buttonClass = this.customClass
      }, 2000);
    },
    showError (errorMessage) {
      if (errorMessage) this.errorText = errorMessage
      else this.errorText = this.error
      this.isPending = false
      this.hasError = true
      this.icon = 'fa fa-times'
      this.buttonText = 'Erreur'
      this.buttonClass += ' btn-danger'
      setTimeout(() => {
        this.icon = null
        this.buttonText = this.text
        this.buttonClass = this.customClass
      }, 2000);
    },
    clicked () {
      if (!this.isPending) {
        this.showPending()
        this.$emit('click')
      }
    }
  }
}
</script>
