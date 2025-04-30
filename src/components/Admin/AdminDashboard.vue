<template>
  <div>
    <!-- <h2>Admin Home</h2> -->
     <div class="head">

     </div>
    <div class="container">
      <div class="one">
        <div class="item1">
          <h1><v-icon>mdi-account-multiple</v-icon>Users: {{ users.length }}</h1>
        </div>
        <div class="item1">
          <h1><v-icon>mdi-account-multiple</v-icon>Trainers: {{ trainers.length }}</h1>
        </div>
      </div>
    </div>

    <div class="container2">
      <div class="request">
        <h2>Trainer Join Requests</h2>  
        <!-- <div v-if="requests.length === 0">No Trainer Requests</div> -->
      <div class="requestbody title">
        <div class="requests ">
          <p style="font-weight: bold;">SL No</p>
        </div>
        <div class="requests">
          <p style="font-weight: bold;">Name</p>
        </div>
        <div class="requests">
          <p style="font-weight: bold;">status</p>
        </div>
        <div class="requests btn">
          <!-- <router-link to="/approve"><button id="viewbtn"><v-icon>mdi-eye-outline</v-icon>View</button></router-link> -->

        </div> 
        </div> 
        <div v-if="requests.length === 0" class="requestbody">
  <div class="requests" style="width: 100%; justify-content: center;">
    <p style="font-weight: bold;">No Trainer Requests</p>
  </div>
</div>     
<div v-else>
<div class="requestbody" v-for="(request, index) in requests" :key="request.trainer_id">
        <div class="requests">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="requests">
          <p>{{ request.name }}</p>
        </div>
        <div class="requests">
          <p class="status">{{ request.status}}</p>
        </div>
        <div class="requests btn">
          <button id="viewbtn" @click="viewTrainerDetails=true;trainerDetails(request.trainer_id)"><v-icon>mdi-eye-outline</v-icon>View</button>

        </div> 
      </div>
    </div>
    </div>
      
    </div>    
  </div>

  <v-dialog v-model="viewTrainerDetails">
    <div class="box">
    <button id="exit"><v-icon  size="40px" @click="viewTrainerDetails = false">mdi-close</v-icon>Close</button>
    <div class="details">
        <h1>Details</h1>
        <div class="info">
            <h3>Name</h3><p> {{ trainer.name }}</p>
        </div>
        <div class="info">
          <h3>Email</h3><p>{{  trainer.email}}</p>
        </div>
        <div class="info certi">
          <h3>Certification</h3><p>{{  trainer.certification}}</p>
            <button id="viewbtn"><v-icon>mdi-eye-outline</v-icon>View</button>
        </div>
        <div class="info">
          <h3>Experience</h3><p>{{  trainer.experienceYears}}</p>
        </div>
        <div class="info">
          <h3>Specialization</h3><p>{{trainer.specialisationName  }}</p>
        </div>
        <div class="info btns">
            <button id="approvebtn" @click="approveTrainer(trainer.trainer_id)"><v-icon>mdi-check</v-icon>Approve</button>
            <button id="declinebtn" @click="rejectTrainer(trainer.trainer_id)"><v-icon>mdi-close</v-icon>Reject</button>
        </div>   
        
    </div>

  </div>
      
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      trainer: {
  trainer_id: "", 
  name: "",
  email: "",
  certification: "",
  experienceYears: "",
  specialisationName: "",
},
      viewTrainerDetails:false,
      trainers: [],
      users: [],
      requests:[],
      


    };
  },
  methods: {
    ...mapActions({
      fetchTrainers: "Admin/fetchTrainers",
      fetchUsers: "Admin/fetchUsers",
      fetchRequests: "Admin/fetchTrainerRequests",
      fetchTrainer:"Admin/fetchTrainer",
    }),

    async loadTrainers() {
      try {
        const result = await this.fetchTrainers();
        if (result.success) {
          this.trainers = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },


    async loadUsers() {
      try {
        const result = await this.fetchUsers();
        if (result.success) {
          this.users = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },
    async fetchTrainerRequests() {
      try {
        const result = await this.$store.dispatch("Admin/fetchTrainerRequests");
        if (result.success) {
          this.requests = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainer requests:", error);
      }
    },

    async trainerDetails(trainer_id){
      try {
        const result = await this.$store.dispatch("Admin/fetchTrainer",trainer_id);
        if (result.success) {
          this.trainer = result.data;
          this.viewTrainerDetails = true;

        } else {
          alert(`Error: ${result.error}`);

        }
      } catch (error) {
        console.error("Error loading Trainer:", error);
      }
    },
    async approveTrainer(trainer_id){
      
      try {
        const confirmation = confirm("Approve Trainer Request");
        if (!confirmation) return; 
        const payload = {
      trainer_id: trainer_id,
      statusId: 2
         };
        const result = await this.$store.dispatch("Admin/Approve",payload);
        if (result.success) {
          alert("Approved")
          
          this.fetchTrainerRequests();
          this.viewTrainerDetails=false;

        } else {
          alert(`Error: ${result.error}`);

        }
      } catch (error) {
        console.error("Error Approving Trainer:", error);
      }
    },
    async rejectTrainer(trainer_id){
      
      try {
        const confirmation = confirm("Reject Trainer Request");
        if (!confirmation) return; 
        const payload = {
      trainer_id: trainer_id,
      statusId: 3
    };
        const result = await this.$store.dispatch("Admin/Reject",payload);
        if (result.success) {
          alert("Rejected")
          this.fetchTrainerRequests();
          this.viewTrainerDetails=false;

        } else {
          alert(`Error: ${result.error}`);

        }
      } catch (error) {
        console.error("Error Rejecting Trainer:", error);
      }
    },
  },
  


  

  mounted(){
    this.fetchTrainerRequests();
  },

  created() {
    this.loadUsers();
    this.loadTrainers();
    
  },
};
</script>

<style scoped>
.one {
  display: flex;
  width: 100%;
  height: auto;
}
.container2{
  margin-top: 20px;
  margin-left: 10px;

}
.item1 {
  width: 400px;
  height: 200px;
  background-color: rgba(241, 241, 241, 0.879);
  margin: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;}
.item1:hover{
  background-color: rgb(0, 0, 0);
  color: white;
  box-shadow: 2px 5px 10px rgb(0, 0, 0);
}
.request{
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 99%;
  height: auto;
  /* align-items: center; */
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;  border-radius: 2px;
  background-color: rgba(241, 241, 241, 0.879);

}
.requestbody{
  display: flex;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin: 10px;
}
.requests{
  width: 25%;
  margin: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  
}
#viewbtn{
  width: 100px;
  height: 30px;
  background-color:blue ;
  color: white;
  border-radius: 25px;
  text-align: center;
  /* margin-right: 100px; */
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  background-color: black;
  color: white;
}
.status{
  background-color: rgb(123, 255, 0);
  border-radius: 20px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}







.box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
   
}
.details{
    width: 600px;
    height: 70%;
    display: flex;
    flex-direction: column;
    background-color: rgb(171, 171, 171);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    padding: 20px;
    color: rgb(0, 0, 0);

}
.info{
    width: 100%;
    display: flex;
    align-items: center;


}
.info h3{
  width: 150px;
}
.info p{
    font-size: 20px;
    margin: 10px;
    width: 250px;
    border: 1px solid black;
    border-radius: 10px;
    padding-left: 10px;

}
#viewbtn{
    width: 100px;
    height: 40px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 20px
}
#approvebtn{
    width: 150px;
    height: 40px;
    /* border: 1px solid rgb(0, 0, 0); */
    border-radius: 20px;
    background-color: rgb(51, 255, 0);
    color: rgb(0, 0, 0);

}
#declinebtn{
    width: 150px;
    height: 40px;
    /* border: 1px solid rgb(0, 0, 0); */
    border-radius: 20px;
    background-color: rgb(255, 0, 0);
    color: white;
}
.btns{
    display: flex;
    justify-content: space-around;
    height: 100px;
}
h1{
    text-align: center;
}
#exit{
  position: absolute;
  top:0;
  right: 30%;
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
}
</style>
