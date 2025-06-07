<template>
  <div class="Logincontainer">
    <h1>Admin</h1>

    <div class="login">
      <h1>Login</h1>
      <div class="inputs">
        <label for="username">Username</label>
        <input type="text" v-model="username" placeholder="username" />
        <label for="username">Password</label>
        <input type="password" v-model="password" placeholder="password" />
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      snackbar: false, // Snackbar state
      snackbar2: false,
    };
  },
  computed: {
    ...mapGetters(["getadmin_id"]),
    admin_id() {
      return this.getadmin_id;
    },
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.snackbar2 = true; 
        setTimeout(() => {
        }, 1000);
        return;
      }

      try {
        const payload = {
          username: this.username,
          password: this.password,
        };

        const response = await this.$store.dispatch("loginAdmin", payload);

        if (response) {
          this.snackbar = true; 
          setTimeout(() => {
            this.$router.push("/adminHome"); 
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
    },
  },
};
</script>

<style scoped>
.Logincontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
    background: linear-gradient(135deg, #020202, #950000, #000000);
  padding: 1rem;
  box-sizing: border-box;
}

.Logincontainer .login {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 20px;
  align-items: center;
  background-color: #0e0e0eb5;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  box-sizing: border-box;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
}

label {
  color: #848484;
  margin-left: 5px;
  font-size: 1rem;
}

input[type="text"],
input[type="password"] {
  border-radius: 4px;
  padding: 0.6rem 1rem;
  margin-top: 5px;
  margin-bottom: 1rem;
  background-color: #242424;
  color: #ffffff;
  font-size: 1rem;
  border: none;
}

input::placeholder {
  color: #474747;
}

button {
  background-color: rgb(185, 173, 10);
  color: black;
  height: 50px;
  width: 100%;
  max-width: 200px;
  border-radius: 30px;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
          box-shadow: 0 6px 18px #000000;

}
button:hover{
    background-color: rgb(221, 206, 0);

}

.v-snackbar {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
