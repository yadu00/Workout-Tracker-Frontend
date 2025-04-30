<template>
 
  <div class="loginbody">
    
    <div class="box">
      <div class="container">
    Welcome to <br>FitTrack.
    <p>Your ultimate fitness companion for personalized training,<br> progress tracking, and expert guidance.</p>
  </div>
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
        <router-link to="/forgotpassword" style="  color: blue;text-decoration: none;">
          <label for="Forgotpassword">Forgot password? </label>
        </router-link>
      </div>
<div class="button" style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 20px;">
  <button class="btn" role="button" @click="login">Login</button>

<router-link to="/signup" class="router">
  <label  style="text-align: center;color: white;">New User? Sign Up</label>
</router-link>
</div>
      
      



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
        color="black"
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
      ...mapGetters(['getuser_id']),
      user_id(){
        return this.getuser_id;
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
    }

    const response = await this.$store.dispatch('loginUser',payload)

    if (response) {
      this.snackbar = true;// ✅ Use user-specific key
        const userKey = `firstLogin_${this.user_id}`;

        if (!localStorage.getItem(userKey)) {
          localStorage.setItem(userKey, "true"); // Mark as first login
          setTimeout(() => {
            this.$router.push("/welcome");
          }, 1000);
        } else {
          setTimeout(() => {
            this.$router.push(`/userHome?user=${this.user_id}`); 
            // Redirect after a delay
          }, 1000);
        }// Show snackbar on success
          
      
    } else {
      alert(response.message || "Invalid credentials.");
    }
  } catch (error) {
    alert("Error!! No Account Found");
    console.error(error);
  }
}

  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
* {
  padding: 0;
  margin: 0;
}
.loginbody{
  width: 100%;
  height: 100%;
}

.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  /* backdrop-filter: blur(1px); */
  background-color: #0f0081;

}
.box .container{
    width: 50%;
    height: 500px;
    background-color: #0f0081;
    font-size: 50px;
    font-family: "Audiowide", sans-serif;


}
.container p{
  font-size: 15px;
}

.loginbox {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  padding: 40px;
  /* box-shadow: 0px 1px 20px rgb(112, 255, 10); */
 /* box-shadow: rgb(255, 0, 0) 0px 2px px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;  */
  background-color: #0f0081;
  /* border-top-right-radius: 30px;
  border-bottom-right-radius: 30px; */
  border-radius: 30px;

  border: 5px solid rgb(104, 104, 103);

  

}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;

  
}
label{
  margin: 2px 5px;
  color: #949494;
}

.inputs {
  width: 100%;
  padding: 10px 16px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  background-color: #0707075f;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 2px solid #00000000;
  

}
.inputs::placeholder{
  color: rgb(114, 114, 114);

}

.inputs:hover {
  background-color: #0707075f;
  color: #cecece;
  border: 2px solid rgb(34, 255, 0);

}
.inputs:focus {
  outline: none;
  border: 2px solid #22ff00;
  background-color: #0707075f;
  color: #cecece;
}





.btn{
  height: 50px;
  width: 200px;
  border-radius: 25px;
  background-color: #07e000;
  margin: 25px;
  color: #000000;
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  
}
.btn:hover{
  background-color: #0cff0c;
}

.router{
  text-decoration: none;
  font-size: small;
}

</style>
