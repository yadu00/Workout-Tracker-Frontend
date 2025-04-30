<template>
  <div class="contents">
    <h1>Today's Exercises</h1>
    <div class="section2">
        <h3>No of Exercises: {{ exercises.length }}</h3>
        <div class="card" v-for="(exercise, index) in exercises" :key="index">
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
    {{ loggedWorkouts.includes(exercise.workout_id) ? '✅ Done' : 'LOG' }}
  </button>
</div>

        </div>
        
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            exercises: [],
            weekdayId:null,
            loggedWorkouts: [] ,
        }
    },

    computed: {
    ...mapGetters(['getuser_id']),  // Map the getter directly
  },
  created() {
    this.weekdayId = this.$route.query.weekdayId;
    // Get user_id from URL
  },
    methods:{
      async fetchWorkout() {
  try {
    const payload = {
      user_id: this.getuser_id,
      weekdayId: this.weekdayId
    };

    const result = await this.$store.dispatch(
      "User/fetchWorkout",
      payload
    );

    console.log("Fetched Exercises:", result);

    if (result.success && Array.isArray(result.data)) {
      this.exercises = result.data;

      // Find all workouts that are already logged (status === 2)
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


    async logworkout(workout_id) {
  try {
    const payload = {
      user_id: Number(this.getuser_id),
      workout_id: workout_id
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

}
</script>

<style>
.contents{
    width: 100%;
    height: 100%;
    /* background-color: rgb(0, 0, 0); */
    display: flex;
    flex-direction: column;
    color: white;
}
.contents h1{
    width: 100%;
    text-align: center;
    color: rgb(0, 0, 0);

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
  color: rgb(0, 0, 0);

}
.card {

  background-color: rgb(177, 177, 177);
  padding: 15px;
  border-radius: 4px;
  color: rgb(0, 0, 0);
  justify-content: space-between;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

}
#logworkout{
  width: 150px;
  height: 40px;
  background-color: blue;
  color: white;
  border-radius: 4px;

}

.info{
  width: 20%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>