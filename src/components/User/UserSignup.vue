<template>
  <div class="box1">
    <form @submit.prevent="register">
      <div class="signupbox">
        <h1>Sign Up</h1>
        
          

     
        <div class="form-column">
          <v-text-field
            v-model="user.name"
            label="Full Name"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />
          <v-text-field
            v-model="user.email"
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />
          <v-text-field
            v-model="user.confirmpassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-check-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />

          <v-select
            v-model="user.gender_id"
            :items="gender"
            item-title="genderName"
            item-value="gender_id"
            label="Select Gender"
            variant="outlined"
            class="input-field"
            color="primary"
            density="comfortable"
          ></v-select>
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
      gender:[],
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
        if (this.user.password !== this.user.confirmpassword) {
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
    async listGender() {
      try {
        const result = await this.$store.dispatch("User/listGender");
        if (result.success) {
          this.gender = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading gender:", error);
      }
    },
  },
  mounted(){
    this.listGender();
  }
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
}
.form {
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  flex-direction: column;
}
h3{
  width: 100%;
  text-align: start;
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
.heading {
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
  height: 100px;
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
.fields {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1.2rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.fields:focus {
  border-color: #00bfff;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.7);
}

.fields:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #00bfff;
  color: #ffffff;
}

input::placeholder {
  color: #cccccc;
  font-style: italic;
}

</style>
