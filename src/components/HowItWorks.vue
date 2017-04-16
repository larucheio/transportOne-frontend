<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 py-2">
        <img class="mx-auto d-block img-fluid" src="../assets/screenshot-reservation.jpg" alt="reservation">
      </div>
      <div class="col-md-6 py-2">
        <h2 class="text-uppercase">Réserver sur notre site, via notre application ou par téléphone</h2>
        <ul>
          <li>Sélectionner « Aller simple »/« Aller-retour »</li>
          <li>Sélectionner parmi les communes disponibles votre lieu de départ et votre destination (l’adresse vous sera demandée ultérieurement).</li>
          <li>Sélectionner la date et l’heure à laquelle vous désirez que notre chauffeur soit à votre disposition</li>
          <li>Remplissez le formulaire de réservation avec votre prénom, nom, téléphone, email(si disponible) ainsi que l’adresse de départ et d’arrivée.</li>
        </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 py-2">
        <img class="pb-3 mx-auto d-block hidden-md-up img-fluid" src="../assets/screenshot-options.jpg" alt="options">
        <h2 class="text-uppercase">Votre course</h2>
        <p>Transport One met à disposition les services suivants, sélectionner les au besoin.</p>
        <ul>
          <li><strong>Attente <i class="fa fa-pause-circle-o mx-1" aria-hidden="true"></i></strong> : <p>Notre chauffeur reste à votre disposition et vous attend (rendez-vous personnel, médecin...) (10.-CHF/30 min).</p></li>
          <li><strong>Commision <i class="fa fa-shopping-basket mx-1" aria-hidden="true"></strong> : <p>Notre chauffeur vient vous chercher au domicile et vous accompagne pour vos achats (magasin alimentaire, marché local, magasin de meuble...). De plus, nous vous raccompagnons à domicile et vous aidons à déposer les commissions effectuées chez vous. (15.-CHF/30 min)</p></li>
          <li><strong>Groupe <i class="fa fa-users mx-1" aria-hidden="true"></strong> : <p>Si vous êtes plus de 8 personnes</p></li>
        </ul>
        <p>« <strong>Commentaire</strong> », Merci de nous faire part des éventuelles informations supplémentaires, entre autres si la personne est en fauteuil roulant ou par exemple si nous devons monter chercher la personne à son domicile.</p>
        <p>D’autres détails tels que « Code d’entrée » ou « appeler le client une fois que nous sommes là » peuvent être aussi annotés.</p>
      </div>
      <div class="col-md-6 py-2 hidden-sm-down">
        <img class="mx-auto d-block img-fluid" src="../assets/screenshot-options.jpg" alt="options">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 py-2">
        <img class="mx-auto d-block img-fluid" src="../assets/screenshot-map.jpg" alt="map">
      </div>
      <div class="col-md-6 py-2">
        <h2 class="text-uppercase">Réservation</h2>
        <p>Le détail et le prix de la course s’affichent automatiquement. II ne vous reste donc plus qu'à cliquer sur « <strong>Réserver</strong> ».</p>
        <p><strong>Annulation gratuite</strong> : Vous disposez d'une annulation gratuite avec un préavis de 24 heures. <a href="/contact" >Contactez-nous</a> par téléphone ou par email.</p>
        <p>Nous vous invitons à cocher la case « <strong>Recevoir des offres par email</strong> » afin d’être averti de toutes nouveautés et modifications !</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 py-2">
        <img class="pb-3 mx-auto d-block hidden-md-up img-fluid" src="../assets/screenshot-login.jpg" alt="login">
        <h2 class="text-uppercase">Évaluez votre course</h2>
        <p>Une fois votre course terminée, n’hésitez pas à nous donner votre avis. Pour ce faire, connectez-vous avec votre compte <strong>Facebook/Gmail</strong> ou créez tout simplement un compte Transport One et laissé votre avis sur la page <a href="/partenaires">Paternaires &amp; avis</a>.</p>
        <p>Il vous suffit de noter et de laisser un commentaire sur la prestation et la qualité de notre service.</p>
        <p>Vous pouvez également évaluer votre course en laissant un avis sur notre page <strong>Facebook</strong>.</p>
      </div>
      <div class="col-md-6 py-2 hidden-sm-down">
        <img class="mx-auto d-block img-fluid" src="../assets/screenshot-login.jpg" alt="login">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: {
      inner: 'Comment ça marche? - Transport One'
    },
    meta: [
      { name: 'description', content: 'Découvrez comment utiliser notre site internet pour réserver une course en moins de deux minutes.', id: 'description' }
    ]
  }
}
</script>
