<template>
  <div class="select-trainer">
    <div class="title">
      <p>Before Moving to Next Page You Have to Select a Trainer</p>
    </div>
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
        <!-- <img :src="require('@/assets/img/profile.png')" alt="" /> -->
        <img :src="require('@/assets/img/profile.png')" alt="" />
        <h3>{{ trainer.name }}</h3>
        <p>Certification: {{ trainer.certification }}</p>
        <p>Experience: {{ trainer.experienceYears }} years</p>
        <div class="stars">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{ filled: n <= Math.round(trainer.rating || 0) }"
          >
            ★
          </span>
        </div>
        <div class="rate">
          <v-icon>mdi-currency-inr</v-icon
          ><span style="font-size: 30px; font-weight: bolder">{{
            trainer.salary
          }}</span
          >/month
        </div>
        <button id="select" @click="assigntrainer(trainer)">
          Assign Trainer
        </button>
      </div>
    </div>
    
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
      about: "",
      selectedRating: 0,
      hoverRating: 0,
    };
  },

  computed: {
    ...mapGetters(["getuser_id"]), 
  },
  methods: {
    async loadTrainers() {
      try {
        const result = await this.$store.dispatch("User/viewTrainers");
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
    //load trainers according to specialization
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
      
       this.$router.push({ path: "/pay", query: { trainer_id: trainer.trainer_id } });
        
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

<style scoped>
.select-trainer {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #181818, #232326, #030303);
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  color: white;
  transition: transform 0.3s ease-in-out;
}
.trainer-card:hover {
  /* transform: scale(1.1, 1.1); */
  background: rgba(255, 255, 255, 0.096);
}
.trainer-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #fff;
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
  box-shadow: 0 6px 18px #000000;
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
  background-color: rgb(51, 51, 51);
  color: rgb(0, 0, 0);
}
.inside {
  width: 100%;
  padding: 30px;
  color: rgb(206, 206, 206);
}
.dialoguetitle {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(51, 51, 51);
  color: rgb(255, 255, 255);
  align-items: center;
  font-size: larger;
  padding: 5px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.about {
  background-color: rgb(235, 235, 235);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #373737;
  border-radius: 20px;
}
.about p {
  width: 100%;
  height: 300px;
  border-radius: 20px;
  background-color: rgb(51, 51, 51);
  padding: 10px;
  font-size: large;
  color: white;
}
.title {
  width: 100%;
  height: 50px;
  background-color: rgb(51, 51, 51);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  font-weight: bold;
  color: white;
  border-radius: 25px;
}

.stars {
  display: flex;
  gap: 10px;
}
.star {
  font-size: 40px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}
.star.filled {
  color: gold;
}

.rate {
  display: flex;
  align-items: center;
}
</style>
