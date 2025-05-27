<template>
  <div>
    <!-- <h2>Admin Home</h2> -->
    <div class="head"></div>
    <div class="container">
      <div class="one">
        <div class="item1">
          <h1>
            <v-icon>mdi-account-multiple</v-icon>Users: {{ users.length }}
          </h1>
        </div>
        <div class="item1">
          <h1>
            <v-icon>mdi-account-multiple</v-icon>Trainers: {{ trainers.length }}
          </h1>
        </div>
      </div>
    </div>

    <div class="container2">
      <div class="request">
        <h2>Trainer Join Requests</h2>
        <!-- <div v-if="requests.length === 0">No Trainer Requests</div> -->
        <div class="requestbody title">
          <div class="requests">
            <p style="font-weight: bold">SL No</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">Name</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">status</p>
          </div>
          <div class="requests btn">
            <!-- <router-link to="/approve"><button id="viewbtn"><v-icon>mdi-eye-outline</v-icon>View</button></router-link> -->
          </div>
        </div>
        <div v-if="requests.length === 0" class="requestbody">
          <div class="requests" style="width: 100%; justify-content: center">
            <p style="font-weight: bold">No Trainer Requests</p>
          </div>
        </div>
        <div v-else>
          <div
            class="requestbody"
            v-for="(request, index) in requests"
            :key="request.trainer_id"
          >
            <div class="requests">
              <p>{{ index + 1 }}</p>
            </div>
            <div class="requests">
              <p>{{ request.name }}</p>
            </div>
            <div class="requests">
              <p class="status">{{ request.status }}</p>
            </div>
            <div class="requests btn">
              <button
                id="viewbtn"
                @click="
                  viewTrainerDetails = true;
                  trainerDetails(request.trainer_id);
                "
              >
                <v-icon>mdi-eye-outline</v-icon>View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-model="viewTrainerDetails">
    <div class="box">
      <button id="exit">
        <v-icon class="close" size="40px" @click="viewTrainerDetails = false"
          >mdi-close-circle</v-icon
        >
      </button>
      <div class="details">
        <h1>Details</h1>
        <div class="info">
          <h3>Name</h3>
          <p>{{ trainer.name }}</p>
        </div>
        <div class="info">
          <h3>Email</h3>
          <p>{{ trainer.email }}</p>
        </div>
        <div class="info certi">
          <h3>Certification</h3>
          <p>{{ trainer.certification }}</p>
          <button id="showbtn"><v-icon>mdi-eye-outline</v-icon>View</button>
        </div>
        <div class="info">
          <h3>Experience</h3>
          <p>{{ trainer.experienceYears }}</p>
        </div>
        <div class="info">
          <h3>Specialization</h3>
          <p>{{ trainer.specialisationName }}</p>
        </div>
        <div class="info btns">
          <button id="approvebtn" @click="approveTrainer(trainer.trainer_id)">
            <v-icon>mdi-check</v-icon>Approve
          </button>
          <button id="declinebtn" @click="rejectTrainer(trainer.trainer_id)">
            <v-icon>mdi-close</v-icon>Reject
          </button>
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
      viewTrainerDetails: false,
      trainers: [],
      users: [],
      requests: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTrainers: "Admin/fetchTrainers",
      fetchUsers: "Admin/fetchUsers",
      fetchRequests: "Admin/fetchTrainerRequests",
      fetchTrainer: "Admin/fetchTrainer",
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

    async trainerDetails(trainer_id) {
      try {
        const result = await this.$store.dispatch(
          "Admin/fetchTrainer",
          trainer_id
        );
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
    async approveTrainer(trainer_id) {
      try {
        const confirmation = confirm("Approve Trainer Request");
        if (!confirmation) return;
        const payload = {
          trainer_id: trainer_id,
          statusId: 2,
        };
        const result = await this.$store.dispatch("Admin/Approve", payload);
        if (result.success) {
          alert("Approved");

          this.fetchTrainerRequests();
          this.viewTrainerDetails = false;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error Approving Trainer:", error);
      }
    },
    async rejectTrainer(trainer_id) {
      try {
        const confirmation = confirm("Reject Trainer Request");
        if (!confirmation) return;
        const payload = {
          trainer_id: trainer_id,
          statusId: 3,
        };
        const result = await this.$store.dispatch("Admin/Reject", payload);
        if (result.success) {
          alert("Rejected");
          this.fetchTrainerRequests();
          this.viewTrainerDetails = false;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error Rejecting Trainer:", error);
      }
    },
  },

  mounted() {
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
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
}

.container2 {
  margin-top: 20px;
  padding: 0 10px;
}

.item1 {
  flex: 1 1 300px;
  height: 200px;
  background-color: rgba(241, 241, 241, 0.879);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transition: all 0.3s ease;
}

.item1:hover {
  background-color: #000;
  color: #fff;
  box-shadow: 2px 5px 10px #000;
}

.request {
  width: 100%;
  padding: 10px;
  background-color: rgba(241, 241, 241, 0.879);
  border-radius: 4px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.requestbody {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.requests {
  flex: 1 1 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#viewbtn {
  width: 90px;
  height: 30px;
  background-color: rgb(225, 225, 225);
  color: rgb(47, 47, 47);
  border-radius: 25px;
  border: none;
  cursor: pointer;
}

.title {
  background-color: black;
  color: white;
  font-weight: bold;
}

.status {
  background-color: #fff200;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.details {
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
}

.info {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}

.info h3 {
  width: 150px;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
}

.info p {
  flex: 1;
  font-size: 18px;
  /* border: 1px solid #000; */
  border-radius: 30px;
  padding: 8px 30px;
  margin: 0;
  background-color: #ddd;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

#approvebtn,
#declinebtn {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

#approvebtn {
  background-color: #2bd700;
  color: #000;
}

#declinebtn {
  background-color: rgb(189, 0, 0);
  color: #fff;
}

#exit {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.close{
  top: 85px;
  right:440px;
  color: #ffffff;
}

/* RESPONSIVENESS */

@media (max-width: 768px) {
  .one {
    flex-direction: column;
    align-items: center;
  }

  .item1 {
    width: 100%;
  }

  .requestbody {
    flex-direction: column;
    align-items: center;
  }

  .requests {
    width: 100%;
    justify-content: center;
    margin: 5px 0;
  }

  .info {
    flex-direction: column;
    align-items: flex-start;
  }

  .info h3,
  .info p {
    width: 100%;
  }

  .btns {
    flex-direction: column;
    align-items: center;
  }

  #exit {
    right: 20px;
    top: 20px;
  }
}
</style>
