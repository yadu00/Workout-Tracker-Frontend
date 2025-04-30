<template>
  <div class="box">
    <div class="loginbox">
      <h1>Login</h1>
      <label for="email">Email</label>
      <input v-model="email" class="inputs" type="text" placeholder="Enter your email">
      <label for="password">Password</label>
      <input v-model="password" class="inputs" type="password" placeholder="Enter your password">
      <div class="password" style="display: flex; justify-content: space-between; height: auto; width: 100%;">
        <div class="remebermediv" style="display: flex; width: 50%; align-items: center;
">
         <!-- <label for="Remember">Remember me</label>
          <input type="checkbox" style="width: 15px; height: 15px;"> -->
        </div>
        <router-link  class="router" to="/forgotpassword" style="  color: blue;">
          <label for="Forgotpassword">Forgot password? </label>
        </router-link>
      </div>
<div class="button" style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 20px;">
  <button class="btn" role="button" @click="login">Login</button>

<router-link class="router" to="/Trainersignup">
  <label style="text-align: center;">New User? Sign Up</label>
</router-link>
</div>
      
      



    </div>
  </div>


<!-- Snackbar -->
<v-snackbar
    v-model="snackbar"
    color="#adff2f"
    width="400px"
    height="80px"
    location="top"
  >
    Login Success

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        @click="snackbar = false"
        style="font-weight: 700"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  


</template>


<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,

    };
  },
  computed:{
      ...mapGetters(['gettrainer_id']),
      trainer_id(){
        return this.gettrainer_id;
      }
  },
  methods: {
    async login() {
  if (!this.email || !this.password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const payload = {
      email: this.email,
      password: this.password,
    };

    const responseData = await this.$store.dispatch('loginTrainer', payload);
    
    this.snackbar = true;
    
    // Wait briefly for state to update and snackbar to show
    setTimeout(() => {
      if (responseData.statusID === 1) {
        this.$router.push("/temp"); 
      } else {
        this.$router.push("/trainerHome"); 
      }
    }, 1000);
    
  } catch (error) {
    alert("Invalid credentials or error during login.");
    console.error("Login error:", error);
  }
}
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family:Arial, Helvetica, sans-serif;
}

.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #181818;
}

.loginbox {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 450px;
  padding: 40px;
  /* box-shadow: 2px 3px 35px 2px black; */
  background-color: #450a6d;  
  color: #ffffff;
  border-radius: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #cccccc;

  
}
label{
  color: #b7b7b7;
}

.inputs {
  width: 100%;
  padding: 10px 16px;
  color: rgb(243, 243, 243);
  font-size: 14px;
  background-color: #2c2c2c6a;
  border: 2px solid #d9ff0000;
  margin-bottom: 10px;
  border-radius: 4px;
  

}
.inputs:hover {
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: 2px solid #d9ff00;


}
.inputs::placeholder{
  color: #7b7b7b;
}
.inputs:focus{
  outline: none;
  border: 2px solid rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.4);
  color: #cecece;
}

.router{
  text-decoration: none;
  font-size: small;

}


.btn{
  height: 50px;
  width: 200px;
  border-radius: 25px;
  background-color: #fff200;
  margin: 25px;
  color: #000000;
  font-size: x-large;

}

</style>
