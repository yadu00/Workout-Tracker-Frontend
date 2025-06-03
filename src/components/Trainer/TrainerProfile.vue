<template>
  <div class="profile-wrapper">
    <div class="profile-card">
      <div class="left-section">
        <v-icon size="140" class="profile-icon">mdi-account-circle-outline</v-icon>
        <v-textarea
          v-model="about"
          label="About Me"
          placeholder="Write something about yourself..."
          auto-grow
          outlined
          rows="2"
          class="about-text"
        ></v-textarea>
        <button class="btn primary" @click="addabout">Save About</button>
      </div>

      <div class="right-section">
        <h2 class="title">Trainer Profile</h2>
        <div class="info-box" v-for="(value, key) in displayInfo" :key="key">
          <span class="label">{{ key }}</span>
          <span class="value">{{ value }}</span>
        </div>
        <div class="button-group">
          <button class="btn outline" @click="editprofile">
            <v-icon>mdi-pencil</v-icon>Edit
          </button>
          <button class="btn danger" @click="deletetrainer">
            <v-icon>mdi-delete</v-icon>Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      trainer: {
        name: "",
        email: "",
        password: "",
        certification: "",
        experienceYears: "",
        specialisationName: "",
      },
      about: "",
    };
  },
  computed: {
    ...mapGetters(['gettrainer_id']),
    displayInfo() {
      return {
        Name: this.trainer.name,
        Email: this.trainer.email,
        Password: this.trainer.password,
        Certification: this.trainer.certification,
        Experience: this.trainer.experienceYears + " years",
        Specialization: this.trainer.specialisationName,
      };
    },
  },
  methods: {
    async fetchTrainerProfile() {
      try {
        const id = this.gettrainer_id;
        const result = await this.$store.dispatch("Trainer/fetchTrainerProfile", id);
        if (result.success) {
          this.trainer = result.data;
        }
      } catch (error) {
        console.error("Error loading Profile:", error);
      }
    },
    async showabout() {
      try {
        const result = await this.$store.dispatch("Trainer/showabout", this.gettrainer_id);
        if (result.success) {
          this.about = result.data;
        }
      } catch (error) {
        console.error("Error loading about:", error);
      }
    },
    async addabout() {
      try {
        const payload = {
          trainer_id: this.gettrainer_id,
          about: this.about,
        };
        const result = await this.$store.dispatch("Trainer/about", payload);
        if (result.success) alert("About updated successfully!");
      } catch {
        alert("Failed to update About section.");
      }
    },
    async deletetrainer() {
      if (confirm("Are you sure you want to delete your account?")) {
        try {
          const result = await this.$store.dispatch("Trainer/deleteAccount", this.gettrainer_id);
          if (result.success) alert("Account deleted.");
        } catch (error) {
          console.error("Error deleting trainer:", error);
        }
      }
    },
    editprofile() {
      // Navigate or open modal for editing
    },
  },
  mounted() {
    this.fetchTrainerProfile();
    this.showabout();
  },
};
</script>

<style scoped>
.profile-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #252525 0%, #282828 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  backdrop-filter: blur(2px);
  width: 100%;
}

.profile-card {
  background: rgba(75, 75, 75, 0.15);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 1000px;
  display: flex;
  padding: 30px;
  gap: 40px;
  flex-wrap: wrap;
}

.left-section,
.right-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
}

.left-section {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-icon {
  color: #ffffff;
  margin-bottom: 20px;
}

.about-text {
  width: 100%;
  margin-bottom: 20px;
}

.right-section {
  flex: 1.2;
  min-width: 320px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.info-box {
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgb(28, 28, 28);
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.label {
  font-weight: 500;
}

.value {
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  border: none;
  padding: 10px 18px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn.primary {
  background-color: rgb(0, 255, 115);
  color: #000000;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn.primary:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.btn.outline {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #ffffff;
}

.btn.outline:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.btn.danger {
  background-color: rgba(255, 25, 0, 0.7);
  color: white;
}

.btn.danger:hover {
  background-color: rgba(192, 57, 43, 0.8);
}

</style>
