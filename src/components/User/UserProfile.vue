<template>
  <div class="profile-content">
    <div class="heading">
      <h1>Profile</h1>

    </div>
    <div class="user-profile">
      <div class="image">
        <img :src="require('@/assets/img/profile.png')" alt="">
      </div>
      <div class="details">
          <h3>Name</h3>
          <p>{{ user.name }}</p>
          <h3>Email </h3>
          <p> {{ user.email }}</p>
          <h3>Password</h3>
          <p>{{ user.password }}<span style="margin-left: 250px;color: green;font-weight: bold;">Edit <v-icon size="">mdi-pencil</v-icon></span></p>
          <h3>Gender</h3>
          <p>{{ user.gender_name }}</p>

          <div class="button">
            <button id="deletebtn" @click="deleteuser"><v-icon size="20">mdi-delete</v-icon>Delete Account</button>
          </div>
        
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      user: {
        id: "", 
        name: "",
        email: "",
        gender_name: "",
        password: ""
      }
    }
    
  },


  computed: {
    ...mapGetters(['getuser_id']),  
  },
  methods: {
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
    async deleteuser(){
      try{
        const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return; 
        const user_id=this.getuser_id;
        const result=await this.$store.dispatch("User/deleteAccount",user_id);
        if(result.success){
          alert("Account deleted ")
          this.$router.push('/userlogin');
        }else{
            alert("Error deleting account")
          
        }
      }catch(error){
        console.error("Error loading Profile:", error);
      }
    }
  },
  mounted() {
    if (this.getuser_id) {
      this.fetchProfile();  // Fetch profile if user_id is available
    } else {
      console.error("User ID is not available in mounted.");
      this.$router.push("/userlogin");  // Redirect to login page if user_id is missing
    }
  }
}
</script>



<style scoped>
.user-profile{
  display: flex;
  width: auto;
  height: auto;
  padding: 20px;
  border-radius: 25px;
  color: rgb(255, 255, 255);
 
  
}
h1{
  color: white;
}

.profile-content{
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  align-items: center;
}

.heading{
 
  display: flex;
  align-items: center;
  margin-bottom: 20px;
 

}
.image{
  width: 300px;
  height: 500px;
  background-color: rgb(73, 73, 73);
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

}
img{
  width: 290px;
  height: 300px;
}
.details{
  width: 500px;
  height: 500px;
  background-color: rgba(147, 146, 146, 0.703);
  color: black;
  padding: 50px;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;

}
.details h3{
  margin-bottom: 2px;
  margin-left: 20px;
}
.details p{
  margin-left: 20px;
  margin-bottom: 15px;
  background-color: rgb(213, 213, 213);
  padding: 10px 25px;
  border-radius: 20px;
  font-size: large;
}

.button{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}


#deletebtn{
  background-color: rgb(217, 1, 1);
  width: 170px;
  height: 50px;
  color: #ffffff;
  border-radius: 25px;

}

</style>