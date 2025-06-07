<template>
  <div class="body">
    <div class="heading">
      <h1>Scheduled Workouts</h1>
    </div>
    <div class="today">
      <h1>Today's Workout</h1>
      <div class="today-container">
        <div class="today-card" v-if="day && day.workoutName">
        <!-- <div
            v-for="(day, dayIndex) in day"
            :key="dayIndex"
            class="day-card"
          > -->
        <h4>{{ day.day }}</h4>
        <p>{{ day.workoutName }}</p>
        <p>{{ day.date }}</p>
        <router-link
          :to="{
            path: '/viewExercises',
            query: { id: day.id },
          }"
        >
          <button id="selectday">View Workout</button>
        </router-link>
      </div>
      <div v-else>
        <p>No workout added today.</p>
      </div>
      </div>
      
      
    </div>

    <div class="weeks">
      <h1>All Workout</h1>
      <div class="week-container">
        <!-- <h3>{{ week.weekNumber }}</h3> -->

        <div class="days">
          <div
            v-for="(day, dayIndex) in daycards"
            :key="dayIndex"
            class="day-card"
          >
            <h4>{{ day.day }}</h4>
            <p>{{ day.workoutName }}</p>
            <p>{{ day.date }}</p>
            <router-link
              :to="{
                path: '/viewExercises',
                query: { id: day.id },
              }"
            >
              <button id="selectday">View Workout</button>
            </router-link>
          </div>
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
      user_id: null,
      date: "",
      workoutName: "",
      daycards: [],
      day: {
        date: "",
        workoutName: "",
      },
      today: new Date(),
    };
  },
  computed: {
    ...mapGetters(["getuser_id"]), 
  },
  methods: {
    async loadWeeklyWorkouts() {
      try {
        const payload = { user_id: this.getuser_id };
        const result = await this.$store.dispatch(
          "User/loadWeeklyWorkouts",
          payload
        );

        if (result.success) {
          this.daycards = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading weeks:", error);
      }
    },

    async fetchworkouttoday() {
      try {
        const payload = {
          user_id: this.getuser_id,
          date: this.today.toISOString().split("T")[0],
        };
        const result = await this.$store.dispatch(
          "User/fetchworkouttoday",
          payload
        );

        if (result.success) {
          this.day = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading weeks:", error);
      }
    },
  },
  mounted() {
    this.loadWeeklyWorkouts();
    this.fetchworkouttoday();
  },
};
</script>
<style scoped>
.body {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  font-family: "Segoe UI", sans-serif;
  color: #f4f4f4;
}

.heading h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.today {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-left: 15px;
}
.today h1{
  text-align: center;
}
.weeks {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.week-container {
  background: rgba(70, 70, 70, 0.07);
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
.today-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.today-card {
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
  width: 265px;
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
  width: 165px;
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
</style>
