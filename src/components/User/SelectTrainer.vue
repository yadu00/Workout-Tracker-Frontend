<template>
  <div class="select-trainer">
    <div class="title"> <p>Before Moving to Next Page You Have to Select a Trainer</p></div>
    <div class="filter-container">
      <label for="specialization">Filter by Specialization:</label>
      <select
        id="specialization"
        v-model="selectedSpecialization"
        @change="filterTrainers"
      >
        <option value="">All</option>
        <option
          v-for="spec in specializations"
          :key="spec.id"
          :value="spec.specialization_id"
        >
          {{ spec.specialization_name }}
        </option>
      </select>
    </div>
    <div class="trainer-list">
      <div
        class="trainer-card"
        v-for="trainer in filteredTrainers"
        :key="trainer.id"
        @click="(showdescription = true), showabout(trainer)"
      >
        <img :src="require('@/assets/img/profile.png')" alt="" />
        <h3>{{ trainer.name }}</h3>
        <p>Certification: {{ trainer.certification }}</p>
        <p>Experience: {{ trainer.experienceYears }} years</p>
        <button id="select" @click="assigntrainer(trainer)">
          Assign Trainer
        </button>
      </div>
    </div>
    <v-dialog v-model="showdescription">
      <div class="box">
        <div class="dialoguetitle">
          <p>About</p>
          <v-icon size="40px" @click="showdescription = false"
            >mdi-close-box</v-icon
          >
        </div>

        <div class="inside">
          <div class="about">
            <v-icon size="200px">mdi-account-circle-outline</v-icon>

            <p>{{ about }}</p>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trainers: [],
      filteredTrainers: [],
      selectedSpecialization: "",
      specializations: [],
      showdescription: false,
      about: "",
    };
  },

  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  methods: {
    async loadTrainers() {
      try {
        const result = await this.$store.dispatch("User/selectTrainers");
        if (result.success) {
          this.trainers = result.data;
          this.filteredTrainers = this.trainers;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
    async loadSpecTrainers() {
      try {
        const specialization_id = Number(this.selectedSpecialization);
        console.log("spec", this.selectedSpecialization);
        const result = await this.$store.dispatch(
          "User/loadspectrainers",
          specialization_id
        );
        if (result.success) {
          this.trainers = result.data;
          this.filteredTrainers = this.trainers;
          console.log(result);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
    async loadSpecializations() {
      try {
        const result = await this.$store.dispatch("User/loadSpecializations");
        if (result.success) {
          this.specializations = result.data;
          console.log(result);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Specializations:", error);
      }
    },

    async assigntrainer(trainer) {
      try {
        const user_id = this.getuser_id;
        const payload = {
          user_id: user_id, // User ID of the person getting assigned a trainer
          trainer_id: trainer.trainer_id, // Trainer ID that is being assigned
        };

        const result = await this.$store.dispatch(
          "User/assigntrainer",
          payload
        );
        if (result.success) {
          console.log("Trainer assigned successfully:", result.data);
          this.$router.push("/userdetails");
        } else {
          console.error("Error assigning trainer:", result.error);
        }
      } catch (error) {
        console.error("Error loading Specializations:", error);
      }
    },

    filterTrainers() {
      if (this.selectedSpecialization) {
        this.filteredTrainers = this.trainers.filter(
          (trainer) => trainer.specialization_id === this.selectedSpecialization
        );
        this.loadSpecTrainers();
      } else {
        this.loadTrainers();
      }
    },

    // ✅ Method to select a trainer
    selectTrainer(trainer) {
      localStorage.setItem("trainerSelected", JSON.stringify(trainer)); // Save trainer data
      this.$router.push("/dashboard"); // Redirect after selection
    },

    async showabout(trainer) {
      try {
        const trainer_id = trainer.trainer_id;
        const result = await this.$store.dispatch(
          "Trainer/showabout",
          trainer_id
        );
        if (result.success) {
          this.about = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading about:", error);
      }
    },
  },
  mounted() {
    this.loadTrainers();
    this.loadSpecializations();
    this.showabout();
  },
};
</script>

<style>
.select-trainer {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-container label {
  margin-right: 10px;
}

.trainer-list {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px 50px;
}

.trainer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  height: 450px;
  background-color: #000000e3;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.753);
  padding: 15px;
  margin-bottom: 15px;
  color: white;
  transition: transform 0.3s ease-in-out;
}
.trainer-card:hover {
  transform: scale(1.1, 1.1);
}
.trainer-card img {
  width: 250px;
  height: 250px;
}

.trainer-card h3 {
  margin: 0;
  font-size: 18px;
}

.trainer-card p {
  margin: 5px 0;
}

#select {
  width: 150px;
  height: 50px;
  background-color: rgb(0, 72, 255);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

#select:hover {
  background-color: darkblue;
}
#applyfilter {
  background-color: black;
  height: 30px;
  width: 100px;
  border-radius: 4px;
  color: white;
}
#specialization {
  width: 300px;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(145, 145, 145, 0.3);
  backdrop-filter: blur(10px);
  color: #000;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#specialization:focus {
  outline: none;
  background: rgba(145, 145, 145, 0.3);
}

.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 50%;
  max-width: 500px;
  border-radius: 8px;
  background-color: rgb(110, 110, 110);
  color: rgb(0, 0, 0);
}
.inside{
  width: 100%;
  padding: 30px;
  color: rgb(206, 206, 206);
}
.dialoguetitle{
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(57, 57, 57);
  color: white;
  align-items: center;
  font-size: medium;
  padding: 5px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;


}

.about{
  background-color: rgb(97, 97, 97);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  border-radius: 20px;

}
.about p{
  width: 100%;
  height: 300px;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  font-size: large;
}
.title{
  width: 100%;
  height: 50px;
  background-color: yellow;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  font-weight: bold;
}
</style>
