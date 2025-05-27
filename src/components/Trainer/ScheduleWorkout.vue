<template>
  <div class="contents">
    <h1>Create Workout</h1>
    <div class="section2">
        <h2>No of Workouts: {{ exercises.length }}</h2>
        <div class="title">
        <div class="names">
          <p style="font-weight: bold;">Exercise</p>
        </div>
        <div class="names">
          <p style="font-weight: bold;">Sets</p>
        </div>
        <div class="names">
          <p style="font-weight: bold;">Reps</p>
        </div>
        <div class="names">
          <p style="font-weight: bold;">Weights</p>
        </div>
        <div class="names">
          <v-btn class="addexercise" @click="addExerciseDialog = true">
          <v-icon>mdi-plus</v-icon>Create Workout</v-btn
        >
        </div>
        </div> 
        <div class="card" v-for="(exercise, index) in exercises" :key="index">
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
            <div class="status">Status</div>
            {{ loggedWorkouts.includes(exercise.workout_id) ? '✅ Done' : '❌ Not Done' }}

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
            <v-text-field 
            v-model="newExercise.workoutdate"
            label="Date"
            type="date"
            outlined:max="maxDate"
            required
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
import { mapGetters } from 'vuex';
export default {
    data() {
    return {
      addExerciseDialog: false,
      newExercise: {
        exercise_name: "",
        sets: "",
        reps: "",
        weights: "",
        workoutdate: "",
        equipments:"",
      },
      exercises: [],
      weekdayId:null,
      availableExercises: [],
      selectedExercise: "",
      ViewExercise: [],
      loggedWorkouts: [] ,
    };
  },
  computed:{
      ...mapGetters(['gettrainer_id']),
      trainer_id(){
        return this.gettrainer_id;
      }
  },
  created() {
    this.weekdayId = this.$route.query.weekdayId;
    this.user_id = this.$route.query.user_id;
    // Get user_id from URL
  },
  methods:{
    async addworkout() {
      try {
        if (!this.selectedExercise) {
          alert("Please select an exercise");
          return;
        }
        if (
          !this.newExercise.sets ||
          !this.newExercise.reps ||
          !this.newExercise.weights||
          !this.newExercise.equipments
        ) {
          alert("Please fill in all exercise details");
          return;
        }

        const payload = {
          trainer_id:Number(this.gettrainer_id),
          user_id: Number(this.user_id),
          exercise_id: Number(this.selectedExercise.exercise_id),
          equipments:this.newExercise.equipments,
          weekdayId:Number(this.weekdayId),
          sets: Number(this.newExercise.sets),
          reps: this.newExercise.reps,
          weights: this.newExercise.weights,
          workoutdate:this.newExercise.workoutdate,
          // workoutdate: this.newExercise.workout,
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
          trainer_id:this.gettrainer_id
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
          weekdayId:this.weekdayId
        };

        const result = await this.$store.dispatch(
          "Trainer/fetchWorkout",
          payload
        );

        console.log("Fetched Exercises:", result);

        if (result.success && Array.isArray(result.data)) {
          this.exercises = result.data;
          this.loggedWorkouts = this.exercises
        .filter(ex => ex.status === 2)
        .map(ex => ex.workout_id);
        } else {
          this.exercises = [];
          console.error("Invalid response structure:", result);
        }
      } catch (error) {
        console.error("Error loading exercises:", error);
      }
    },
    
    
  },
  mounted() {
    this.LoadExercise();
    this.fetchWorkout();
  },

}
</script>

<style scoped>
.contents{
  width: 82.5%;
      height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
}
.contents h1{
    width: 100%;
    text-align: center;
}
.addbtn{
    display: flex;
    justify-content: start;
}
#addExercise{
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
}
.card {
  display: flex;
  background-color: rgb(224, 224, 224);
  border-radius: 4px;
  color: rgb(0, 0, 0);
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid black;
}


.title{
width: 100%;
height: 50px;
display: flex;
background-color: black;
color: white;
justify-content: space-between;
align-items: center;

}
.names{
  width: 25%;
  margin: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
}
</style>