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
    ...mapGetters(["getuser_id"]), // Map the getter directly
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
  justify-content: center;
  align-items: center;
  color: #000;
}
.trainer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 500px;
  background-color: #000000;
  border-radius: 25px;
  box-shadow: rgb(0, 0, 0) 0px 5px 15px;
  margin-bottom: 15px;
  color: rgb(55, 255, 0);
  margin-top: 5px;
}
.trainer-card img {
  width: 150px;
  height: 150px;
}

.trainer-card h3 {
  margin: 0;
  font-size: 18px;
}

.trainer-card p {
  margin: 5px 0;
  color: #7bff00;
  font-size: larger;
}
.ratingbtn {
  width: 600px;
  height: 190px;
  display: flex;
  justify-content: end;
  align-items: end;
}
#rating {
  width: 100%;
  height: 40px;
  background-color: #0040ff;
  color: #ffffff;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
}





.box {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.close{
  left: 227px;
  top: 4px;
  color: #ff0000;
}
.card {
  width: 30%;
  height: 400px;
  background-color: rgb(199, 199, 201);
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 5px;
}
.heading {
  width: 100%;
  height: 20%;
  background-color: rgb(232, 232, 232);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: rgb(0, 0, 0);
}
.content {
  width: 100%;
  height: 60%;
  background-color: rgb(16, 182, 41);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(107, 107, 107);
  flex-direction: column;
  color: #000;
}
.submit {
  width: 100%;
  height: 20%;
  background-color: rgb(18, 75, 50);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgb(232, 232, 232);
}
#submit {
  width: 40%;
  height: 50%;
  background-color: rgb(37, 246, 0);
  color: black;
  border-radius: 5px;
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
</style>
