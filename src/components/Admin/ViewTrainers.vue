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
  width: 90%;
  margin: 20px auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #000000;
  color: white;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #cc0000;
}
</style>
