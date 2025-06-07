<template>
  <div class="container">
    <h1>Clients</h1>
    <div class="info head">
      <div class="title">
        Sl No
      </div>
      <div class="title">
        Name
      </div>
      <div class="title">
        Email
      </div>
      <div class="title">
        Gender
      </div>
      <div class="title">
        Weight
      </div>
      <div class="title">
        Payment
      </div>
      <div class="title">
        Bmi
      </div>
      <div class="title">
        Schedule
      </div>
    </div>
    
    <div v-if="users.length" class="card">
        <div v-for="(user, index) in users" :key="user.id"  class="info">
          <div class="title">
            <p>{{ index + 1 }}</p>
      </div>
      <div class="title">
        <p>{{ user.name }}</p>
      </div>
      <div class="title">
        <p>{{ user.email }}</p>
      </div>
      <div class="title">
        <p>{{ user.gender_name }}</p>
      </div>
      <div class="title">
        <p>{{ user.weight }}</p>
      </div>
      <div class="title">
        <p>{{ user.paymentStatus === 1 ? 'Done' : 'Pending' }}</p>
      </div>
      <div class="title">
        <p>{{ user.bmi.toFixed(2) }}</p>
      </div>
      <div class="title">
        <div class="schedulebtn">
          <router-link :to="{ path: '/view', query: { user_id: user.user_id,name:user.name } }">
          <button id="selectuser">Schedule Workout</button>
        </router-link>
      </div>
      </div>
        
        
       

        </div>
      
    </div>
    <p v-else>No users found.</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
      
    };
  },
  computed: {
    ...mapGetters(["gettrainer_id"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),

    async loadUsers() {
      try {
        const trainer_id = this.gettrainer_id;
        const result = await this.$store.dispatch(
          "Trainer/viewClients",
          trainer_id
        );

        if (result.success) {
          this.users = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },

    scheduleWorkout(user_id) {
      this.$store.dispatch("User/goToScheduleWorkout", user_id);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
  padding: 20px;
}

.container h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}

.head {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  font-weight: bold;
  border-radius: 12px;
  padding: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background 0.3s ease;
}

.info:hover {
  background: rgba(255, 255, 255, 0.15);
}

.title {
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  word-wrap: break-word;
}

.card {
  width: 100%;
  margin-top: 10px;
}

.schedulebtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

#selectuser {
  background: rgba(0, 123, 255, 0.7);
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.2);
}

#selectuser:hover {
  background: rgba(0, 123, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
}

p {
  margin: 0;
}

</style>
