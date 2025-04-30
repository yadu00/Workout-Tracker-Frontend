<template>
    <div class="Adminbody">
      <aside class="sidebar">
        <div class="sidebar-header">
          <img :src="require('@/assets/img/adminlogo.png')" alt="" style="width: 100px;height: 100px;">
          <h1>{{  }}Admin</h1>
  
        </div>
        <ul class="sidebar-links">
          <li>
          <router-link to="/adminHome">
            <v-icon size="40px">mdi-view-dashboard-outline</v-icon>Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/viewUsers">
            <v-icon size="40px">mdi-account-multiple</v-icon>Users
          </router-link>
        </li>
        <li>
          <router-link to="/viewTrainers">
            <v-icon size="40px">mdi-account-multiple</v-icon>Trainers
          </router-link>
        </li>
        <!-- <li>
          <router-link>
            <v-icon size="40px">mdi-credit-card</v-icon>Payments
          </router-link>
        </li> -->
        </ul>
        <div class="user-profile mt-auto p-4">
          <v-icon size="40px">mdi-logout</v-icon>
          <button id="logout" @click="logout">Logout</button>
        </div>
      </aside>
      <main class="main">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
    ...mapGetters(['getadmin_id']),  // Map the getter directly
  },
  methods:{
    logout() {
    this.$store.commit('logout');         // Reset Vuex state + sessionStorage
    this.$router.push('/adminlogin');          // Redirect to login page
  }
  }
  
  }
  </script>
  
  <style>
  .v-main{
    background-color: #747474;
  /* padding-left: 20px; */
  height: 100vh;
  /* padding-top: 20px; */}
  .Adminbody{
    background-color: rgb(255, 255, 255);
    padding-left: 20px;
  height: 100vh;
  width: 100%;
  padding-top: 20px;
  }
  
  .Adminbody .sidebar{
    position: fixed;
  width: 260px;
  background-color: #000000;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 655px;
  border-radius: 30px;
  /* border-bottom-left-radius: 30px; */
    
  }
  /* .Adminbody .sidebar:hover{
    width: 260px;
  } */
  
  
  .Adminbody .sidebar-links li a{
    color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    padding: 15px 10px;
    white-space: nowrap;
    text-decoration: none;
    gap: 0 20px;
    margin-top: 15px;
  
  }
  
  .Adminbody .sidebar-links{
    list-style: none;
    margin-top: 10px;
    width: 260px;
   
  }
  
  /* .Adminbody .sidebar-links li a:hover{
    background-color: rgb(255, 255, 255);
    color: rgb(16, 16, 16);
    border-radius: 20px;
  } */
  
  .Adminbody .sidebar-links li img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .Adminbody .sidebar-header{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .Adminbody .sidebar h2{
    font-size: large;
    color: beige;
    margin-left: 25px;
  }
  .user-profile{
    display: flex;
    align-items: center;
    justify-content: start;
    color: rgb(255, 255, 255);

  
  
  }
  .user-profile img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 25px;
   
  }
  
  #logout{
    background-color: rgb(255, 187, 0);
    width: 100px;
    height: 35px;
    color: rgb(0, 0, 0);
    border-radius:25px ;
    width: 100px;

  }
  .main {
    position: fixed;
  width: calc(100% - 300px); /* 260px for sidebar + 20px margin */
  background-color: rgb(255, 255, 255);
  overflow-y: auto;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: 260px;
  margin-right: 40px;
  padding: 10px;
  height: 655px;
}
.main::-webkit-scrollbar{
  display: none;
}


.sidebar-links .router-link-active {
  background-color: rgb(255, 255, 255);
  color: #000000; /* Black text */
  /* border-radius: 4px; */
}

/* For exact match (useful for /dashboard vs /dashboard/details) */
.sidebar-links .router-link-exact-active {
  background-color: rgb(255, 255, 255);
  color: #000000 !important;
  /* border-top-left-radius: 25px;
  border-bottom-left-radius: 25px; */
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  position: relative;
  /* border-radius: 0px 0px 25px 0px; */

}
.sidebar-links .router-link-exact-active::after{
  content: "";
  position: absolute;
  top: 100%;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-top-right-radius: 20px;
  box-shadow: 5px -5px 0px 5px #ffffff;
}
.sidebar-links .router-link-exact-active::before{
  content: "";
  position: absolute;
  top: -20px;
  left: 84.5%;
  width: 20px;
  height: 20px;
  /* background-color: aqua; */
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0px 5px #ffffff;
}


  </style>