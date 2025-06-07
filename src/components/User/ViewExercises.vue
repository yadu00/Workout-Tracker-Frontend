<template>
  <div class="contents">
    <h1>Today's Exercises</h1>
    <div class="heading" v-if="exercises.length > 0">
      <h3>No of Exercises: {{ exercises.length }}</h3>
      <h4>Date : {{ exercises[0].date }}</h4>
    </div>
      <p v-else>No Exercise found.</p>

    <div class="section2">
      <div class="card" v-for="(exercise, index) in exercises" :key="index">
        <div class="cards">
          <div class="info">
            <h4>Exercise: {{ exercise.excercise_name }}</h4>
          </div>
          <div class="info">
            <h4>Focus Area: {{ exercise.focusarea }}</h4>
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
              @click="exercise.showLogForm = !exercise.showLogForm"
              :disabled="loggedWorkouts.includes(exercise.workout_id)"
            >
              {{
                loggedWorkouts.includes(exercise.workout_id) ? "✅ Done" : "LOG"
              }}
            </button>
          </div>
        </div>

        <!-- Inline Logging Form -->
        <div
          v-if="
            exercise.showLogForm &&
            !loggedWorkouts.includes(exercise.workout_id)
          "
          class="log-form"
        >
          <label>Status:</label>
          <select v-model="exercise.workoutStatus" class="select">
            <option disabled value="">-- Select --</option>
            <option value="completed">Completed</option>
            <option value="skipped">Skipped</option>
            <option value="partially done">Partially Done</option>
          </select>

          <div
            v-if="exercise.workoutStatus === 'partially done'"
            class="partially done-inputs"
          >
            <input
              class="input"
              type="number"
              v-model.number="exercise.setsDone"
              placeholder="Sets done"
              min="0"
            />
            <input
              class="input"
              type="number"
              v-model.number="exercise.repsDone"
              placeholder="Reps done"
              min="0"
            />
            <input
              class="input"
              type="text"
              v-model.number="exercise.remarks"
              placeholder="Remarks"
            />
          </div>

          <button @click="logworkout(exercise)">Submit</button>
        </div>

        <div class="info"><h4>Rest 30 Seconds</h4></div>
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
    this.id = this.$route.query.id;
    // Get user_id from URL
  },
  methods: {
    async fetchWorkout() {
      try {
        const payload = {
          user_id: this.getuser_id,
          id: this.id,
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

    async logworkout(exercise) {
      try {
        const payload = {
          workout_id: exercise.workout_id,
          workoutStatus: exercise.workoutStatus,
          setsDone:
            exercise.workoutStatus === "partially done"
              ? exercise.setsDone
              : null,
          repsDone:
            exercise.workoutStatus === "partially done"
              ? exercise.repsDone
              : null,
          remarks:
            exercise.workoutStatus === "partially done"
              ? exercise.remarks
              : null,
        };
        const result = await this.$store.dispatch(
          "User/logworkoutstatus",
          payload
        );
        if (result.success) {
          // Add to loggedWorkouts list
          this.loggedWorkouts.push(exercise.workout_id);
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
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  font-family: "Segoe UI", sans-serif;
  color: white;
}

.contents h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
}

.heading {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 30px 0;
  font-size: 1.1rem;
  color: #ddd;
}

.section2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info {
  flex: 1 1 120px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#logworkout {
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  background-color: #00e676;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

#logworkout:hover {
  background-color: #00c853;
  transform: scale(1.05);
}

#logworkout:disabled {
  background-color: #888;
  color: white;
  cursor: default;
}

.log-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.log-form label {
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 5px;
}

.log-form select,
.log-form input {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.155);
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: background-color 0.3s ease;
}

.log-form select:focus,
.log-form input:focus {
  background: rgb(0, 0, 0);
}

.partially\ done-inputs {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.partially\ done-inputs input {
  flex: 1 1 100px;
  justify-content: space-evenly;
}
.input {
  margin-right: 20px;
}
.input::placeholder {
  color: #c0c0c0; /* Change to any color you want */
  opacity: 1; /* Ensure color shows up in all browsers */
}

.log-form button {
  align-self: flex-start;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #29b6f6;
  color: black;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.log-form button:hover {
  background-color: #0288d1;
  transform: scale(1.05);
}
</style>
