<template>
  <div class="loginbody">
    <div class="box">
      <div class="container">
        <h1>Welcome to <br />FitTrack.</h1>
        <p>
          Your ultimate fitness companion for personalized training, progress
          tracking, and expert guidance.
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
        <div class="password-wrapper">
          <input
            v-model="password"
            class="inputs"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
          />
          <span class="toggle-icon" @click="togglePassword">
            <v-icon>{{ showPassword ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
          </span>
        </div>

        <div class="password">
          <div class="remebermediv"></div>
          <router-link to="/forgotpassword" class="router-link"
            >Forgot password?</router-link
          >
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters(["getuser_id"]),
    user_id() {
      return this.getuser_id;
    },
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
  if (!this.email || !this.password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const payload = { email: this.email, password: this.password };

    // The loginUser action returns the full response including firstLogin
    const response = await this.$store.dispatch("loginUser", payload);

    if (response && response.user_id) {
      this.snackbar = true;
      const user_id = response.user_id;
      const firstLogin = response.firstLogin;

      if (firstLogin) {
        // First time login: redirect to welcome page
        setTimeout(() => {
          this.$router.push("/welcome");
        }, 1000);
      } else {
        // Not first time: go to user home with user_id query param
        setTimeout(() => {
          this.$router.push(`/userHome?user=${user_id}`);
        }, 1000);
      }
    } else {
      alert("Invalid credentials.");
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
  background: linear-gradient(135deg, #181818, #232326, #030303);
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #ff0000;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

.container p {
  font-size: 1rem;
  color: #c4c4c4;
  line-height: 1.5;
  padding: 0 1rem;
}

.loginbox {
  flex: 1 1 400px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  max-width: 400px;
}

.loginbox h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a6a59d;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  color: #fbfbfb;
}
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.inputs {
  padding-right: 2.5rem; /* space for the icon */
}
.toggle-icon {
  position: absolute;
  right: 10px;
  top: 11px;
  cursor: pointer;
  color: #666;
}
.inputs {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #00000035;
  border-radius: 4px;
  border: 2px solid transparent;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.inputs::placeholder {
  color: #d5d5d5;
}

.inputs:hover {
  border-color: rgb(255, 0, 0);
}

.inputs:focus {
  outline: none;
  border-color: #000000;
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
  color: #ececec;
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
  background-color: #ff0000c4;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 1rem;
  box-shadow: 0 6px 18px #000000;
}

.btn:hover {
  background-color: #ff0000;
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
