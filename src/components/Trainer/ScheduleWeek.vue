<template>
  <div class="body">
    <div class="heading">
      <h1>Schedule Workout</h1>
    </div>
    <div class="content">
      <div class="content-addbtn">
        <button id="addworkout" @click="workoutnameDialog = true">Add Week</button>
      </div>

      <div class="weeks">
        <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="week-container">
          <h3>{{ week.weekNumber }}</h3>

          <div class="days">
            <div v-for="(day, dayIndex) in week.days" :key="dayIndex" class="day-card">
              <h4>Day {{ dayIndex + 1 }}</h4>
              <p>{{ day.name }}</p>
              <router-link :to="{ path: '/sch', query: { weekdayId: day.weekdayId,user_id: user_id } }">
                <button id="selectday">Schedule Workout</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Dialog for Workout Names for Each Day -->
    <v-dialog v-model="workoutnameDialog" max-width="500px">
      <v-card class="custom-dialog-card">
        <v-card-title class="custom-dialog-title">Add Workouts for Each Day</v-card-title>

        <div v-for="(name, index) in weekNames" :key="index">
          <v-text-field
            v-model="weekNames[index]"
            :label="`Workout Name for Day ${index + 1}`"
            variant="outlined" class="input"
          ></v-text-field>
        </div>

        <v-card-actions>
          <v-btn color="red" text @click="workoutnameDialog = false">Cancel</v-btn>
          <v-btn color="green" @click="addWeekDay">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      workoutnameDialog: false,
      weeks: [],
      weekNames: Array(7).fill(""), // Different names for each day
      currentWeek: 1,
      user_id: null, // Initialize user_id
    };
  },
  computed:{
      ...mapGetters(['gettrainer_id']),
      trainer_id(){
        return this.gettrainer_id;
      }
  },
  created() {
    this.user_id = this.$route.query.user_id; // Get user_id from URL
  },
  methods: {
    
    async addWeekDay() {
      if (this.weekNames.some(name => !name.trim())) {
        alert("Please enter a workout name for each day.");
        return;
      }

      const newWeek = {
        weekNumber: this.currentWeek,
        days: this.weekNames.map((name, i) => ({ day: `Day ${i + 1}`, name })),
      };

      const trainer_id=this.gettrainer_id;
      console.log(trainer_id);
      
      const weekData = this.weekNames.map((name, i) => ({
        week: `Week ${this.currentWeek}`,
        day: `Day ${i + 1}`,
        name,
        user_id: this.user_id, // Include user_id when sending data
        trainer_id : this.gettrainer_id,
        
        // Include trainer_id from Vuex
      }));

      try {
        const result = await this.$store.dispatch("Trainer/addWeekDay", weekData);
        if (result.success) {
          this.weeks.push(newWeek);
          this.currentWeek += 1;
          this.workoutnameDialog = false;
          this.weekNames = Array(7).fill(""); // Reset names after adding
          alert("Week added successfully!");
        } else {
          alert(`Failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error adding week:", error);
        alert("Unexpected error while adding the week.");
      }
    },

    async loadWeekdays() {
  try {
    const payload = { user_id: this.user_id };
    const result = await this.$store.dispatch("Trainer/loadWeekdays", payload);
    
    if (result.success) {
      const weekMap = {}; // Object to store weeks and their days

      result.data.forEach(item => {
        if (!weekMap[item.week]) {
          weekMap[item.week] = { 
            weekNumber: item.week, 
            days: [] 
          };
        }
        weekMap[item.week].days.push({
          day: item.day,
          name: item.name,
          weekdayId: item.weekdayId,
        });
      });

      // Convert weekMap object into an array
      this.weeks = Object.values(weekMap);
      this.currentWeek = this.weeks.length + 1;
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Error loading weeks:", error);
  }
}
,
  },
  mounted() {
    this.loadWeekdays();
  },
};
</script>


<style>
.body {
  width: 100%;
  height: 100%;
  background-color: rgb(162, 255, 68);
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
}
.body::-webkit-scrollbar {
  display: none;
}
.body h1 {
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
}
.content-addbtn {
  display: flex;
  justify-content: end;
}
#addworkout {
  width: 200px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: none;
}
.weeks {
  margin-top: 20px;
}
.week-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
.days {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.day-card {
  width: 200px;
  height: 150px;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.day-card:hover {
  background-color: rgb(6, 6, 6);
  color: white;
}
#selectday {
  width: 150px;
  height: 30px;
  border-radius: 25px;
  background-color: white;
  border: 1px solid black;
  color: #000;
}
.input{
  margin-left: 20px;
  margin-right: 20px;

}
</style>
