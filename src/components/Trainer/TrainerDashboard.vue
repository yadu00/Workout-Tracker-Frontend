<template>
  <div class="container">
    <div class="div1">
      <div class="cards">
        <div class="section1">
          <div class="one" v-if="users.length">
            <v-icon size="50px">mdi-account</v-icon>
            <h1>Clients {{ users.length }}</h1>
          </div>
          <div class="one" v-if="exercises.length">
            <v-icon size="50px">mdi-dumbbell</v-icon>
            <h1>Exercises {{ exercises.length }}</h1>
            <div class="editexercise">
              <router-link to="/AddExcercise" class="router"
                ><v-icon size="50px">mdi-plus-circle</v-icon></router-link
              >
            </div>
          </div>
        </div>
        <div class="section1">
          <div class="pendingschedule">
            <h1>Today's Pending Workout Schedule</h1>
            <div class="section2">
              <div
                class="daycard"
                v-for="(pending, index) in pendingschedule"
                :key="index"
              >
                <div class="daycards">
                  <div class="info">
                    <h4>{{ index + 1 }}</h4>
                  </div>
                  <div class="info">
                    <h4>{{ pending.name }}</h4>
                  </div>
                  <div class="info">
                    <router-link
                      :to="{
                        path: '/view',
                        query: { user_id: pending.user_id, name: pending.name },
                      }"
                    >
                      <button id="schedulebtn">Schedule</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <div class="div2">
      <div class="profile">
        <div class="title">
          <h1>Earning</h1>
        </div>
        <div class="content">
          <v-icon size="50px">mdi-currency-inr</v-icon>
          <h1>{{ trainer.salary }}/client</h1>
        </div>
      </div>
      <div class="payment">
        <div class="title">
          <h1>Subscribed Clients</h1>
          
        </div>
        <div class="paytitle head">
          <div class="paymenthead">
            <p style="font-weight: bold">Name</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Start Date</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Expiry</p>
          </div>
        </div>
        <div class="paytitle" v-for="(clients) in subscibedClients"
            :key="clients.id">
          <div class="paymenthead">
            <p style="font-weight: bold">{{clients.name}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{clients.subscriptionStart.split('T')[0]}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{clients.subscriptionEnd.split('T')[0]}}</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      users: [],
      pendingschedule: [],
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
      trainer: [],
      subscibedClients:[],
    };
  },
  computed: {
    ...mapGetters(["gettrainer_id"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),

    async loadUsers() {
      try {
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/viewClients",
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
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/fetchExercise",
          trainer_id
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
    async workoutNotScheduled() {
      try {
        const trainerId = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/workoutNotScheduled",
          trainerId
        );

        if (result.success) {
          this.pendingschedule = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
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
    async fetchTrainerProfile() {
      try {
        const id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/fetchTrainerProfile",
          id
        );
        if (result.success) {
          this.trainer = result.data;
        }
      } catch (error) {
        console.error("Error loading Profile:", error);
      }
    },
    async Subscribedclients() {
      try {
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/Subscribedclients",
          trainer_id
        );
        if (result.success) {
          this.subscibedClients = result.data;
        }
      } catch (error) {
        console.error("Error loading Profile:", error);
      }
    },
    
  },
  mounted() {
    this.loadUsers();
    this.fetchExercises();
    this.updateCalendar();
    this.workoutNotScheduled();
    this.fetchTrainerProfile();
    this.Subscribedclients();
  },

  gotoschedule(user_id) {
    this.$router.push("/view", user_id);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
}
.div1 {
  display: flex;
  width: 100%;
  height: auto;
}
.cards {
  display: flex;
  flex-direction: column;
  width: 65%;
  height: auto;
}
.section1 {
  width: 100%;
  height: auto;
  /* background-color: blue; */
  /* padding: 20px; */
  display: flex;
  margin-bottom: 5px;
  overflow-y: hidden;
}
.one {
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-right: 5px;
}
.router {
  color: #e97c00;
}
.router:hover {
  color: #ff8800;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
.editexercise {
  width: 100%;
  display: flex;
  justify-content: end;
  color: #51ff00;
}
.pendingschedule {
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-right: 5px;
  
}


.calendar {
  width: 35%;
  height: 405px;
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
  color: #ff8800;
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
  background-color: #ff8800;
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

.div2 {
  display: flex;
  width: 100%;
  height: auto;
}
.profile {
  width: 32%;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}
.payment {
  width: 68%;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;

}
.payment::-webkit-scrollbar{
  display: none;
}

.paytitle {
 display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.head{
  background-color: #111;
  font-weight: bold;
  border-radius: 10px;
}
.paymenthead{
   flex: 1 1 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paymentbody {
 flex: 1 1 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  width: 100%;
  display: flex;
  
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #40ff00;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.section2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%; 
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px;



}

.section2::-webkit-scrollbar {
  display: none; 
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

#schedulebtn {
  width: 100px;
  height: 30px;
  background-color: #c66a00;
  border-radius: 20px;
  color: black;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
#schedulebtn:hover {
  background-color: #ff8800;
}
</style>
