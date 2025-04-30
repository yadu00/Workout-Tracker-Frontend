<template>
    <div class="welcome-container">
      <h1>Welcome!</h1>
      <h1>We’re excited to have you on board. Let's get started!</h1>
      <button @click="gotoheightweight">Continue</button>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      userId() {
        return this.$store.state.auth?.user_id; // Access user_id from Vuex store
      }
    },
    methods: {
        gotoheightweight() {
        
          this.$router.push("/hw");
       
      }
    }
  }
  </script>
  
  <style>
  .welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: rgb(0, 0, 0);

  }
  
  button {
    background-color: rgb(0, 0, 0);
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 25px;
  }
  </style>
  