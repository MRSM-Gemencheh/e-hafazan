<script setup>
import Navbar from '../../components/Navbar.vue'
import MainHero from './MainHero.vue';
import Footer from '../../components/Footer.vue'
import WorkInProgress from '../../components/WorkInProgress.vue';
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI9SWPd1lxcxGff2NhulPF1pfC9aA8a3I",
  authDomain: "e-hafazan-gmc.firebaseapp.com",
  projectId: "e-hafazan-gmc",
  storageBucket: "e-hafazan-gmc.appspot.com",
  messagingSenderId: "805093423672",
  appId: "1:805093423672:web:e3f7f375eb3e6e4f8b84cd"
};

const app = initializeApp(firebaseConfig);


</script>

<template>
  <Navbar />

  <MainHero />
  <div class="block">

  </div>
  <header>
    <div class="container">

      <div class="box">

        <p class="subtitle">
          Selamat datang ke sistem E-hafazan pelajar MRSM Gemencheh Ulul Albab! <br><br>Sebarang proses penukaran rekod
          tasmik atau murajaah pelajar memerlukan anda untuk log masuk.
        </p>
      </div>

      <center>

        <a href="./ramalan.html">
          <button class="button is-primary m-5">Ramalan Tasmik</button>
        </a>
  
        <a href="./tasmik.html">
          <button class="button is-primary m-5">Rekod Tasmik</button>
        </a>
        <a href="murajaah.html">
          <button class="button is-warning m-5">Rekod Murajaah</button>
        </a>
        <a href="statistik.html">
          <button class="button is-warning m-5">Statistik Keseluruhan</button>
        </a>
      </center>

    </div>
  </header>

  <div class="block"></div>
  <Footer />
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
