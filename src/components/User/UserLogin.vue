<template>
  <div class="loginbody">
    <div class="box">
      <div class="container">
        <h1>Welcome to <br />FitTrack.</h1>
        <p>
          Your ultimate fitness companion for personalized training,
          progress tracking, and expert guidance.
        </p>
      </div>

      <div class="loginbox">
        <h1>Login</h1>

        <label for="email">Email</label>
        <input
          v-model="email"
          class="inputs"
          type="text"
          placeholder="Enter your email"
        />

        <label for="password">Password</label>
        <input
          v-model="password"
          class="inputs"
          type="password"
          placeholder="Enter your password"
        />

        <div class="password">
          <!-- Future use: Remember Me -->
          <div class="remebermediv"></div>
          <router-link to="/forgotpassword" class="router-link">Forgot password?</router-link>
        </div>

        <div class="button">
          <button class="btn" role="button" @click="login">Login</button>
          <router-link to="/signup" class="router">
            <label>New User? Sign Up</label>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" color="#adff2f" width="400px" location="top">
      Login Success
      <template v-slot:actions>
        <v-btn color="black" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.loginbody {
  width: 100%;
  height: 100vh;
  background-color: #d6cfd7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
}

.container {
  flex: 1 1 400px;
  color: #000000;
  text-align: center;
  font-family: "Audiowide", sans-serif;
}

.container h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.container p {
  font-size: 1rem;
  color: #252525;
  line-height: 1.5;
  padding: 0 1rem;
}

.loginbox {
  flex: 1 1 400px;
  background-color: #4dff00;
  border-radius: 30px;
  border: 5px solid rgb(0, 0, 0);
  padding: 2rem;
  color: #000000;
  max-width: 400px;
}

.loginbox h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  color: #181818;
}

.inputs {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #000000a9;
  border-radius: 4px;
  border: 2px solid transparent;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.inputs::placeholder {
  color: #dddddd;
}

.inputs:hover {
  border-color: rgb(34, 255, 0);
}

.inputs:focus {
  outline: none;
  border-color: #22ff00;
  background-color: #0707075f;
}

.password {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.router-link {
  color: #313131;
  text-decoration: none;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  width: 100%;
  max-width: 200px;
  height: 50px;
  background-color: #000000;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 1rem;
}

.btn:hover {
  background-color: #0cff0c;
}

.router {
  color: white;
  font-size: 0.9rem;
  text-decoration: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container h1 {
    font-size: 2rem;
  }

  .container p {
    font-size: 0.9rem;
  }

  .loginbox {
    padding: 1.5rem;
  }

  .btn {
    font-size: 1rem;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .container {
    text-align: center;
  }

  .container h1 {
    font-size: 1.8rem;
  }

  .container p {
    font-size: 0.85rem;
  }
}

</style>
