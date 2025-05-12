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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9a9a9a;
  padding: 1rem;
}

.loginbox {
  background-color: #121212;
  color: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #cccccc;
}

label {
  color: #b7b7b7;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.inputs {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #2c2c2c6a;
  color: #f3f3f3;
  border: 2px solid transparent;
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.inputs:hover {
  background-color: rgba(0, 0, 0, 0.4);
  border-color: #d9ff00;
}

.inputs:focus {
  outline: none;
  border-color: #fff200;
  background-color: rgba(0, 0, 0, 0.4);
  color: #cecece;
}

.inputs::placeholder {
  color: #7b7b7b;
}

.password {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.remebermediv {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.router {
  text-decoration: none;
  font-size: 0.85rem;
  color: blue;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.btn {
  height: 45px;
  width: 100%;
  max-width: 200px;
  border-radius: 25px;
  background-color: #fff200;
  color: #000;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
}

.v-snackbar {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive styles */
@media (max-width: 600px) {
  .loginbox {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .inputs {
    font-size: 0.95rem;
  }

  .btn {
    font-size: 1rem;
    height: 42px;
  }

  .router {
    font-size: 0.8rem;
  }
}

</style>
