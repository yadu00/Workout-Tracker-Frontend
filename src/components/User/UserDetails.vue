<template>
  <div class="container">
    <h1>You are all set</h1>
    <button @click="goToDashboard">Continue</button>
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
      goToDashboard() {
        if (this.userId) {
          const userKey = `firstLogin_${this.userId}`; // Use user_id for the key
          localStorage.setItem(userKey, "false");
          this.$router.push("/userHome");
        } else {
          console.error("User ID is not defined.");
          this.$router.push("/userlogin"); // Optionally redirect to login
        }
      }
    }
  }
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  button {
    width: 200px;
    height: 50px;
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