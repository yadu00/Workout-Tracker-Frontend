<template>
  <div class="body">
    <aside class="sidenav">
      <div class="sidenav-header">
        <img
          :src="require('@/assets/logo.png')"
          alt=""
          style="width: 30px; height: 30px"
        />
      </div>
      <ul class="sidenav-links">
        <li>
          <router-link to="/userHome">
            <v-icon size="35px">mdi-view-dashboard-outline</v-icon>Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/viewTrainer">
            <v-icon size="35px">mdi-account-tie</v-icon>Trainer
          </router-link>
        </li>

        <li>
          <router-link to="/viewworkouts">
            <v-icon size="35px">mdi-weight-lifter</v-icon>Workouts
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <v-icon size="35px">mdi-account-circle-outline</v-icon>Profile
          </router-link>
        </li>
        <li>
          <router-link to="/report">
            <v-icon size="35px">mdi-chart-donut</v-icon>Reports
          </router-link>
        </li>
        <li>
          <router-link to="/payments">
            <v-icon size="35px">mdi-credit-card</v-icon>Payments
          </router-link>
        </li>
      </ul>
      <div class="user-profile mt-auto p-4">
        <!-- <img :src="require('@/assets/img/logout.png')" alt="Logo"> -->
        <!-- <v-icon size="35px">mdi-logout</v-icon> -->
        <button id="logoutbtn" @click="logout">Logout</button>
      </div>
    </aside>

    <div class="main-content">
      <router-view v-if="$route.path !== '/userHome'"></router-view>
      <template v-else>
        <div class="div1">
          <h1>Welcome {{ user.name }}</h1>
          <div class="icons">
            <v-icon size="35px" class="notify">mdi-bell-ring</v-icon>

            <v-icon size="35px" class="notify"
              >mdi-account-circle-outline</v-icon
            >
          </div>
        </div>
        <div class="div2">
          <div class="divinside">
            <div class="section1 bg">
              <h2>
                BMI :
                {{
                  isNaN(Number(Bmi?.bmi)) ? "N/A" : Number(Bmi.bmi).toFixed(2)
                }}
              </h2>
            </div>
            <div class="graph">
              <h1>Todays Workout</h1>
              <div class="workoutday">
                <div class="workoutday-card">
                  <h4>{{ workoutday.day }}</h4>
                  <p>{{ workoutday.workoutName }}</p>
                  <!-- <p>{{ workoutday.date }}</p> -->
                </div>
              </div>
            </div>
          </div>

          <div class="profile bg">
            <h1>Current plan</h1>
            <div class="payment-container">
              <div class="content">
                <p>{{ payment.salary }}/Month</p>
              </div>
              <div class="startdate">
                <h2>Start Date </h2>
                <h2>{{ formatDate(subscription.subscriptionStart) }}</h2>
              </div>
              <div class="startdate">
                <h2>Expiry </h2>

                <h2>{{ formatDate(subscription.subscriptionEnd) }}</h2>
              </div>
            </div>
          </div>
          <div class="calendar-container">
            <div class="calendar bg">
              <div class="selectors">
                <div class="month-display">
                  <h2>{{ months[selectedMonth] }} {{ selectedYear }}</h2>
                </div>
              </div>
              <div class="weekdays">
                <div class="weekday" v-for="day in weekdays" :key="day">
                  {{ day }}
                </div>
              </div>
              <div class="days">
                <div
                  v-for="empty in firstDay"
                  :key="'empty' + empty"
                  class="day empty"
                ></div>
                <div
                  v-for="day in totalDays"
                  :key="day"
                  class="day"
                  :class="{
                    today: isToday(day),
                    marked: markedDays.includes(day),
                  }"
                >
                  {{ day }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="div3">
          <div class="plan bg">
            Todays Exercises
            <div class="section2">
              <div
                class="daycard"
                v-for="(exercise, index) in exercises"
                :key="index"
              >
                <div class="daycards">
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
                </div>
              </div>
            </div>
          </div>
          <ChartView
            :weightHistory="weightHistory"
            :targetWeight="targetWeight"
            class="chart bg"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartView from "@/components/User/ChartView.vue";
export default {
  components: {
    ChartView,
  },
  data() {
    return {
     

      weightHistory: [], 
      targetWeight: '',

      user: {
        name: "",
      },
      Bmi: {
        bmi: "",
      },
      subscription: [],
      payment: [],

      exercises: [],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      years: Array.from({ length: 31 }, (_, i) => 2000 + i),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      markedDays: [],
      firstDay: 0,
      totalDays: 0,
      workoutday: {
        date: "",
        workoutName: "",
      },
    };
  },
  mounted() {
    this.updateCalendar();
    this.viewBmi();
    this.fetchProfile();
    this.fetchTodaysWorkout();
    this.workouttoday();
    this.fetchmonthlypayment();
    this.SubscribedPlan();
  },
  computed: {
    ...mapGetters(["getuser_id"]), 
  },
  methods: {
    
    logout() {
      this.$store.commit("logout");
      this.$router.push("/userlogin");
    },
    async fetchProfile() {
      try {
        const user_id = this.getuser_id;
        // if (!user_id) {
        //   console.error("User ID is not available.");
        //   this.$router.push("/userlogin");
        //   return;
        // }

        const result = await this.$store.dispatch("User/fetchProfile", user_id);
        if (result.success) {
          this.user = result.data;
          console.log("API Response:", result.data);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Profile:", error);
      }
    },
    updateCalendar() {
      const firstDay = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).getDay();
      this.firstDay = firstDay === 0 ? 6 : firstDay - 1;
      this.totalDays = new Date(
        this.selectedYear,
        this.selectedMonth + 1,
        0
      ).getDate();
    },
    isToday(day) {
      const today = new Date();
      return (
        today.getFullYear() === this.selectedYear &&
        today.getMonth() === this.selectedMonth &&
        today.getDate() === day
      );
    },
    async viewBmi() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/viewBmi", payload);
        if (result.success) {
          this.Bmi = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
    
    async fetchTodaysWorkout() {
      try {
       const today = new Date();
const localDate = today.toLocaleDateString("en-CA"); // YYYY-MM-DD

const payload = {
  user_id: this.getuser_id,
  date: localDate,
};

        const result = await this.$store.dispatch(
          "User/fetchTodaysWorkout",
          payload
        );

        console.log("Fetched Exercises:", result);

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
    async workouttoday() {
      try {
        const today = new Date();
const localDate = today.toLocaleDateString("en-CA");

const payload = {
  user_id: this.getuser_id,
  date: localDate,
};
        const result = await this.$store.dispatch(
          "User/fetchworkouttoday",
          payload
        );

        if (result.success) {
          this.workoutday = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading weeks:", error);
      }
    },

    async fetchmonthlypayment() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch(
          "User/fetchmonthlypayment",
          payload
        );

        if (result.success) {
          this.payment = result.data;
          console.log("Full .data:", result.data);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading payment:", error);
      }
    },

    async SubscribedPlan() {
      try {
        const user_id = this.getuser_id;
        const result = await this.$store.dispatch(
          "User/SubscribedPlan",
          user_id
        );

        if (result.success) {
          this.subscription = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    formatDate(dateTime) {
      if (!dateTime) return "";
      return dateTime.split("T")[0];
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #ffffff;
  /* padding-left: 20px; */
  height: 100vh;
  width: 100%;

  /* padding-top: 20px; */
}

.sidenav {
  position: fixed;
  width: 260px;
  background-color: #d73900;

  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 100%;
  /* border-radius: 10px; */
  /* margin-top: 20px; */
  /* border-top-left-radius: 30px;
  border-bottom-left-radius: 30px; */
  /* box-shadow: 2px 2px 25px rgb(212, 255, 0); */
}
/* .sidebar:hover{
  width: 260px;
} */

.sidenav-links li a {
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  padding: 15px 10px;
  white-space: nowrap;
  text-decoration: none;
  gap: 0 20px;
  margin-top: 15px;
  padding-left: 40px;
}

.sidenav-links {
  list-style: none;
  margin-top: 10px;
}

.sidenav-links li a:hover {
  /* background-color: rgb(26, 26, 26); */
  color: #000000;
  border-radius: 4px;
  background-color: #f4e409;
}
.sidenav-links li img {
  width: 35px;
  height: 35px;
}
.sidenav-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidenav h2 {
  font-size: large;
  color: beige;
  margin-left: 25px;
}
.user-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.user-profile img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-right: 25px;
}
#logoutbtn {
  text-align: center;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  border: none;
  height: 45px;
  width: 150px;
  box-shadow: 0 6px 18px #000000;

  /* cursor: pointer; */
}

#logoutbtn:hover {
  background-color: #620000;
  box-shadow: 0 6px 18px #6a0000;
}
.main-content {
  position: fixed;
  width: calc(100% - 270px); /* 260px for sidebar + 20px margin */
  /* background-color: #252525; */
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);

  overflow-y: auto;
  /* border-top-right-radius: 30px;
  border-bottom-right-radius: 30px; */
  margin-left: 260px;

  /* padding: 10px; */
  height: 100%;
  /* box-shadow: 2px 2px 5px rgb(212, 255, 0); */
}
.main-content::-webkit-scrollbar {
  display: none;
}

/* For exact match (useful for /dashboard vs /dashboard/details) */
.sidenav-links .router-link-exact-active {
  background-color: #f4e409;
  box-shadow: 0 6px 18px #000000;

  color: #000000 !important;
  /* border-top-left-radius: 25px;
  border-bottom-left-radius: 25px; */
  border-radius: 4px;
  position: relative;
  /* border-radius: 0px 0px 25px 0px; */
}

.div1 {
  width: 100%;
  height: 80px;
  padding: 20px;
  /* border-radius: 25px; */
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  /* margin-left: 25px; */
  /* background-color: #F4E409; */
  /* margin: 20px; */
  padding-left: 50px;
}
.div1 h1{
  width: 50%;
}
.div1 .icons {
  width: 50%;
  display: flex;
  justify-content: end;
}
.div1 .notify {
  margin-right: 20px;
}
.div2 {
  display: flex;
  height: 340px;
  /* justify-content: space-evenly; */
  padding-left: 50px;
}
.divinside {
  display: flex;
  flex-direction: column;
}
.div3 {
  width: 100%;
  height: 250px;
  padding: 5px;
  color: rgb(0, 0, 0);
  display: flex;
  padding-left: 50px;
}
.chart {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-left: 5px;
  width: 400px;
  height: 220px;
}
.plan {
  width: 62.4%;
  height: 220px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  overflow-y: hidden;
}

.profile {
  height: 100%;
  width: 340px;

  margin-left: 5px;
  margin-right: 5px;

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  /* padding: 20px; */
  color: #d73900;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.bg {
  /* background-color: #040404; */
  /* box-shadow: 0px 2px 5px 0px#ffffff; */
}
.profile h1 {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  color: #ff4c29;
  text-align: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.container2 {
  display: flex;
  height: auto;
  width: auto;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}
.section1 {
  height: 100px;
  width: 400px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.section1 h2 {
  color: #ff4c29;
}
.section3 {
  height: auto;
  width: auto;
  border-radius: 25px;
  margin-left: 10px;
}

.graph {
  height: 300px;
  width: 400px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}
.graph h1 {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  color: #ff4c29;
  text-align: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card p {
  font-size: 20px;
  margin-left: 95px;
}
.card h3 {
  font-size: 20px;
  width: 50%;
  margin-left: 5px;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffffb4;
  font-family: Arial, sans-serif;
  flex-direction: column;
}

.scroll-container {
  height: 390px;
  width: 480px;
  box-shadow: 2px 2px 5px black;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background-color: rgb(0, 0, 0);
  padding: 50px 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  color: white;
}
.height {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.weight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

/* Vertical Scrollbox (Height) */
.vertical-scroll-container {
  position: relative;
  width: 100px;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #202020;
  box-shadow: 0px 8px 16px 0px #00000033;
}

.scroll-box.vertical {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-box.vertical::-webkit-scrollbar {
  display: none;
}

.center-line.vertical {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 10;
}

.marks-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.mark-item {
  font-size: 14px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  color: #757575;
  transition: transform 0.5s ease;
}

.mark-item::after {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  background-color: #12659d;
  margin-left: 10px;
}

.highlighted {
  font-weight: bold;
  color: #ff1900;
  transform: scale(1.1) !important;
  transition: transform 0.5s ease !important;
}

.selected-mark-display {
  font-size: 15px;
  margin-top: 10px;
  font-weight: bold;
  color: #ffffff;
}

/* Horizontal Scrollbox (Weight) */
.horizontal-scroll-container {
  position: relative;
  width: 300px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #202020;
  box-shadow: 0px 8px 16px 0px #00000033;
}

.scroll-box.horizontal {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  position: relative;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-box.horizontal::-webkit-scrollbar {
  display: none;
}

.center-line.horizontal {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  z-index: 10;
  transform: translateX(-50%);
}
.marks-list.horizontal {
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* Ensure scrolling starts from the left */
  align-items: center;
  gap: 10px;
  width: max-content; /* Ensures the width is based on content size */
}

.mark-item1 {
  font-size: 18px;
  width: 30px; /* Adjust width for horizontal layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #757575;
  transition: transform 0.5s ease;
  margin-top: 30px;
}

.mark-item1::after {
  content: "";
  display: block;
  width: 2px;
  height: 40px;
  margin-left: 10px;
}

.cards {
  height: 290px;
  width: 400px;
  display: flex;
  border-radius: 20px;
  background-color: #000000;
  color: white;
  flex-direction: column;
  margin-bottom: 10px;
  transition: 1s ease;
  box-shadow: 0px 8px 16px 0px #00000033;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.three {
  height: 200px;
  width: 200px;
  border-radius: 100px;
}

.box {
  width: 100%;
  height: 100%;
  border-radius: 25px;
}
.s-week {
  width: 100%;
  height: 30%;
  /* border: 2px solid black; */
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: flex;
}
.work {
  width: 100%;
  height: 70%;
  /* border: 2px solid black; */
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
}

.s-weekday {
  background-color: rgb(0, 0, 0);
  width: 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  border-left: 1px solid white;
}
.mon {
  border-top-left-radius: 25px;
}
.sun {
  border-top-right-radius: 25px;
}

.workout {
  background-color: #373636;
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  border-left: 1px solid rgb(0, 0, 0);
  font-size: 25px;
}
.first {
  border-bottom-left-radius: 25px;
  border: none;
}
.last {
  border-bottom-right-radius: 25px;
}

.calendar-container {
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  border-radius: 20px;
  /* box-shadow: 0px 8px 16px 0px #00000033; */
}
.select {
  padding: 8px 12px;
  margin: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #fff;
  transition: all 0.3s ease;
}
.select:focus {
  border-color: #47db34;
  outline: none;
}
.calendar {
  width: 100%;
  height: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  text-align: center;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.month-display {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
h2 {
  font-size: 24px;
  color: #ff4c29;
  text-align: center;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 15px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 15px;
  /* padding-left: 20px; */
}
.day {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  /* box-shadow: 1px 1px 2px black; */
  background-color: #ff4c29;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  /* margin-left: 25px; */
  overflow-x: hidden;
  scroll-behavior: smooth;
  color: rgb(0, 0, 0);
  font-size: 20px;
}
.weekday {
  color: rgb(255, 255, 255);
}

.day.today {
  background: #ffffff;
  color: rgb(0, 0, 0);
}
.day:hover {
  background: #f9f9f9;
  color: rgb(0, 0, 0);
}
.marked {
  background: #e74c3c;
  color: white;
}
.empty {
  background: transparent;
  cursor: default;
}
.selectors {
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.section2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%; /* or set a fixed height like 400px */
  overflow-y: auto;
  padding: 5px;

  /* Hide scrollbar for WebKit browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.section2::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.daycard {
  background: rgba(65, 65, 65, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  /* width: 90; */
}

.daycard:hover {
  transform: scale(1.02);
}

.daycards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info {
  flex: 1 1 120px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.workoutday {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.workoutday-card {
  background: rgba(0, 0, 0, 0.205);
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
  width: 90%;
  font-size: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.workoutday-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.workoutday-card h4 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.content {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #e7e7e7;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  font-size: 30px;
}
.startdate{
   border-radius: 12px;
  padding: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
    margin-top: 10px;

  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
