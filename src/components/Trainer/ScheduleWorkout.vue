<template>
  <div class="contents">
    <h1>Create Workout</h1>
    <div class="section2">
      <h2>No of Workouts: {{ exercises.length }}</h2>
      <div class="title">
        <div class="names">
          <p style="font-weight: bold">Exercise</p>
        </div>
        <div class="names">
          <p style="font-weight: bold">Sets</p>
        </div>
        <div class="names">
          <p style="font-weight: bold">Reps</p>
        </div>
        <div class="names">
          <p style="font-weight: bold">Weights</p>
        </div>
        <div class="names">
          <v-btn class="addexercise" @click="addExerciseDialog = true">
            <v-icon>mdi-plus</v-icon>Create Workout</v-btn
          >
        </div>
      </div>

      <div class="card" v-for="(exercise, index) in exercises" :key="index">
        <div class="createdcard">
          <div class="names">
            <p>{{ exercise.excercise_name }}</p>
          </div>
          <div class="names">
            <p>{{ exercise.sets }}</p>
          </div>
          <div class="names">
            <p>{{ exercise.reps }}</p>
          </div>
          <div class="names">
            <p>{{ exercise.weights }}</p>
          </div>
          <div class="names">
            <div class="info">
              <template v-if="exercise.workoutStatus === 'completed'">
                ✅ Completed
              </template>
              <template v-else-if="exercise.workoutStatus === 'partially done'">
                🟡 Partially Done
                <v-icon @click="toggleWorkoutStatus(index)"
                  >mdi-eye-outline</v-icon
                >
              </template>
              <template v-else> ❌ Not Done </template>
            </div>
          </div>
        </div>
        <div v-if="expandedWorkoutIndex === index" class="status-details">
          <div v-if="exercise.status === 2" class="status-details">
            <div class="name">
              <p><strong>Status:</strong></p>
              <h4>{{ exercise.workoutStatus }}</h4>
            </div>
            <div class="name">
              <p><strong>SetsDone:</strong></p>
              <h4>{{ exercise.setsDone }}</h4>
            </div>
            <div class="name">
              <p><strong>RepsDone:</strong></p>
              <h4>{{ exercise.repsDone }}</h4>
            </div>
            <div class="name">
              <p><strong>Remarks:</strong></p>
              <h4>{{ exercise.remarks }}</h4>
            </div>
          </div>
          <div v-else>
            <p><strong>Workout not completed yet.</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-dialog v-model="addExerciseDialog" max-width="500px">
    <v-card class="custom-dialog-card">
      <v-card-title class="custom-dialog-title">Create Workout</v-card-title>
      <v-card-text>
        <label for="e">SELECT EXERCISE</label>
        <v-select
          id="e"
          v-model="selectedExercise"
          :items="ViewExercise"
          item-title="exercise_name"
          item-value="exercise_id"
          label="Select"
          return-object
          variant="outlined"
        ></v-select>
        <v-text-field
          v-model="newExercise.equipments"
          label="Equipments"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="newExercise.sets"
          label="Sets"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="newExercise.reps"
          label="Reps"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="newExercise.weights"
          label="Weights (kg)"
          variant="outlined"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="addExerciseDialog = false"
          >Cancel</v-btn
        >
        <v-btn color="green" @click="addworkout">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addExerciseDialog: false,
      newExercise: {
        exercise_name: "",
        sets: "",
        reps: "",
        weights: "",
        equipments: "",
      },
      exercises: [],
      weekdayId: null,
      availableExercises: [],
      selectedExercise: "",
      ViewExercise: [],
      loggedWorkouts: [],
      expandedWorkoutIndex: null,
    };
  },
  computed: {
    ...mapGetters(["gettrainer_id"]),
    trainer_id() {
      return this.gettrainer_id;
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.user_id = this.$route.query.user_id;
  },
  methods: {
    toggleWorkoutStatus(index) {
      this.expandedWorkoutIndex =
        this.expandedWorkoutIndex === index ? null : index;
    },
    async addworkout() {
      try {
        if (!this.selectedExercise) {
          alert("Please select an exercise");
          return;
        }
        if (
          !this.newExercise.sets ||
          !this.newExercise.reps ||
          !this.newExercise.weights ||
          !this.newExercise.equipments
        ) {
          alert("Please fill in all exercise details");
          return;
        }

        const payload = {
          trainer_id: Number(this.gettrainer_id),
          user_id: Number(this.user_id),
          exercise_id: Number(this.selectedExercise.exercise_id),
          equipments: this.newExercise.equipments,
          id: Number(this.id),
          sets: Number(this.newExercise.sets),
          reps: this.newExercise.reps,
          weights: this.newExercise.weights,
        };

        console.log("Sending payload:", payload);

        const result = await this.$store.dispatch(
          "Trainer/addworkouts",
          payload
        );

        if (result.success) {
          this.fetchWorkout();
          this.addExerciseDialog = false;
          this.selectedExercise = "";
          this.newExercise = { sets: "", reps: "", weights: "", workout: "" };
        } else {
          console.error("Error adding workout:", result.error);
        }
      } catch (error) {
        console.error("Error adding workout:", error);
      }
    },
    async LoadExercise() {
      try {
        const payload = {
          trainer_id: this.gettrainer_id,
        };
        const result = await this.$store.dispatch(
          "Trainer/loadExercise",
          payload
        );
        if (result.success) {
          this.ViewExercise = result.data;
          console.log(result);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading ezercise:", error);
      }
    },
    async fetchWorkout() {
      try {
        const payload = {
          user_id: this.user_id,
          id: this.id,
        };

        const result = await this.$store.dispatch(
          "Trainer/fetchWorkout",
          payload
        );

        console.log("Fetched Exercises:", result);

        if (result.success && Array.isArray(result.data)) {
          this.exercises = result.data;
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
    async deleteWorkout(workout_id) {
      const confirmDelete = window.confirm("Delete Workout");
      if (confirmDelete) {
        try {
          const payload = {
            trainer_id: this.gettrainer_id,
            workout_id: workout_id,
          };
          const result = await this.$store.dispatch(
            "Trainer/deleteExercise",
            payload
          );
          if (result.success) {
            this.user = result.data;
            this.fetchExercises();
            alert("Workout deleted.");
          } else {
            alert(`Error: ${result.error}`);
          }
        } catch (error) {
          console.error("Error deleting Workout:", error);
        }
      }
    },
  },
  mounted() {
    this.LoadExercise();
    this.fetchWorkout();
  },
};
</script>

<style scoped>
.contents {
  width: 100%;
  padding: 20px;
  /* background: rgba(255, 255, 255, 0.08); */
  min-height: 100vh;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

.contents h1 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #ffffff;
}

.section2 {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section2 h2 {
  margin-bottom: 16px;
  font-size: 1.3rem;
  color: #ffffff;
  font-weight: 600;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: rgba(161, 110, 110, 0.85); */
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.createdcard {
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #d8d8d8;
  text-align: center;
}
.names {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #d8d8d8;
  text-align: center;
}
.status-details {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  color: white;
}
.card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: rgba(47, 47, 47, 0.9);
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.card:hover {
  background: rgb(74, 74, 74);
}

.status {
  font-size: 0.9rem;
  font-weight: bold;
}

.v-btn.addexercise {
  background-color: #1976d2;
  color: white;
  border-radius: 25px;
  padding: 8px 20px;
  transition: background 0.3s ease;
}

.v-btn.addexercise:hover {
  background-color: #1565c0;
}

/* Dialog Styling */
.custom-dialog-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
}

.custom-dialog-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 8px;
}

.v-card-text label {
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
  display: block;
}

.v-text-field,
.v-select {
  margin-bottom: 16px;
}

/* Responsiveness */
@media (max-width: 768px) {
  .title,
  .card {
    flex-direction: column;
    align-items: flex-start;
  }

  .names {
    width: 100%;
    justify-content: flex-start;
    margin: 5px 0;
  }
}
</style>
