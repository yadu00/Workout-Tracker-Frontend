<template>
  <v-container>
    <div class="heading">
      <h1>Exercises</h1>
    </div>

      <v-divider></v-divider>
      <div class="title">
        <div class="names">
          <p style="font-weight: bold;">Exercise</p>
        </div>
        <div class="names">
          <p style="font-weight: bold;">Focus Area</p>
        </div>
        <div class="names">
          <v-btn class="addexercise" @click="addExerciseDialog = true">
          <v-icon>mdi-plus</v-icon>Add Exercise</v-btn
        >
        </div>
        </div> 
      <v-list v-if="exercises.length">
        <div v-for="(exercise, index) in exercises" :key="index" class="card">
          <div class="listcard">
            <div class="names">
              <p>{{ exercise.exercise_name }}</p>
            </div>
            <div class="names">
              <p>{{ exercise.focusarea }}</p>            </div>
            <div class="names">
              <button id="btn-delete">Delete</button>
            </div>
            
            
          </div>
        </div>
      </v-list>
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
        <button class="Addbutton" @click="addExercise"><v-icon>mdi-plus</v-icon>ADD</button>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters(['gettrainer_id']),  // Map the getter directly
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
  },
  mounted() {
    this.fetchExercises();
  },
};
</script>
<style>
.v-container{
margin: 0;
}
.v-card{
  background-color: rgb(255, 255, 255);
  border: none;
}
.v-btn{
  border-radius: 25px;
  right: 0;
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

.listcard {
  display: flex;
  justify-content: space-between;
  color: rgb(0, 0, 0);
  margin: 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid black;

}
.heading{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#btn-delete {
  background-color: rgb(218, 228, 31);
  width: 100px;
  height: 30px;
  border-radius: 4px;
}

.addexercise {
  background-color: rgb(191, 255, 0);
}

/* styling dialogue box */
.v-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  
}

.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 50%;
  max-width: 500px;
  border-radius: 8px;
  background-color: rgb(20, 20, 20);
  color: rgb(107, 102, 102);
  /* border: 1px solid black; */
}
.inside{
  width: 100%;
  padding: 30px;
  color: rgb(206, 206, 206);
}
#exit {
  right: 0;
  padding-right: 50px;
  position: absolute;
  top: 0;
  padding-top: 30px;
}
.button {
  width: 150px;
  height: 50px;
  border-radius: 30px;
  text-align: center;
  position: absolute;
  right: 0;
  margin-right: 40px;
  margin-top: 30px;
}
.Addbutton {
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  width: 100px;
  height: 30px;
  color: rgb(0, 0, 0);
  position: absolute;
  right: 25px;
}
.Addbutton:hover {
  background-color: rgb(0, 0, 0);
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: white;

}
input {
  background-color: rgb(0, 0, 0);
  border-radius: 4px;
  /* border: 1px solid rgb(194, 202, 192); */
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
  color: rgb(248, 248, 248);
}
input:focus {
  color: white;

}

.dialoguetitle{
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(57, 57, 57);
  color: white;
  align-items: center;
  font-size: medium;
  padding: 5px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;


}

</style>
