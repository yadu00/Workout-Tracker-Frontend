<template>
  <div class="container">
   
      <h1>Trainer</h1>

    <div class="trainer-card">
      <img :src="require('@/assets/img/profile.png')" alt="" />
      <h3>{{ trainer.name }}</h3>
      <p>Certification: {{ trainer.certification }}</p>
      <p>Experience: {{ trainer.experienceYears }}</p>
      <p>Mobile No: {{ trainer.mobile }}</p>
      <p>Email: {{ trainer.email }}</p>
      <div class="ratingbtn">
        <button @click="ratingdialogue=true" id="rating">Share Your Feedback</button>
      </div>
    </div>
  </div>


  <v-dialog v-model="ratingdialogue" max-width="100%">
  <div class="box">
    <v-icon class="close" size="30px" @click="ratingdialogue=false">mdi-close-circle</v-icon>
    <div class="card">
      <div class="heading">
        <h1>Share Your Feedback</h1>
      </div>
      <div class="content">
        <h1>Rate Your Experience</h1>
        <div class="stars">
          <span
            v-for="n in 5"
            :key="n"
            @click="selectRating(n)"
            @mouseover="hoverRating = n"
            @mouseleave="hoverRating = 0"
            class="star"
            :class="{ filled: n <= (hoverRating || selectedRating) }"
          >
            ★
          </span>
        </div>
      </div>
      <div class="submit">
        <button id="submit" @click="submitRating">Submit</button>
      </div>
    </div>
  </div>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trainer: {
        name: "",
        certification: "",
        experienceYears: "",
        mobile: "",
        email: "",
      },
      ratingdialogue:false,
      selectedRating: 0,
      hoverRating: 0,
    };
  },
  computed: {
    ...mapGetters(["getuser_id"]),
  },
  methods: {
    async viewTrainer() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/viewtrainer", payload);
        if (result.success) {
          this.trainer = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainer:", error);
      }
    },

    goto() {
      this.$router.push("/addrating");
    },
    selectRating(rating) {
      this.selectedRating = rating;
    },
    async submitRating() {
 
  try {
     if (this.selectedRating === 0) {
    alert("Please select a rating before submitting.");
    return;
  }

  const payload = {
    user_id: this.getuser_id,
    rating: this.selectedRating,
  };

    const result = await this.$store.dispatch("User/addRating", payload);
    if (result.success) {
      alert("Thank you for your feedback!");
      this.ratingdialogue = false;
    } else {
      alert(`Failed to submit rating: ${result.error}`);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Something went wrong.");
  }
}

  },

  mounted() {
    this.viewTrainer();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  font-family: 'Segoe UI', sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  min-height: 100vh;
}

h1 {
  margin-bottom: 2rem;
  color: #fff;
  font-size: 2.5rem;
}

.trainer-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
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
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.trainer-card p {
  margin: 0.4rem 0;
  font-size: 1rem;
  color: #e0e0e0;
}

.ratingbtn {
  margin-top: 1.5rem;
}

#rating {
  background: #ffeb3b;
  color: #000;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;
}

#rating:hover {
  background-color: #fdd835;
}

/* Dialog box styling */
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  color: #000;
}

.close {
  position: absolute;
  top: 10px;
  right: 30px;
  color: #ffffff;
  cursor: pointer;
  z-index: 10;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.heading {
  background: #2c3e50;
  padding: 1rem;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
}

.content {
  padding: 2rem;
  text-align: center;
}

.content h1 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1rem;
}

.star {
  font-size: 2.5rem;
  color: #ccc;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.star:hover {
  transform: scale(1.2);
}

.star.filled {
  color: #ff9800;
}

.submit {
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
}

#submit {
  background-color: #4caf50;
  color: white;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#submit:hover {
  background-color: #43a047;
}
</style>
