<template>
    <div class="welcome">
      <h1>Welcome! to FitTrack</h1>
      <h1>We’re excited to have you on board. Let's get started!</h1>
      <button @click="gotoheightweight">Continue</button>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      userId() {
        return this.$store.state.auth?.user_id; 
      }
    },
    methods: {
        gotoheightweight() {
        
          this.$router.push("/hw");
       
      }
    }
  }
  </script>
  
  <style scoped>
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: rgb(161, 161, 161);
      background: linear-gradient(135deg, #181818, #232326, #030303);



  }
  
  button {
    background-color: rgb(85, 255, 0);
    color: rgb(0, 0, 0);
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 25px;
  }
  </style>
  