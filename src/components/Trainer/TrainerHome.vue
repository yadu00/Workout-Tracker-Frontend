<template>
  <div class="Trainerbody">
    <aside class="navbar">
      <div class="navbar-title">
        <img
          :src="require('@/assets/logo.png')"
          alt=""
          style="width: 30px; height: 30px"
        />
      </div>
      <ul class="navbar-links">
        <li>
          <router-link to="/TrainerViewUsers">
            <v-icon size="40px">mdi-view-dashboard-outline</v-icon>Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/AddExcercise">
            <v-icon size="40px">mdi-weight-lifter</v-icon>Exercises
          </router-link>
        </li>

        <li>
          <router-link to="/ScheduleWorkouts">
            <v-icon size="40px">mdi-account-multiple-outline</v-icon>Clients
          </router-link>
        </li>
        <li>
          <router-link to="/TrainerProfile">
            <v-icon size="40px">mdi-account-circle-outline</v-icon>Profile
          </router-link>
        </li>
      </ul>
      <div class="user-profile mt-auto p-4">
        <!-- <img :src="require('@/assets/img/logout.png')" alt="Logout"> -->
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["gettrainer_id"]),
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/Trainerlogin");
    },
  },
};
</script>

<style scoped>
.Trainerbody {
  /* display: flex; */
  background-color: rgb(255, 255, 255);
  /* padding-left: 20px; */
  height: 100vh;
  width: 100%;
  /* padding-top: 20px; */
}

.navbar {
  position: fixed;
  width: 260px;
  background-color: #ff8800;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 695px;
}

.maincontent {
  background-color: #252525;

  position: fixed;
  width: calc(100% - 270px);
  overflow-y: auto;

  margin-left: 260px;
  height: 100%;
  padding: 10px;
}

/* Sidebar Links */
.navbar-links li a {
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  padding: 15px 10px;
  white-space: nowrap;
  text-decoration: none;
  gap: 0 20px;
  margin-top: 15px;
  padding-left: 30px;
}

.navbar-links {
  list-style: none;
  /* margin-top: 10px; */
}

.navbar-links li a:hover {
  background-color: #414141;
  color: rgb(255, 255, 255);
  border-radius: 4px;
}

.navbar-links li img {
  width: 35px;
  height: 35px;
}

/* Sidebar Header */
.navbar-title {
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

#logoutbtn {
  text-align: center;
  background-color: rgb(245, 0, 0);
  color: aliceblue;
  border-radius: 4px;
  border: none;
  height: 45px;
  width: 150px;
  box-shadow: 0 6px 18px #000000;

  /* cursor: pointer; */
}

#logoutbtn:hover {
  background-color: #f60000;
}

/* For exact match (useful for /dashboard vs /dashboard/details) */
.navbar-links .router-link-exact-active {
  background-color: #414141;
  color: #ffffff !important;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 6px 18px #000000;

  /* border-radius: 0px 0px 25px 0px; */
}
</style>
