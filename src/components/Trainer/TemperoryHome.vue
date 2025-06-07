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
    ...mapGetters(['gettrainer_id']),  
  },
  methods: {
  logout() {
    this.$store.commit('logout');         
    this.$router.push('/Trainerlogin');         
  }
}
}
</script>
  
  <style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
color: rgb(161, 161, 161);
      background: linear-gradient(135deg, #181818, #232326, #030303);  }
  #logout {
    width: 150px;
    height: 30px;
    border-radius: 5px;
    background-color: red;
    color: white;
  }
  </style>
  