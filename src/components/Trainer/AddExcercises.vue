<template>
  <v-container>
    <div class="heading">
      <h1>Exercises</h1>
    </div>

    <v-divider></v-divider>
    <div class="title">
      <div class="names">
        <p style="font-weight: bold">Exercise</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">Focus Area</p>
      </div>
      <div class="names">
        <v-btn class="addexercise" @click="addExerciseDialog = true">
          <v-icon>mdi-plus</v-icon>Add Exercise</v-btn
        >
      </div>
    </div>
    <div v-if="exercises.length">
      <div v-for="(exercise, index) in exercises" :key="index" class="card">
        <div class="listcard">
          <div class="names">
            <p>{{ exercise.exercise_name }}</p>
          </div>
          <div class="names">
            <p>{{ exercise.focusarea }}</p>
          </div>
          <div class="names">
            <button
              id="btn-delete"
              @click="deleteExercise(exercise.exercise_id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <v-alert v-else type="info">No exercises added yet.</v-alert>

    <!-- Dialog for adding an exercise -->
    <v-dialog v-model="addExerciseDialog">
      <div class="box">
        <div class="dialoguetitle">
          <p>Add New Exercise</p>
          <v-icon size="40px" @click="addExerciseDialog = false"
            >mdi-close-box</v-icon
          >
        </div>

        <div class="inside">
          <p>Exercise Name</p>
          <input type="text" v-model="newExercise.exercise_name" />
          <p>Focus Area</p>
          <input type="text" v-model="newExercise.focusarea" />
        </div>
        <button class="Addbutton" @click="addExercise">
          <v-icon>mdi-plus</v-icon>ADD
        </button>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addExerciseDialog: false,
      newExercise: {
        exercise_name: "",
        exercise_description: "",
        focusarea: "",
      },
      exercises: [],
    };
  },
  computed: {
    ...mapGetters(["gettrainer_id"]), // Map the getter directly
  },
  methods: {
    async fetchExercises() {
      try {
        const trainer_id = this.gettrainer_id; // Replace with actual trainer ID
        const result = await this.$store.dispatch(
          "Trainer/fetchExercise",
          trainer_id
        );

        console.log("Fetched Exercises:", result); // Debugging log

        if (result.success && Array.isArray(result.data)) {
          this.exercises = result.data;
        } else {
          this.exercises = [];
          console.error("Invalid response structure:", result);
        }
      } catch (error) {
        console.error("Error loading exercises:", error);
      }
    },
    async addExercise() {
      if (this.newExercise.exercise_name && this.newExercise.focusarea) {
        try {
          const trainer_id = this.gettrainer_id; // Replace with actual trainer ID
          const payload = { ...this.newExercise, trainer_id };

          const result = await this.$store.dispatch(
            "Trainer/uploadExercise",
            payload
          );
          console.log("Sending payload:", payload);

          if (result.success) {
            this.fetchExercises(); // Refresh exercises list
            this.addExerciseDialog = false;
            this.newExercise = {
              exercise_name: "",
              focusarea: "",
            };
          } else {
            console.error(`Error adding exercise: ${result.error}`);
          }
        } catch (error) {
          console.error("Error adding exercise:", error);
        }
      }
    },

    async deleteExercise(exercise_id) {
      const confirmDelete = window.confirm("Delete Exercise");
      if (confirmDelete) {
        try {
          const trainer_id = this.gettrainer_id;
          const result = await this.$store.dispatch(
            "Trainer/deleteExercise",
            trainer_id,
            exercise_id
          );
          if (result.success) {
            this.user = result.data;
            alert("Exercise deleted.");
          } else {
            alert(`Error: ${result.error}`);
          }
        } catch (error) {
          console.error("Error deleting Exercise:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchExercises();
  },
};
</script>
<style scoped>
.v-container {
  margin: 20px auto;
  max-width: 900px;
  font-family: "Segoe UI", sans-serif;
  color: #fff;
}

.heading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(246, 111, 0, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.names {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.v-btn.addexercise {
  background: rgba(0, 123, 255, 0.3);
  color: #fff;
  border-radius: 25px;
  padding: 8px 18px;
  transition: 0.3s;
}

.v-btn.addexercise:hover {
  background: rgba(0, 123, 255, 0.6);
}

.card {
  margin-bottom: 12px;
}

.listcard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  transition: background 0.3s ease;
  color: #fff;
}

.listcard:hover {
  background: rgba(255, 255, 255, 0.15);
}

#btn-delete {
  background: rgba(255, 69, 58, 0.7);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 5px 15px;
  cursor: pointer;
  transition: 0.3s;
}

#btn-delete:hover {
  background: rgba(255, 69, 58, 1);
}

.v-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.box {
  width: 90%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  margin: auto;
}

.dialoguetitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(57, 57, 57, 0.8);
  padding: 10px 15px;
  border-radius: 12px 12px 0 0;
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
}

.inside {
  padding: 20px 10px;
}

input {
  width: 100%;
  padding: 10px 12px;
  margin-top: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.Addbutton {
  background-color: rgba(0, 123, 255, 0.8);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.Addbutton:hover {
  background-color: rgba(0, 123, 255, 1);
}
</style>
