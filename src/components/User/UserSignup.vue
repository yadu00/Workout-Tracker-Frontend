<template>
  <div class="box1">
    <form @submit.prevent="register">
      <div class="signupbox">
        <h1>Sign Up</h1>
        <div class="form">
          <h3 class="h3heading">Name</h3>
          <input
            v-model="user.name"
            class="fields"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="form">
          <h3 class="h3heading">Email</h3>
          <input
            v-model="user.email"
            class="fields"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form">
          <h3 class="h3heading">Password</h3>
          <input
            v-model="user.password"
            class="fields"
            type="password"
            placeholder="Enter your password"
            required
            minlength="6"
          />
        </div>
        <div class="form">
          <h3 class="h3heading">Confirm Password</h3>
          <input
            v-model="user.confirmpassword"
            class="fields"
            type="password"
            placeholder="Confirm password"
            required
            minlength="6"
          />
        </div>
        <div class="form">
          <h3 class="h3heading">Gender</h3>
          <select v-model="user.gender_id" class="select" required>
            <option value="" disabled>Select your gender</option>
            <option value="1">male</option>
            <option value="2">female</option>
          </select>
        </div>

        <div class="buttons">
          <button class="btn1" @click="signupUser">SIGN UP</button>

          <router-link to="/userlogin"
            ><h5 style="text-align: center; color: white">
              Already a User? Login
            </h5></router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        gender_id: "",
        confirmpassword: "",
      },
    };
  },
  methods: {
    ...mapActions(["signupUser"]),
    passwordMismatch() {
      return (
        this.user.confirmpassword.trim() !== "" &&
        this.user.password.trim() !== this.user.confirmpassword.trim()
      );
    },

    async signupUser() {
      try {
        if (this.passwordMismatch()) {
          alert("Passwords do not match!");
          return;
        }
        const result = await this.$store.dispatch("User/signupUser", this.user);
        if (result.success) {
          alert("User signed up successfully!");
          this.$router.push("/userlogin");
        } else {
          alert(`Signup failed: ${result.error}`);
        }
      } catch (error) {
        alert("Unexpected error during sign-up. Please check console.");
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  background: linear-gradient(135deg, #181818, #232326, #030303);
  font-family: Arial, Helvetica, sans-serif;
  background-size: cover;
}
.signupbox {
  width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.form {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}
.h3heading {
  margin-bottom: 5px;
  width: 50%;
  font-weight: 100;
  text-align: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.btn1 {
  width: 240px;
  height: 50px;
  background-color: rgb(0, 30, 255);
  color: #ffffff;
  border-radius: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin-bottom: 20px;
  font-size: larger;
  font-weight: bold;
}
.btn1:hover {
  background-color: rgb(14, 30, 177);
}

.fields {
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
input::placeholder {
  color: #000000;
}
.fields:hover {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(191, 255, 0);
  color: #000000;
}
.select {
  width: 100%;
  padding: 10px 16px;
  background-color: #8b8b8b;
  color: rgb(0, 0, 0);
  font-size: 14px;
  transition: all 0.3s ease;
  border-radius: 4px;
}
select:hover {
  background: rgba(59, 59, 59, 0.982);
  color: rgb(255, 251, 251);
  border: 1px solid rgb(184, 14, 14);
}
select:focus {
  color: rgb(255, 255, 255);
  transform: scale(1.02);
}
</style>
