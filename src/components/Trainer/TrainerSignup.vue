<template>
  <div class="register-page">
    <div class="register-container">
      <h1 class="title">Trainer Registration</h1>
      <div class="form-columns">
        <!-- Left Column -->
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
            v-model="user.mobile"
            label="Mobile"
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
        </div>

        <!-- Right Column -->
        <div class="form-column">
          <v-text-field
            v-model="user.certification"
            label="Certification"
            variant="outlined"
            prepend-inner-icon="mdi-file-certificate-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />
          <v-file-input
            v-model="photo"
            label="Upload Certification Image"
            prepend-icon="mdi-camera"
            accept="image/*"
            variant="outlined"
            class="input-field"
            color="primary"
            density="comfortable"
          />
          <v-text-field
            v-model="user.experienceYears"
            label="Years of Experience"
            type="number"
            variant="outlined"
            prepend-inner-icon="mdi-briefcase-outline"
            class="input-field"
            color="primary"
            density="comfortable"
          />

          <v-select
            v-model="user.specialization_id"
            :items="Viewspecialisation"
            item-title="specialization_name"
            item-value="specialization_id"
            label="Select Specialization"
            variant="outlined"
            class="input-field"
            color="primary"
            density="comfortable"
          ></v-select>
        </div>
      </div>

      <div class="form-actions">
        <v-btn
          color="primary"
          class="register-btn"
          size="large"
          rounded
          @click="signupTrainer"
        >
          Register
        </v-btn>
        <router-link to="/Trainerlogin" class="login-link">
          Already registered? Log in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        certification: "",
        experienceYears: "",
        specialization_id: "",
      },
      photo: null,
      Viewspecialisation: [],
    };
  },
  methods: {
    async signupTrainer() {
      if (this.user.password !== this.user.confirmpassword) {
        alert("Passwords do not match!");
        return;
      }
      const mobilePattern = /^[6-9]\d{9}$/;
      if (!mobilePattern.test(this.user.mobile)) {
        alert("Please enter a valid 10-digit mobile number starting with 6-9!");
        return;
      }
      const formData = new FormData();
      formData.append(
        "trainerModel",
        new Blob([JSON.stringify(this.user)], { type: "application/json" })
      );
      if (this.photo) {
        formData.append("certificationImage", this.photo);
      }

      const result = await this.$store.dispatch(
        "Trainer/signupTrainer",
        formData
      );
      if (result.success) {
        alert("Trainer registered successfully!");
        this.$router.push("/Trainerlogin");
      } else {
        alert(`Signup failed: ${result.error}`);
      }
    },
    async fetchspecialisation() {
      const result = await this.$store.dispatch("Trainer/fetchspecialisation");
      if (result.success) {
        this.Viewspecialisation = result.data;
      } else {
        console.error("Specialization fetch failed.");
      }
    },
  },
  mounted() {
    this.fetchspecialisation();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #171717, #141317, #000000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
}

.register-container {
  background: linear-gradient(135deg, #051230, #242424, #000000);
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 1000px;
  width: 100%;
  color: white;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #00ff08;
  font-weight: 600;
}

.form-columns {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  min-width: 250px;
}

.input-field {
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.register-btn {
  width: 200px;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-link {
  margin-top: 20px;
  color: #c2c2c2;
  text-decoration: none;
  font-size: 0.95rem;
}

.login-link:hover {
  color: #000;
}
</style>
