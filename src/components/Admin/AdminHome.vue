<template>
    <div class="Adminbody">
      <aside class="sidebar">
        <div class="sidebar-header">
          <!-- <img :src="require('@/assets/img/adminlogo.png')" alt="" style="width: 100px;height: 100px;"> -->
                      <v-icon size="100px">mdi-account-tie</v-icon>

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
        <li>
          <router-link to="/adminPayments">
            <v-icon size="40px">mdi-credit-card</v-icon>Payments
          </router-link>
        </li>
        </ul>
        <div class="user-profile mt-auto p-4">
          <!-- <v-icon size="40px">mdi-logout</v-icon> -->
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
  
  <style scoped>
  
  .Adminbody{
    background-color: rgb(255, 255, 255);
  height: 100vh;
  width: 100%;
  }
  
  .Adminbody .sidebar{
    position: fixed;
  width: 260px;
  background-color: #034e42;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 100%;
  /* border-bottom-left-radius: 30px; */
    
  }
  /* .Adminbody .sidebar:hover{
    width: 260px;
  } */
  
  
  .Adminbody .sidebar-links li a{
    color: rgb(204, 204, 204);
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
    
    
   
  }
  .Adminbody .sidebar-links li a:hover{
  /* background-color: rgb(26, 26, 26); */
  color: #000000;
  border-radius: 4px;
  background-color: #F6B17A;
}
  
 
  
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
    justify-content: center;
    color: rgb(255, 255, 255);

  
  
  }
  .user-profile img{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 25px;
   
  }
  
  #logout{
    background-color: rgb(255, 0, 43);
    width: 150px;
    height: 45px;
    color: rgb(255, 255, 255);
    border-radius:4px ;
          box-shadow: 0 6px 18px #000000;


  }
  .main {
  

   position: fixed;
  width: calc(100% - 270px); /* 260px for sidebar + 20px margin */
    background: linear-gradient(135deg, #151515, #343437, #151519);
  overflow-y: auto;
  /* border-top-right-radius: 30px;
  border-bottom-right-radius: 30px; */
  margin-left: 260px;

  /* padding: 10px; */
  height: 100%;
  padding: 10px;
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
  background-color: #F6B17A;
  color: #000000 !important;
 border-radius: 4px;
  position: relative;
        box-shadow: 0 6px 18px #000000;

  /* border-radius: 0px 0px 25px 0px; */

}



  </style>