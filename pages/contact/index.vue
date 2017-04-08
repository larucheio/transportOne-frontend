<template>
  <section>
    <div class="jumbotron jumbotron-fluid">
      <div class="container rounded">
        <div class="row">
          <div class="col-sm-6 text-sm-right">
            <img src="~assets/logo.svg" alt="Transport One" width="200" itemprop="image" class="mb-4">
          </div>
          <div class="col-sm-6">
            <div itemscope itemtype="http://schema.org/LocalBusiness">
              <div itemprop="name"><strong class="text-uppercase">Transport One</strong></div>
              <address itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <span itemprop="streetAddress">15 chemin de vers</span><br>
                <span itemprop="postalCode">1228</span>, <span itemprop="addressLocality">Plan-les-Ouates</span><br>
                <span itemprop="addressRegion">Genève</span>, <span itemprop="addressCountry">Suisse</span>
              </address>
              <p>
                <span itemprop="founders" itemscope itemtype="https://schema.org/Person">
                  <span itemprop="givenName">Bernadette </span><span itemprop="familyName">LANGEL</span>
                </span> & <br>
                <span itemprop="founders" itemscope itemtype="https://schema.org/Person">
                  <span itemprop="givenName">Timothy Taylor </span><span itemprop="familyName">LANGEL</span>
                </span>
              </p>
              <p>
                <a href="tel:+41799002828" itemprop="telephone" content="+41799002828">+41 (0) 79 900 28 28</a><br>
                <a href="mailto:info@transportone.ch" itemprop="email" content="info@transportone.ch">info@transportone.ch</a>
              </p>
              <p>
                Horaires:<br>
                <span itemprop="openingHours" content="Mo,Tu,We,Th,Fr,Sa,Su 06:00-19:00">Du lundi au dimanche, de 6h à 19h</span>
              </p>
              <span class="d-none" itemprop="priceRange">$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jumbotron {
  background-image: url('~assets/img/contact/jumbotron.jpg');
  background-size: cover;
}

.jumbotron .container {
  background-color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 64px;
}
</style>
