<template>
  <div class="container">
    <div class="section1">
      <div class="one" v-if="users.length">
        <v-icon size="50px">mdi-account</v-icon>
        <h1>Clients {{ users.length }}</h1>
        
      </div>
      <div class="one" v-if="exercises.length">
        <v-icon size="50px">mdi-dumbbell</v-icon>
        <h1>Exercises {{ exercises.length }}</h1>
        
      </div>
      <!-- <div class="one" v-if="exercises.length">
        <v-icon size="50px">mdi-dumbbell</v-icon>
        <h1>Workout Scheduled {{ exercises.length }}</h1>
        
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  data() {
    return {
      users: [],
      exercises: [],
    };
  },
  computed: {
    ...mapGetters(["gettrainer_id"]), // Map the getter directly
  },
  methods: {
    ...mapActions(["fetchUsers"]),

    async loadUsers() {
      try {
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/fetchUsers",
          trainer_id
        );

        if (result.success) {
          this.users = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },
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

    scheduleWorkout(user_id) {
      this.$store.dispatch("User/goToScheduleWorkout", user_id);
    },
  },
  mounted() {
    this.loadUsers();
    this.fetchExercises();
  },
};


</script>

<style>
.container{
  width: 100%;
  height: 100%;

}
.section1{
  width: 100%;
  height: 240px;
  /* background-color: blue; */
  padding: 20px;
  display: flex;
}
.one{
  width: 25%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(131, 131, 131);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  margin-left: 20px;
  color: rgb(0, 0, 0);
}

</style>