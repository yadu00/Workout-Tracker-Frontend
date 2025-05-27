<template>
  <div class="contents">
     <h1>Today's Exercises</h1>
    <div class="heading" v-if="exercises.length > 0">
          <h3>No of Exercises: {{ exercises.length }}</h3>
          <h4>Date : {{ exercises[0].date }}</h4>
    </div>
   
    <div class="section2">
      <div class="card" v-for="(exercise, index) in exercises" :key="index">
        <div class="cards">
          <div class="info">
            <h4>Exercise: {{ exercise.excercise_name }}</h4>
          </div>
          <div class="info">
            <h4>Sets: {{ exercise.sets }}</h4>
          </div>
          <div class="info">
            <h4>Reps: {{ exercise.reps }}</h4>
          </div>
          <div class="info">
            <h4>Weights: {{ exercise.weights }}</h4>
          </div>
          <div class="info">
            <button
              id="logworkout"
              @click="logworkout(exercise.workout_id)"
              :disabled="loggedWorkouts.includes(exercise.workout_id)"
            >
              {{
                loggedWorkouts.includes(exercise.workout_id) ? "✅ Done" : "LOG"
              }}
            </button>
          </div>
        </div>
        <div class="info">
          <h4>Rest 30 Seconds</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      exercises: [],
      weekdayId: null,
      loggedWorkouts: [],
    };
  },

  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  created() {
    this.weekdayId = this.$route.query.weekdayId;
    // Get user_id from URL
  },
  methods: {
    async fetchWorkout() {
      try {
        const payload = {
          user_id: this.getuser_id,
          weekdayId: this.weekdayId,
        };

        const result = await this.$store.dispatch("User/fetchWorkout", payload);

        console.log("Fetched Exercises:", result);

        if (result.success && Array.isArray(result.data)) {
          this.exercises = result.data;

          // Find all workouts that are already logged (status === 2)
          this.loggedWorkouts = this.exercises
            .filter((ex) => ex.status === 2)
            .map((ex) => ex.workout_id);
        } else {
          this.exercises = [];
          console.error("Invalid response structure:", result);
        }
      } catch (error) {
        console.error("Error loading exercises:", error);
      }
    },

    async logworkout(workout_id) {
      try {
        const payload = {
          user_id: Number(this.getuser_id),
          workout_id: workout_id,
        };
        const result = await this.$store.dispatch("User/logworkout", payload);
        if (result.success) {
          // Add to loggedWorkouts list
          this.loggedWorkouts.push(workout_id);
          alert("Logged");
        } else {
          alert(`Logging failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error updating status", error);
      }
    },
  },
  mounted() {
    this.fetchWorkout();
  },
};
</script>

<style scoped>
.contents {
  width: 100%;
  height: 100%;
  /* background-color: rgb(0, 0, 0); */
  display: flex;
  flex-direction: column;
  color: white;
}
.contents h1 {
  width: 100%;
  text-align: center;
  color: rgb(244, 244, 244);
}
.addbtn {
  display: flex;
  justify-content: start;
}
#addExercise {
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 25px;
}

.section2 {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  color: rgb(0, 0, 0);
}
.heading {
  width: 99%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgb(60, 60, 60);

}
.card {
  background-color: rgb(29, 29, 29);
  padding: 15px;
  border-radius: 4px;
  color: rgb(205, 205, 205);
  margin-bottom: 10px;
}
.cards {
  background-color: rgb(242, 145, 0);
  padding: 15px;
  border-radius: 4px;
  color: rgb(0, 0, 0);
  justify-content: space-between;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
#logworkout {
  width: 150px;
  height: 40px;
  background-color: blue;
  color: white;
  border-radius: 4px;
}

.info {
  width: 20%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
