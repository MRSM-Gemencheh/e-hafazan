<script setup>
import Navbar from '../../components/Navbar.vue'


</script>

<template>
  <Navbar />

  <div class="block">

  </div>
  <header>
    <div class="container">
      <div class="notification is-primary">
        <p class="subtitle">
          Selamat datang ke sistem e-hafazan pelajar MRSM Gemencheh Ulul Albab! <br><br>Sila log masuk untuk mengemaskini
          sebarang rekod tasmik.
        </p>
      </div>

      <div class="columns">
        <div class="column">
          <a href="./ramalan.html">
            <button class="button">Ramalan Tasmik</button>
          </a>
        </div>
        <div class="column">
          <a href="./tasmik.html">
            <button class="button">Rekod Tasmik</button>
          </a>
        </div>
        <div class="column">
          <a href="murajaah.html">
            <button class="button">Rekod Murajaah</button>
          </a>
        </div>
        <div class="column">
          <a href="statistik.html">
            <button class="button">Statistik Keseluruhan</button>
          </a>
        </div>
      </div>

    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
