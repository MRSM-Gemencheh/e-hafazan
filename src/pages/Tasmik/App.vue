<script setup>
import Navbar from '../../components/Navbar.vue'
import RecordsTable from './TasmikRecordsTable.vue'
import CurrenRecordsTable from './CurrentRecordsTable.vue'
import Footer from '../../components/Footer.vue'
import LogMasukBerjaya from '../../components/LogMasukBerjaya.vue'
let loginState = false

</script>

<template>
  <Navbar />
  <LogMasukBerjaya />

  <section class="hero is-link is-small">

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">

      <div class="container has-text-centered">
        <center>
          <figure class="image is-128x128">
            <img class="is-rounded" src="/128x128.png">
          </figure><br>
        </center>
        <p class="title is-4">
          Selamat Datang, <strong class="has-text-warning">Puan Hanis bt Md Sudi</strong>
        </p>
        <p class="subtitle">
          Guru Tasmik Halaqah Tingkatan 2 2023
        </p>
      </div>
    </div>

  </section>

  <div class="block">

  </div>


  <div class="content">
    <div class="box has-background-warning">
      <h1 class="title is-4 m-5">Keputusan Hafazan Terkini</h1>
      <CurrenRecordsTable />
    </div>

  </div>
  
  <div class="content">
    <div class="box">

      <p class="subtitle m-5">Paparkan rekod tasmik bagi bulan:
      <div class="select m-5">
        <select>
          <option>Januari</option>
          <option>Februari</option>
          <option>Mac</option>
          <option>April</option>
          <option>Mei</option>
          <option>Jun</option>
          <option>Julai</option>
          <option>Ogos</option>
          <option>September</option>
          <option>Oktober</option>
          <option>November</option>
          <option>Disember</option>
        </select>
      </div>
      </p>
    </div>
  </div>

  <div class="content">
    <div class="box has-background-warning">
      <h1 class="title is-4 m-5">Keputusan Hafazan Bulan Januari 2023 (Tingkatan 1)</h1>
      <RecordsTable />
    </div>
  </div>

  <center>
    <div class="content">
      <div class="button m-5 is-primary">Cetak Laporan Bulanan</div>
      <div class="button m-5 is-link">Hantar Laporan ke E-mel Penjaga</div>
  
    </div>

  </center>


  <Footer />


</template>

<style scoped></style>
