<template>
  <div class="container">
    <h1>Clients</h1>
    <div class="info head">
      <div class="title">
        Sl No
      </div>
      <div class="title">
        Name
      </div>
      <div class="title">
        Email
      </div>
      <div class="title">
        Gender
      </div>
      <div class="title">
        Weight
      </div>
      <div class="title">
        Bmi
      </div>
      <div class="title">
        Schedule
      </div>
    </div>
    
    <div v-if="users.length" class="card">
        <div v-for="(user, index) in users" :key="user.id"  class="info">
          <div class="title">
            <p>{{ index + 1 }}</p>
      </div>
      <div class="title">
        <p>{{ user.name }}</p>
      </div>
      <div class="title">
        <p>{{ user.email }}</p>
      </div>
      <div class="title">
        <p>{{ user.gender_name }}</p>
      </div>
      <div class="title">
        <p>{{ user.weight }}</p>
      </div>
      <div class="title">
        <p>{{ user.bmi }}</p>
      </div>
      <div class="title">
        <div class="schedulebtn">
          <router-link :to="{ path: '/view', query: { user_id: user.user_id } }">
          <button id="selectuser">Schedule Workout</button>
        </router-link>
      </div>
      </div>
        
        
       

        </div>
      
    </div>
    <p v-else>No users found.</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
      
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

    scheduleWorkout(user_id) {
      this.$store.dispatch("User/goToScheduleWorkout", user_id);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.container {
  width: 82.5%;
  height: 100%;
  margin-left: 10px;
}
.container h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.info{
  width: 100%;
  height: 50px;
  display: flex;
  border: 1px solid black;
  margin: 5px;

}
.head{
  background-color: rgb(57, 189, 0);
  color: white;
}
.title{
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.card{
  width: 100%;
  height: 100%;
}
.usrbox {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgb(0, 0, 0);
  color: rgb(174, 174, 174);
  border-radius: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

}
.usrbox .profile{
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.usrbox .info{
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.usrbox .schedulebtn{
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.usrbox:hover {
  background-color: rgb(77, 77, 77);
  color: rgb(0, 0, 0);
}


#selectuser {
  background-color: rgb(0, 42, 255);
  color: rgb(255, 255, 255);
  width: 150px;
  height: 40px;
  border-radius: 25px;
}
</style>
