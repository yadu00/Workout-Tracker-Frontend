<template>
  <div class="user-body">
    <aside class="user-sidenav">
      <div class="user-sidenav-header">
        <img
          :src="require('@/assets/logo.png')"
          alt=""
          style="width: 30px; height: 30px"
        />
      </div>
      <ul class="user-sidenav-links">
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
        <v-icon size="35px">mdi-logout</v-icon>
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

          <v-icon size="35px" class="notify">mdi-account-circle-outline</v-icon>
        </div>
       
      </div>
      <div class="div2">
        

        <div class="divinside">
          <div class="section1">
            <h2>BMI : {{ isNaN(Number(Bmi?.bmi)) ? 'N/A' : Number(Bmi.bmi).toFixed(2) }}</h2>
          </div>
          <div class="graph">
            <h1>Todays Workout</h1>
            <div class="card" v-for="(exercise, index) in exercises" :key="index">
           <p>{{ index+1 }}</p>
            <h3>{{ exercise.excercise_name }}</h3>
          </div>
          </div>
          
        </div>

        <div class="profile">

          <p>Current plan</p>
        </div>
        <div class="calendar-container">
          <div class="calendar">
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

     

      <div class="container2"></div>
      <div class="div3">
                  <ChartView :weightHistory="weightHistory" :targetWeight="targetWeight" class="chart" />

        <!-- <div class="box">
          <div class="s-week">
            <div class="s-weekday mon">Monday</div>
            <div class="s-weekday">Tuesday</div>
            <div class="s-weekday">Wednesday</div>
            <div class="s-weekday">Thursday</div>
            <div class="s-weekday">Friday</div>
            <div class="s-weekday">Saturday</div>
            <div class="s-weekday sun">Sunday</div>
          </div>
          <div class="work">
            <div class="workout first">rest</div>
            <div class="workout"></div>
            <div class="workout"></div>
            <div class="workout"></div>
            <div class="workout"></div>
            <div class="workout"></div>
            <div class="workout last"></div>
          </div>
        </div> -->
        <div class="plan">
            hi
        </div>
      </div>
    </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartView from '@/components/User/ChartView.vue'
export default {
  components: {
    ChartView
  },
  data() {
    return {
      // heightMarks: Array.from({ length: 251 }, (_, i) => i), // Height range: 0 to 250
      // weightMarks: Array.from({ length: 251 }, (_, i) => i), // Weight range: 0 to 250
      // selectedHeightMark: 150,
      // selectedWeightMark: 50,
      
      weightHistory: [80, 78, 77, 76, 74], // example weights
      targetWeight: 70,
    
      user: {
        name: "",
      },
      Bmi:{
        bmi: "",
      },
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
    };
  },
  mounted() {
    this.checkFirstLogin();
    this.updateCalendar();
    this.viewBmi();
    this.fetchProfile();
    this.fetchTodaysWorkout();

  },
  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  methods: {
  checkFirstLogin() {
    const userKey = `firstLogin_${this.$store.state.auth?.user_id}`;
    if (localStorage.getItem(userKey) === "true") {
      this.$router.push("/welcome");
    } else {
      this.$router.push("/userHome");
    }
  },
  logout() {
    this.$store.commit("logout");
    this.$router.push("/userlogin");
  },
  async fetchProfile() {
    try {
      const user_id = this.getuser_id;
      if (!user_id) {
        console.error("User ID is not available.");
        this.$router.push("/userlogin");
        return;
      }

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
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    this.firstDay = firstDay === 0 ? 6 : firstDay - 1;
    this.totalDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
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
    const payload = {
      user_id: this.getuser_id,
      workoutdate: today.toISOString().split('T')[0],
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
},
}
</script>

<style scoped>
.v-main {
  background-color: #d8d8d8;
  /* padding-left: 20px; */
  height: 100vh;
  /* padding-top: 20px; */
}

.user-body {
  background-color: #cccccd;
  padding-left: 20px;
  height: 100vh;
  width: 100%;

  /* padding-top: 20px; */
}

.user-sidenav {
  position: fixed;
  width: 260px;
  background-color: #0f0081;

  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 655px;
  border-radius: 30px;
  margin-top: 20px;
  /* border-top-left-radius: 30px;
  border-bottom-left-radius: 30px; */
  /* box-shadow: 2px 2px 25px rgb(212, 255, 0); */
}
/* .sidebar:hover{
  width: 260px;
} */

.user-sidenav-links li a {
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  padding: 15px 10px;
  white-space: nowrap;
  text-decoration: none;
  gap: 0 20px;
  margin-top: 15px;
  width: 260px;
  padding-left: 40px;
}

.user-sidenav-links {
  list-style: none;
  margin-top: 10px;
}

.user-sidenav-links li a:hover {
  /* background-color: rgb(26, 26, 26); */
  color: rgb(255, 255, 255);
  /* border-radius: 4px; */
}
.user-sidenav-links li img {
  width: 35px;
  height: 35px;
}
.user-sidenav-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-sidenav h2 {
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
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border-radius: 20px;
  border: none;
  height: 35px;
  width: 100px;
  /* cursor: pointer; */
}

#logoutbtn:hover {
  background-color: #f60000;
}
.main-content {
  position: fixed;
  width: calc(100% - 270px); /* 260px for sidebar + 20px margin */
  background-color: #cccccd;
  overflow-y: auto;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: 260px;

  padding: 10px;
  height: 100%;
  /* box-shadow: 2px 2px 5px rgb(212, 255, 0); */
}
.main-content::-webkit-scrollbar {
  display: none;
}

.user-sidenav-links .router-link-active {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff; /* Black text */
  /* border-radius: 4px; */
}

/* For exact match (useful for /dashboard vs /dashboard/details) */
.user-sidenav-links .router-link-exact-active {
  background-color: #cccccd;
  color: #000000 !important;
  /* border-top-left-radius: 25px;
  border-bottom-left-radius: 25px; */
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  position: relative;
  /* border-radius: 0px 0px 25px 0px; */
}
.user-sidenav-links .router-link-exact-active::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-top-right-radius: 20px;
  box-shadow: 5px -5px 0px 5px #cccccd;
}
.user-sidenav-links .router-link-exact-active::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0px 5px #cccccd;
}

.div1 {
  width: 97%;
  height: 80px;
  padding: 20px;
  border-radius: 25px;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  margin-left: 25px;
  background-color: #0f0081;
  margin: 20px;
  padding-left: 50px;
  
}
.div1 .icons{
  width: 80%;
  display: flex;
  justify-content: end;
}
.div1 .notify{
  margin-right: 20px;
}
.div2 {
  display: flex;
  height: 320px;
  /* justify-content: space-evenly; */
  padding-left: 50px;
}
.divinside {
  display: flex;
  flex-direction: column;
}
.div3 {
  width: 97%;
  height: 200px;
  padding: 20px;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  margin-left: 25px;
}
.chart{
  background-color: #dedede;
  border-radius: 25px;
  margin-left: 5px;


}
.plan{
  width: 70%;
  height: 190px;
  background-color: #dedede;
  border-radius: 25px;
  margin-left: 5px;
}
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile {
  height: 100%;
  width: 340px;
  border-radius: 25px;
  margin-left: 5px;
  margin-right: 5px;

  /* box-shadow: 0px 8px 16px 0px #00000033; */
  background-color: #dedede;
}
.profile p{
  width: 100%;
  font-size: 25px;
  text-align: center;
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
  background-color: #dedede;
  border-radius: 25px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0px 8px 16px 0px #00000033; */
 
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
  background-color: #dedede;
  /* box-shadow: 0px 8px 16px 0px #00000033; */
  margin-top: 10px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  
}
.graph h1{
  width: 100%;
  background-color: #202020;
  color: white;
  text-align: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}
.card{
  display: flex;
  align-items: center;
  justify-content: center;
}
.card p{
  font-size: 20px;
  margin-left: 95px;

}
.card h3{
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
  border-radius: 25px;
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); */
  text-align: center;
  overflow: hidden;
  background-color: #dedede;
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
  color: #333;
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
  background-color: #dedede;
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
  color: rgb(0, 0, 0);
}

.day.today {
  background: #15ff00;
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
</style>
