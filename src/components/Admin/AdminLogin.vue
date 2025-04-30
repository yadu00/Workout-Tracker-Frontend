<template>
  <div class="Logincontainer">
    <h1>Admin</h1>

    <div class="login">
      <h1>Login</h1>
      <div class="inputs">
        <label for="username">Username</label>
        <input type="text" v-model="username" placeholder="username">
        <label for="username" >Password</label>
        <input type="password" v-model="password" placeholder="password">
      </div>
        <button @click="login">Login</button>
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

  <!-- Snackbar -->
 <v-snackbar
    v-model="snackbar2"
    color="#adff2f"
    width="400px"
    height="80px"
    location="top"
  >
    Please fill all fields

    <template v-slot:actions>
      <v-btn
        color="black"
        variant="text"
        @click="snackbar2 = false"
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
      username: "",
      password: "",
      snackbar: false, // Snackbar state
      snackbar2: false,

    };
  },
  computed:{
      ...mapGetters(['getadmin_id']),
      admin_id(){
        return this.getadmin_id;
      }
  },
  methods: {
    async login() {
  if (!this.username || !this.password) {
    this.snackbar2 = true; // Show snackbar on success
          setTimeout(() => {
          // Redirect after a delay
          }, 1000);
    return;
  }

  try {
    const payload = {
      username: this.username,
      password: this.password,
    }

    const response = await this.$store.dispatch('loginAdmin',payload)

    if (response) { 
      this.snackbar = true; // Show snackbar on success
          setTimeout(() => {
            this.$router.push("/adminDashboard"); // Redirect after a delay
          }, 1000);
    } else {
      alert(response.message || "Invalid credentials.");
    }
  } catch (error) {
    alert("Error during login.");
    console.error(error);
    console.error("Login Error:", error);
        alert("Error during login. Check the console for details.");
      
  }
}

  },
};
</script>

<style>
.Logincontainer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: #313131;

}
.Logincontainer .login{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 30%;
    height: 50%;
    padding: 20px;
    border-radius:20px ;
    align-items: center;
    background-color: #0e0e0e;
    color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;


}
label{
  color: #848484;
}
.inputs{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;

}



input[type=text]{
  border-radius:4px ;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #242424;
  color: #ffffff;
  font-size: 18px;




}
input[type=password]{
  border-radius:4px ;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 1px;
  background-color: #242424;
  color: #ffffff;
  font-size: 18px;
  
  

}
input::placeholder{
  color: #474747;
}

label{
  margin-left: 5px;
  font-size: larger;

}

button{
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    height: 55px;
    width: 200px;
    border-radius:30px ;
    margin-top: 20px;
    outline: none;
    font-size: x-large;
    
}
.v-snackbar {
  /* Ensures the background color is applied */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow */
}
</style>