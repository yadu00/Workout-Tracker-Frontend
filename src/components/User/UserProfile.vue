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
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);

  /* background: linear-gradient(to right, #232526, #414345); */
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.heading {
  margin-bottom: 30px;
}

.heading h1 {
  font-size: 2.5rem;
  color: #00e676;
  border-bottom: 2px solid #00e676;
  padding-bottom: 0.3rem;
}

.user-profile {
  display: flex;
  /* background-color: #2c2f33; */
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);

  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  max-width: 950px;
  width: 100%;
  flex-wrap: wrap;
}

.image {
  width: 100%;
  max-width: 300px;
  /* background-color: #1e1e1e; */

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.image img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #00e676;
}

.details {
  flex: 1;
  padding: 40px;
  /* background-color: #333; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #444;
}

.details h3 {
  font-size: 1rem;
  color: #a0a0a0;
  margin-bottom: 4px;
  margin-top: 16px;
}

.details p {
  background-color: #444;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details p span {
  color: #00e676;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

#deletebtn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

#deletebtn:hover {
  background-color: #b71c1c;
}
</style>
