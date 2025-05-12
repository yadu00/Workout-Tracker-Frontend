<template>
  <div class="Trainerbody">
    <aside class="trainer-navbar">
      <div class="trainer-navbar-title">
        <img :src="require('@/assets/logo.png')" alt="" style="width: 30px; height: 30px;">
      </div>
      <ul class="trainer-navbar-links">
        <li>
          <router-link to="/TrainerViewUsers">
            <v-icon size="40px">mdi-view-dashboard-outline</v-icon>Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/AddExcercise">
            <img :src="require('@/assets/img/trainer.png')" alt="">Exercises
          </router-link>
        </li>
        
        <li>
          <router-link to="/ScheduleWorkouts">
            <v-icon size="40px">mdi-weight-lifter</v-icon>Clients
          </router-link>
        </li>
        <li>
          <router-link to="/TrainerProfile">
            <v-icon size="40px">mdi-account-circle-outline</v-icon>Profile
          </router-link>
        </li>
        <li>
          <router-link to="/TrainerPayments">
            <v-icon size="40px">mdi-credit-card</v-icon>Payments
          </router-link>
        </li>

      </ul>
      <div class="user-profile mt-auto p-4">
        <!-- <img :src="require('@/assets/img/logout.png')" alt="Logout"> -->
         <v-icon>mdi-logout</v-icon>
        <button id="logoutbtn" @click="logout">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="maincontent">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['gettrainer_id']),  // Map the getter directly
  },
  methods: {
  logout() {
    this.$store.commit('logout');         // Reset Vuex state + sessionStorage
    this.$router.push('/Trainerlogin');          // Redirect to login page
  }
}
}
</script>

<style scoped>
.v-main {
  background-color: #ffffff;
  /* padding-left: 20px; */
  height: 100vh;
  /* padding-top: 20px; */
}






.Trainerbody {
  /* display: flex; */
  background-color: rgb(255, 255, 255);
  /* padding-left: 20px; */
  height: 100vh;
  width: 100%;
  /* padding-top: 20px; */
  



}

.trainer-navbar {
  position: fixed;
  width: 260px;
  background-color: #1eff00;  
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 695px;
  border-radius: 30px;
  

}

.maincontent {
  position: fixed;
  width: calc(100% - 300px); /* 260px for sidebar + 20px margin */
  background-color: rgba(255, 255, 255, 0.968);
  overflow-y: auto;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: 260px;
  height: 695px;
  width: 100%;
  /* padding: 20px 30px; */
}





/* Sidebar Links */
.trainer-navbar-links li a {
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  padding: 15px 10px;
  white-space: nowrap;
  text-decoration: none;
  gap: 0 20px;
  margin-top: 15px;
  width: 260px;

}

.trainer-navbar-links {
  list-style: none;
  /* margin-top: 10px; */
}

/* .trainer-navbar-links li a:hover {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  /* border-radius: 25px; */
 
/* } */

.trainer-navbar-links li img {
  width: 35px;
  height: 35px;
}

/* Sidebar Header */
.trainer-navbar-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* User Profile Section */
.user-profile {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

#logoutbtn{
  text-align: center;
  background-color: black;
  color: aliceblue;
  border-radius: 20px;
  border: none;
  height: 35px;
  width: 100px;

  /* cursor: pointer; */
}

#logoutbtn:hover{
  background-color: #f60000;
}
.trainer-navbar-links .router-link-active {
  background-color: rgb(255, 255, 255);
  color: #000000; /* Black text */
  /* border-radius: 4px; */
}

/* For exact match (useful for /dashboard vs /dashboard/details) */
.trainer-navbar-links .router-link-exact-active {
  background-color: rgb(255, 255, 255);
  color: #000000 !important;
  /* border-top-left-radius: 25px;
  border-bottom-left-radius: 25px; */
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  position: relative;
  /* border-radius: 0px 0px 25px 0px; */

}
.trainer-navbar-links .router-link-exact-active::after{
  content: "";
  position: absolute;
  top: 100%;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-top-right-radius: 20px;
  box-shadow: 5px -5px 0px 5px rgb(255, 255, 255);
}
.trainer-navbar-links .router-link-exact-active::before{
  content: "";
  position: absolute;
  top: -20px;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0px 5px rgb(255, 255, 255);
}

</style>
