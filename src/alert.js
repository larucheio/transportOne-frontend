export default {
  show (id) {
    $(id).alert().fadeTo(2000, 500).slideUp(500, function () {})
  },
  hideAll () {
    $('[role="alert"]').hide()
  }
}