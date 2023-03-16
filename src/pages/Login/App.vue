<script setup>
import Navbar from '../../components/Navbar.vue'
import WorkInProgress from '../../components/WorkInProgress.vue';
</script>

<template>
  <Navbar />

  <div class="block"></div>

  <div class="container">

    <h1 class="title is-4">Log Masuk Guru Hafazan</h1>
      <form class="box">

      <div class="field">
        <label class="label">No. Gaji / Nama Pengguna</label>
        <div class="control">
          <input class="input" type="email" placeholder="000000">
        </div>
      </div>
    
      <div class="field">
        <label class="label">Kata Laluan</label>
        <div class="control">
          <input class="input" type="password" placeholder="********">
        </div>
      </div>
    
      <button class="button is-primary">Log Masuk</button>
    </form>
  </div>
  


</template>

<style scoped>

</style>
