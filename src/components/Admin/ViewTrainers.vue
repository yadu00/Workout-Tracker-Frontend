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
  <td data-label="Sl.No">{{ index + 1 }}</td>
  <td data-label="TrainerId">{{ trainer.trainer_id }}</td>
  <td data-label="Name">{{ trainer.name }}</td>
  <td data-label="Email">{{ trainer.email }}</td>
  <td data-label="Certification">{{ trainer.certification }}</td>
  <td data-label="Experience">{{ trainer.experienceYears }}</td>
  <td data-label="Action">
    <button @click="deleteTrainer(trainer.trainer_id)">
      Delete
    </button>
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
  width: 95%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
 color: #ffffff;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #2f2f2f4a;
  border-radius: 12px;
    color: #ecf0f1;

  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
}

thead {
  background-color: #000000;
  color: #ecf0f1;
}

th,
td {
  padding: 16px 12px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  font-size: 16px;
}

th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
}

tr:hover {
   background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 20px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

button:hover {
  background-color: #c0392b;
}

/* Responsive design */
@media (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 15px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.05);
    padding: 10px;
  }

  td {
    text-align: left;
    padding: 10px 20px;
    position: relative;
    font-size: 15px;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 20px;
    top: 10px;
    font-weight: bold;
    color: #888;
  }

  td:last-child {
    text-align: center;
  }
}
</style>