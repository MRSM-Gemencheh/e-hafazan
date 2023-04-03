<script setup>
import Navbar from '../../components/Navbar.vue'
import WorkInProgress from '../../components/WorkInProgress.vue';
import Footer from '../../components/Footer.vue'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const provider = new GoogleAuthProvider();
const auth = getAuth();

function LogMasuk() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
</script>

<template>
  <Navbar />

  <div class="block"></div>

  <div class="notification is-warning">
  <button class="delete"></button>
    <strong>Perhatian!</strong> Anda perlu log masuk sebelum mengubah sebarang rekod tasmik atau murajaah.
  </div>

  <div class="container">

    <h1 class="title is-4">Log Masuk Guru Hafazan</h1>
      <form class="box">

      <div class="field">
        <label class="label">E-mel Pengguna</label>
        <div class="control">
          <input class="input" type="email" placeholder="e-mel-anda@domain.com">
        </div>
      </div>
    
      <div class="field">
        <label class="label">Kata Laluan</label>
        <div class="control">
          <input class="input" type="password" placeholder="********">
        </div>
      </div>
    
      <button class="button is-primary m-5" onclick="LogMasuk()">Log Masuk dengan Google</button> <button class="button m-5">Lupa Kata Laluan</button>
    </form>
  </div>

  <div class="block"></div>
  
<Footer />

</template>

<style scoped>

</style>
