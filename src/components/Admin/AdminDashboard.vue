<template>
  <div>
    <!-- <h2>Admin Home</h2> -->
    <div class="head"></div>
    <div class="one">
      <div class="item1">
        <h1><v-icon>mdi-account-multiple</v-icon>Users: {{ users.length }}</h1>
      </div>
      <div class="item1">
        <h1>
          <v-icon>mdi-account-multiple</v-icon>Trainers: {{ trainers.length }}
        </h1>
      </div>
    </div>

    <div class="container2">
      <div class="request">
        <h2>{{ requests.length }} Pending Trainer Join Requests</h2>
        <div v-if="requests.length === 0">No Trainer Requests</div>
        <div class="requestbody title">
          <div class="requests">
            <p style="font-weight: bold">SL No</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">Name</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">view</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">Accept</p>
          </div>
          <div class="requests">
            <p style="font-weight: bold">Reject</p>
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
            <!-- <div class="requests">
              <p class="status">{{ request.status }}</p>
            </div> -->
            <div class="requests btn">
              <button
                id="viewbtn"
                @click="
                  viewTrainerDetails = true;
                  trainerDetails(request.trainer_id);
                "
              >
                <v-icon>mdi-eye-outline</v-icon>
              </button>
            </div>
            <div class="requests">
              <button
                id="approvebtn"
                @click="approveTrainer(request.trainer_id)"
              >
                <v-icon>mdi-check</v-icon>Approve
              </button>
            </div>
            <div class="requests">
              <button
                id="declinebtn"
                @click="rejectTrainer(request.trainer_id)"
              >
                <v-icon>mdi-close</v-icon>Reject
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
          <button id="showbtn" @click="viewCertification = true">
            <v-icon>mdi-eye-outline</v-icon>View
          </button>
        </div>
        <div class="info">
          <h3>Experience</h3>
          <p>{{ trainer.experienceYears }}</p>
        </div>
        <div class="info">
          <h3>Specialization</h3>
          <p>{{ trainer.specialisationName }}</p>
        </div>
        <div class="info btns"></div>
      </div>
    </div>
  </v-dialog>

  <v-dialog v-model="viewCertification" max-width="600">
    <v-card>
      <v-card-title>Trainer Certification</v-card-title>
      <v-card-text>
        <v-img
          :src="'data:image/jpeg;base64,' + trainer.certificationImage"
          aspect-ratio="1.7"
          contain
        ></v-img>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="viewCertification = false">Close</v-btn>
      </v-card-actions>
    </v-card>
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
      viewCertification: false,
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
        const result = await this.$store.dispatch("Admin/Approve", payload);
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
/* DASHBOARD OVERVIEW CARDS */
.one {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 10px;
}

.item1 {
  flex: 1 1 300px;
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

.item1:hover {
  background-color: #29293d;
  transform: translateY(-4px);
}

/* REQUESTS TABLE */
.container2 {
  /* margin-top: 5px; */
  padding: 0 15px;
}

.request {
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

.request h2 {
  margin-bottom: 15px;
}

.requestbody {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.requests {
  flex: 1 1 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#viewbtn {
  color: #a9a9a9;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

#viewbtn:hover {
  color: #ffffff;
}

.title {
  background-color: #111;
  font-weight: bold;
  border-radius: 10px;
}

/* STATUS BADGE */
.status {
  background-color: #ffdd57;
  color: #000;
  padding: 6px 15px;
  border-radius: 20px;
  font-weight: 500;
}

/* DIALOG BOX */
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100vw;
  min-height: 100vh;
}

.details {
  background-color: #585858b3;
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  backdrop-filter: blur(6px);
  color: white;
}

.info {
  display: flex;
  margin: 15px 0;
  flex-wrap: wrap;
}

.info h3 {
  width: 150px;
  margin: 0;
}

.info p {
  flex: 1;
  background-color: #7373734b;
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 16px;
  margin: 0;
}

/* CERTIFICATION VIEW BUTTON */
.certi button {
  margin-left: 15px;
  background-color: #ffffff;
  color: #1e1e2f;
  border-radius: 20px;
  padding: 5px 12px;
  border: none;
  cursor: pointer;
}

/* DIALOG CLOSE BUTTON */
#exit {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.close {
  color: #ffffff;
  right: 370px;
  top: 70px;
}

/* APPROVE/REJECT BUTTONS */
.btns {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
  flex-wrap: wrap;
}

#approvebtn,
#declinebtn {
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
#approvebtn {
  /* background-color: #6b6b6b72; */
  color: #9c9c9c;
  border: 1px solid rgb(0, 196, 0);
}

#declinebtn {
  /* background-color: #dc3545; */
  color: #a0a0a0;
  border: 1px solid rgb(228, 0, 0);
}
#approvebtn:hover {
  /* background-color: #6b6b6b72; */
  color: #d1d1d1;
  border: 1px solid rgb(0, 243, 0);
  box-shadow: 0 6px 18px #000000;
}

#declinebtn:hover {
  /* background-color: #dc3545; */
  color: #cecece;
  border: 1px solid red;
  box-shadow: 0 6px 18px #000000;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .one {
    flex-direction: column;
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
    margin: 5px 0;
  }

  .info {
    flex-direction: column;
  }

  .info h3,
  .info p {
    width: 100%;
  }

  .btns {
    flex-direction: column;
  }
}
</style>
