<template>
  <div class="container">
    <h2>Trainers</h2>
    <table v-if="trainers.length">
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>TrainerId</th>
          <th>Name</th>
          <th>Email</th>
          <th>Certification</th>
          <th>Experience (years)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trainer, index) in trainers" :key="trainer.id">
          <td>{{ index + 1 }}</td>
          <td>{{ trainer.trainer_id }}</td>
          <td>{{ trainer.name }}</td>
          <td>{{ trainer.email }}</td>
          <td>{{ trainer.certification }}</td>
          <td>{{ trainer.experienceYears }}</td>
          <td>
            <button @click="deleteTrainer(trainer.trainer_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No trainers found.</p>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      trainers: [],
    };
  },
  methods: {
    ...mapActions(["fetchTrainers"]),

    async loadTrainers() {
      try {
        const result = await this.$store.dispatch("Admin/fetchTrainers");
        if (result.success) {
          this.trainers = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
    async deleteTrainer(trainer_id){
      try{
        const confirmation = confirm("Delete Trainer");
        if (!confirmation) return; 
        const result=await this.$store.dispatch("Admin/deleteTrainerAccount",trainer_id);
        if(result.success){
          alert("Account deleted ")
          this.loadTrainers();
        }else{
            alert("Error deleting account")
          
        }
      }catch(error){
        console.error("Error loading Profile:", error);
      }
    }

   
  },
  mounted() {
    this.loadTrainers();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}

.trainerlistheading {
  display: flex;
  width: 100%;
  justify-content: space-between; 
}

.list {
  flex: 1; 
  text-align: center;
}

.list h4 {
  margin: 0; 
}

.trainerlist {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin: 10px 0; 
  padding: 10px;
  background-color: white;
  box-shadow: 2px 1px 1px black;
}

.trainerlist p {
  margin: 0; 
}

#deletebtn {
  background-color: rgb(186, 186, 186);
  color: rgb(0, 0, 0);
  width: 70px;
  height: 25px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 4px;
  cursor: pointer; 
}

#deletebtn:hover {
  background-color: rgb(255, 0, 0); 
  color: white; 
}
</style>
