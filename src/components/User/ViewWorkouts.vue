<template>
  <div class="body">
    <div class="heading">
      <h1>Scheduled Workouts</h1>
    </div>

    <div class="weeks">
      <div
        v-for="(week, weekIndex) in weeks"
        :key="weekIndex"
        class="week-container"
      >
        <h3>{{ week.weekNumber }}</h3>

        <div class="days">
          <div
            v-for="(day, dayIndex) in week.days"
            :key="dayIndex"
            class="day-card"
          >
            <h4>Day {{ dayIndex + 1 }}</h4>
            <p>{{ day.name }}</p>
            <router-link
              :to="{
                path: '/viewExercises',
                query: { weekdayId: day.weekdayId },
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
      weeks: [],
      weekNames: Array(7).fill(""), // Different names for each day
      currentWeek: 1,
      user_id: null, // Initialize user_id
    };
  },
  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  methods: {
    async loadWeekdays() {
      try {
        const payload = { user_id: this.getuser_id };
        const result = await this.$store.dispatch("User/loadWeekdays", payload);

        if (result.success) {
          const weekMap = {}; // Object to store weeks and their days

          result.data.forEach((item) => {
            if (!weekMap[item.week]) {
              weekMap[item.week] = {
                weekNumber: item.week,
                days: [],
              };
            }
            weekMap[item.week].days.push({
              day: item.day,
              name: item.name,
              weekdayId: item.weekdayId,
              status: false,
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
    },
  },
  mounted() {
    this.loadWeekdays();
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  /* background-color: rgb(161, 254, 0); */
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  color: white;
}
.body::-webkit-scrollbar {
  display: none;
}
.body h1 {
  text-align: center;
  color: #000;
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
  background-color: rgb(61, 61, 61);
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
  width: 158px;
  height: 150px;
  background-color: rgb(0, 0, 0);
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


</style>
