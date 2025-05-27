<template>
  <div class="box1">
    <div class="signupbox">
      <h1>Sign Up</h1>
      <v-text-field
        v-model="user.name"
        label="Name"
        variant="outlined"
        prepend-inner-icon="mdi-account-outline"
        dense
        hide-details
        color="yellow"
        class="input-field"
      />
      <v-text-field
        v-model="user.email"
        label="Email"
        variant="outlined"
        prepend-inner-icon="mdi-email-outline"
        dense
        hide-details
        color="yellow"
        class="input-field"
      />

      <v-text-field
        v-model="user.password"
        label="Password"
        variant="outlined"
        type="password"
        prepend-inner-icon="mdi-lock-outline"
        dense
        hide-details
        color="yellow"
        class="input-field"
      ></v-text-field>
      <v-text-field
        v-model="user.certification"
        label="Certification"
        variant="outlined"
        prepend-inner-icon="mdi-file-certificate-outline"
        dense
        hide-details
        color="yellow"
        class="input-field"
      ></v-text-field>
      <v-text-field
        v-model="user.experienceYears"
        label="Experience"
        variant="outlined"
        type="number"
        prepend-inner-icon="mdi-briefcase-outline"
        dense
        hide-details
        color="yellow"
        class="input-field"
      ></v-text-field>
      <v-file-input
        v-model="photo"
        label="Upload Photo"
        prepend-icon="mdi-camera"
        accept="image/*"
        dense
        hide-details
        color="yellow"
        class="input-field"
      />
      <!-- <v-select
      id="e"
      v-model="selectedspecialisation"
      :items="Viewspecialisation"
      item-title="specialization_name"
      item-value="specialization_name"
      label="Specialization"
      return-object
      variant="outlined"
      prepend-inner-icon="mdi-application"
  dense
  hide-details
  color="yellow"
  class="input-field"
    ></v-select> -->
      <div class="form">
        <v-select
          v-model="user.specialization_id"
          :items="Viewspecialisation"
          item-title="specialization_name"
          item-value="specialization_id"
          label="Select Specialization"
          class="select"
          outlined
          dense
          required
        ></v-select>
      </div>
      <div class="buttons">
        <button @click="signupTrainer" class="regbtn">REGISTER</button>

        <router-link to="/Trainerlogin"
          ><h5 style="text-align: center; color: white">
            Already Registered? Login
          </h5></router-link
        >
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
        certification: "",
        experienceYears: "",
        specialization_id: "",
      },
      selectedspecialisation: "",
      Viewspecialisation: [],
    };
  },
  methods: {
    ...mapActions(["signupTrainer"]),

    async signupTrainer() {
      // const formData = new FormData();
      //     formData.append("cert", this.selectedFile);
      //     const trainerModel = new Blob(
      //       [
      //         JSON.stringify({
      //           name: this.name,
      //           email: this.email,
      //           password: this.password,
      //           certification: this.certification,
      //           specialization_id:this.selectedspecialisation,
      //           experienceYears:this.experienceYears
      //         }),
      //       ],
      //       { type: "application/json" }
      //     );
      //     formData.append("trainerModel", trainerModel);
      try {
        const formData = new FormData();
        formData.append(
          "trainerModel",
          new Blob([JSON.stringify(this.user)], { type: "application/json" })
        );
        if (this.photo) {
          formData.append("cert", this.photo);
        }
        const result = await this.$store.dispatch(
          "Trainer/signupTrainer",
          formData
        );
        if (result.success) {
          alert("Trainer signed up successfully!");
          this.$router.push("/trainerlogin");
        } else {
          alert(`Signup failed: ${result.error}`);
        }
      } catch (error) {
        alert("Unexpected error during sign-up. Please check console.");
      }
    },

    async fetchspecialisation() {
      try {
        const result = await this.$store.dispatch(
          "Trainer/fetchspecialisation"
        );
        if (result.success) {
          this.Viewspecialisation = result.data;
          console.log(result);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading specialisation:", error);
      }
    },
  },
  mounted() {
    this.fetchspecialisation();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
* {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.roboto-<uniquifier>{
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}
.box1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.722);
}
.signupbox {
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 680px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;

  background-color: rgb(22, 22, 22);
  color: #ffffff;
  border-radius: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.regbtn {
  width: 150px;
  height: 50px;
  background-color: #d9ff00;
  color: #000;
  font-size: larger;
  font-weight: bold;
  border-radius: 25px;
}

.input-field {
  background-color: rgba(75, 75, 75, 0.08);
  border-radius: 12px;
  margin-bottom: 18px;
  transition: all 0.3s ease;
}

.input-field:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #d9ff00;
}

.input-field input {
  color: white !important;
}

.input-field .v-label {
  color: #ffffff !important;
}
.select {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #d9ff00;
  color: wheat;
}
</style>
