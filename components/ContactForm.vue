<template>
  <form>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="lastName">Nom</label>
        <input type="text" class="form-control" id="lastName">
      </div>
      <div class="form-group col-md-6">
        <label for="firstName">Prénom</label>
        <input type="text" class="form-control" id="firstName">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="tel">Téléphone</label>
        <input type="tel" class="form-control" id="tel">
      </div>
      <div class="form-group col-md-6">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-12">
        <label for="message">Votre message</label>
        <textarea class="form-control" id="message" rows="8"></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Envoyer votre message</button>
  </form>
</template>

<script>
export default {}
</script>
