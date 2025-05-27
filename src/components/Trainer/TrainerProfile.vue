<template>
  <div class="content">
    <div class="heading">
      <h1>Profile</h1>
    </div>
    <div class="profile">
      <div class="about">
        <v-icon size="200px">mdi-account-circle-outline</v-icon>

        <p></p>
        <v-textarea
  label="About" width="100%" color="black"
  placeholder="Write your description about yourself here..."
  rows=""
  auto-grow v-model="about"
></v-textarea>
        <button id="add" @click="addabout">Add</button>
        <!-- <p>Specialities</p>
        <v-textarea width="100%">

</v-textarea>
<button id="add">Add</button> -->
      </div>
      
      <div class="details">
        
          <h3>Name</h3>
          <p>{{ trainer.name }}</p>
          <h3>Email </h3>
          <p> {{ trainer.email }}</p>
          <h3>Password  </h3>
          <p>{{ trainer.password }}</p>
          <h3>Certification</h3>
          <p>{{ trainer.certification }}</p>
          <h3>Experience</h3>
          <p>{{ trainer.experienceYears }}</p>
          <h3>Specialization</h3>
          <p>{{ trainer.specialisationName }}</p>
          <div class="action btn">
            <button id="editbtn" @click="editprofile"><v-icon>mdi-pencil</v-icon>Edit Details</button>
            <button id="deletebtn" @click="deletetrainer"><v-icon>mdi-delete</v-icon>Delete Account</button>
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
      trainer: {
        id: 1, 
        name: "",
        email: "",
        password: "",
        certification:"",
        experienceYears:"",
        specialisationName:"",
      },
      about:"",
    }
    
  },
  computed:{
      ...mapGetters(['gettrainer_id']),
      trainer_id(){
        return this.gettrainer_id;
      }
  },
    methods: {
    async fetchTrainerProfile() {
      try {
        const trainer_id = Number(this.gettrainer_id);
        console.log(trainer_id);
        
        const result = await this.$store.dispatch("Trainer/fetchTrainerProfile",trainer_id);
        if (result.success) {
          this.trainer = result.data;
        } else {
          alert(`Error: ${result.error}`); 
        }
      } catch (error) {
        console.error("Error loading Profile:", error);
      }
    },

    async deletetrainer() {
      const confirmDelete = window.confirm("Are you sure you want to delete your account?");
      if (confirmDelete) {
      try {
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch("Trainer/deleteAccount",trainer_id);
        if (result.success) {
          this.user = result.data;
          alert("your account has been deleted successfully.")
        } else {
          alert(`Error: ${result.error}`); 
        }
      } catch (error) {
        console.error("Error deleting Profile:", error);
      }
    }else {
        alert("Account deletion was canceled.");
      }
    },

    async addabout(){
      try {
        const payload={
          trainer_id:this.gettrainer_id,
          about:this.about,
        }
        const result = await this.$store.dispatch("Trainer/about", payload);
        if (result.success) {
          alert("About added successfully!");
        } else {
          alert(` failed: ${result.error}`);
        }
      } catch (error) {
        alert("Unexpected error ");
      }
    },

    async showabout() {
      try {
        const trainer_id = this.gettrainer_id;
        
        const result = await this.$store.dispatch("Trainer/showabout",trainer_id);
        if (result.success) {
          this.about = result.data;
        } else {
          alert(`Error: ${result.error}`); 
        }
      } catch (error) {
        console.error("Error loading about:", error);
      }
    },

  },
  mounted() {
    this.fetchTrainerProfile();
    this.showabout();
  },
}
</script>


<style scoped>
.profile{
  display: flex;
  width: 100%;
  height: 100%;
  color: white;
  justify-content: space-evenly;
  
 
 
  
}
.about{
  width: 40%;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #067163;
  border-radius: 20px;
  padding: 5px;
  


}

.content{
  display: flex;
  width: 83%;
  height: 100%;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);

}


.heading{
 
  display: flex;
  align-items: center;
  margin-bottom: 20px;
 

}
.image{
  width: 300px;
  height: 510px;
  background-color: rgb(0, 0, 0);
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15); */

}
img{
  width: 290px;
  height: 300px;
  
}
.details{
  width: 400px;
  height: 540px;
  background-color: rgba(255, 255, 255, 0.923);
  color: black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
 
  /* box-shadow: 0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15); */

}
.details h3{
  margin-bottom: 2px;
}
.details p{
  margin-bottom: 15px;
  background-color: #c8c8c8;
  padding: 10px 20px;
  border-radius: 20px;
}

.action{
 display: flex;
 align-items: center;
 justify-content: center;
}

#editbtn{
  margin-top:5px ;
  background-color: rgb(255, 255, 255);
  width: 150px;
  height: 50px;
  color: #000000;
  margin-right: 20px;
  border-radius: 25px;
  border: 1px solid black;
}
#deletebtn{
  background-color: rgb(255, 0, 0);
  width: 150px;
  height: 50px;
  color: #ffffff;
  border-radius: 25px;

}
#add{
  width: 150px;
  height: 50px;
  background-color: rgb(10, 3, 41);
  border-radius: 25px;

}



</style>