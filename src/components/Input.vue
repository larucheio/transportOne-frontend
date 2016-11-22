<template>
  <div :class="formGroup">
    <label v-if="label">{{label}}</label>
    <textarea v-if="rows" class="form-control" :rows="rows" @input="isValid($event.target.value)" :placeholder="placeholder"></textarea>
    <input v-else :type="type" class="form-control" :value="value" @input="isValid($event.target.value)" :placeholder="placeholder">
    <div v-if="hasError" class="form-control-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: null,
    type: null,
    value: null,
    errorMessage: {
      type: String,
      default: 'Error'
    },
    placeholder: null,
    validation: {
      type: Function,
      default: function () {return true}
    },
    rows: null,
    min: {default: 0},
    max: {default: 100},
    regexp: null
  },
  data () {
    return {
      formGroup: 'form-group',
      hasError: false,
      error: '',
      regexpObject: null
    }
  },
    mounted () {
      this.regexpObject = new RegExp(this.regexp)
    },
  methods: {
    showError () {
      this.formGroup = 'form-group has-danger'
      this.hasError = true
    },
    hideError () {
      this.formGroup = 'form-group'
      this.hasError = false
    },
    isValid (value) {
      this.$emit('input', value)
      if (value.length < this.min) this.error = (this.min == 1) ? `Veuillez remplir le champ.` : `Veuillez entrer au moins ${this.min} caractères.`
      else if (value.length > this.max) this.error = `Veuillez entrer au maximum ${this.max} caractères.`
      else if ((this.regexpObject && !this.regexpObject.test(value)) && value.length > 0 || !this.validation(value)) this.error = this.errorMessage
      else {
        this.hideError()
        return true
      }
      this.showError()
      return false
    }
  }
}
</script>
