<template>
  <div class="box1">
    <div class="signupbox">
      <h1>Sign Up</h1>
      <div class="form">
        <h3 class="h3heading">Name</h3>
        <input v-model="user.name" class="fields" type="text" placeholder="Enter your name" required />
      </div>
      <div class="form">
        <h3 class="h3heading">Email</h3>
        <input v-model="user.email" class="fields" type="email" placeholder="Enter your email" required />
      </div>
      <div class="form">
        <h3 class="h3heading">Password</h3>
        <input v-model="user.password" class="fields" type="password" placeholder="Enter your password" required minlength="6" />
      </div>
      <div class="form">
        <h3 class="h3heading">Gender</h3>
        <select v-model="user.gender_id" class="select" required>
          <option value="" disabled>Select your gender</option>
          <option value="1">male</option>
          <option value="2">female</option>
        </select>
      </div>
<div class="buttons" >
 <button class="btn1" @click="signupUser">SIGN UP</button>


  <router-link to="/userlogin"><h5 style="text-align: center;color: white;">Already a User? Login</h5></router-link>

</div>
      </div>
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
      },
    };
  },
  methods: {
    ...mapActions(["signupUser"]),

    async signupUser() {
      try {
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
  background-color: #343434;
  font-family: Arial, Helvetica, sans-serif;
  background-size: cover;

}
.signupbox {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 550px;
  padding: 40px;
  box-shadow: 2px 2px 10px 2px black;
  background-color: #343434;
  color: #ffffff;
  border-radius: 25px;
  border: 5px inset rgb(0, 255, 51);
  


}
.form {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
color: #ffffff;
}
.h3heading {
  margin-bottom: 5px;
  width: 50%;
  font-weight: 100;
}

.buttons{
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
.btn1:hover{
  background-color: rgb(14, 30, 177);

}


.fields{
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  background-color: #8b8b8b;
  border: 1px solid #000;
  margin-bottom: 5px;
  border-radius: 4px;
  color: #000000;

  


}
input::placeholder{
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
