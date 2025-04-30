<template>
    <div class="container">
      <h1>Your Account is not Approved by admin.</h1>
      <button id="logout" @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['gettrainer_id']),  // Map the getter directly
  },
  methods: {
  logout() {
    this.$store.commit('logout');         // Reset Vuex state + sessionStorage
    this.$router.push('/Trainerlogin');          // Redirect to login page
  }
}
}
</script>
  
  <style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
  }
  #logout {
    width: 150px;
    height: 30px;
    border-radius: 5px;
    background-color: red;
    color: white;
  }
  </style>
  