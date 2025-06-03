<template>
  <div class="body">
    <div class="heading">
      <h1>Schedule Workout</h1>
    </div>
    <div class="content">
      <div class="name">
        <h2>Client Name : {{name}}</h2>
      </div>
      <div class="content-addbtn">
        <button id="weekschedule" @click="workoutnameDialog = true">Schedule Day</button>
      </div>

      <div class="weeks">
        <div class="week-container">
          <!-- <h3>{{ week.weekNumber }}</h3> -->

          <div class="days">
            <div v-for="(day, dayIndex) in daycards" :key="dayIndex" class="day-card">
              <h4>{{ day.day }}</h4>
              <p>{{ day.workoutName }}</p>
              <p>{{ day.date }}</p>
              <router-link :to="{ path: '/sch', query: { id: day.id, user_id: user_id } }">
                <button id="selectday">Schedule Workout</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vuetify Dialog -->
    <v-dialog v-model="workoutnameDialog" max-width="500">
      <v-card>
        <v-card-title>Add Daily Workout</v-card-title>
       <v-card-text>
  <v-form @submit.prevent="addWeekDay">
   
     
        <v-text-field 
            v-model="form.date"
            label="Date"
            type="date"
            outlined:max="maxDate"
            required
            variant="outlined"
            ></v-text-field>
    

    <!-- Workout Name -->
    <v-text-field
      v-model="form.workoutName"
      label="Workout Name"
      required
    ></v-text-field>
  </v-form>
</v-card-text>
 <v-card-actions>
          <v-btn color="red" text @click="workoutnameDialog = false"
            >Cancel</v-btn
          >
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
      daycards: [],
      currentWeek: 1,
      user_id: null,
          datePickerMenu: false,

      form: {
        date: '',
        workoutName: '',
      },
      weeks: [], // Make sure this is defined if you loop through it
    };
  },
  computed: {
    ...mapGetters(['gettrainer_id']),
    trainer_id() {
      return this.gettrainer_id;
    },
   
  },
  created() {
    this.user_id = this.$route.query.user_id;
    this.name = this.$route.query.name;

  },
  methods: {
    async addWeekDay() {
      try {
        const payload = {
          trainer_id: this.trainer_id,
          user_id: this.user_id,
          date: this.form.date,
  workoutName: this.form.workoutName,
        };
        const result = await this.$store.dispatch('Trainer/dailyworkouts', payload);
        if (result.success) {
          this.workoutnameDialog = false;
          this.loadWeekdays(); // Refresh list
          alert('Day added successfully!');
        } else {
          alert(`Failed: ${result.error}`);
        }
      } catch (error) {
        console.error('Error adding week:', error);
        alert('Unexpected error while adding the week.');
      }
    },

    async loadWeekdays() {
      try {
        const payload = { user_id: this.user_id };
        const result = await this.$store.dispatch('Trainer/loaddaylyworkouts', payload);
        if (result.success) {
          this.daycards = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error loading weeks:', error);
      }
    },
  },
  mounted() {
    this.loadWeekdays();
  },
};
</script>



<style scoped>
.body {
  min-height: 100vh;
  /* background: linear-gradient(135deg, #1f1c2c, #928dab); */
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #f4f4f4;
}

.heading h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}
.name{
  margin-left: 150px;
  margin-bottom: 50px;
}
.weeks {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.week-container {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
}

.week-container h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #a0e0ff;
}

.days {
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  
}

.day-card {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  
}

.day-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.day-card h4 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

#selectday {
  background-color: #e64900;
  color: black;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
}

#selectday:hover {
  background-color: #c80000;
}
#weekschedule{
   background-color: #2793d6;
   width: 150px;
   height: 40px;
   margin-bottom: 10px;
   border-radius: 4px;
}
</style>
