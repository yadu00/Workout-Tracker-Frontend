<template>
  <div class="container">
     <div class="skipbtn">
      <button id="backbtn" @click="gotoPreviousPage">Back</button>
    </div>
    <div class="box">
      <div class="profileimg">
        <v-icon size="100px">mdi-account-circle</v-icon>
        <h1>{{ trainer.name }}</h1>
      </div>
      <div class="about">
        <p>Services</p>
      </div>
      <div class="info">
        <p>Certification: {{ trainer.certification }}</p>
        <p>Experience: {{ trainer.experienceYears }}</p>
        <p>Mobile No: {{ trainer.mobile }}</p>
        <p>Email: {{ trainer.email }}</p>
      </div>
      <div class="button">
        <div class="rate">
          <v-icon>mdi-currency-inr</v-icon
          ><span style="font-size: 30px; font-weight: bolder">{{
            trainer.salary
          }}</span
          >/month
        </div>
        <button id="paynow" @click="dialog=true">Assign</button>
      </div>
    </div>
   
  </div>

  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirm Assignment</v-card-title>
      <v-card-text>Are you sure you want to assign this trainer?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="assigntrainer(trainer)">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
// import axios from "axios";

// /* global Razorpay */
export default {
  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  data() {
    return {
      trainer: {
        name: "",
        certification: "",
        experienceYears: "",
        mobile: "",
        email: "",
      },
      dialog: false,
    };
  },
 created() {
    this.trainer_id = this.$route.query.trainer_id;
    // Get user_id from URL
  },
  methods: {
    async viewTrainer() {
      try {
        const trainer_id=this.trainer_id;
        const result = await this.$store.dispatch("Trainer/fetchTrainerProfile", trainer_id);
        if (result.success) {
          this.trainer = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainer:", error);
      }
    }
    // async payNow() {
    //   try {
    //     // 1. Create Razorpay Order
    //     const response = await fetch(
    //       "http://localhost:8080/api/payment/create-order",
    //       {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           user_id: this.getuser_id,
    //           trainer_id: this.trainer.trainer_id,
    //           amount: this.trainer.salary, // Razorpay amount is in paise
    //           currency: "INR",
    //           receipt: `receipt_${Date.now()}`,
    //         }),
    //       }
    //     );
    //     const order = await response.json();

    //     // 2. Launch Razorpay Checkout
    //     const options = {
    //       key: "rzp_test_HuHUxlqNnkmZ76", // Replace with your Razorpay key
    //       amount: order.amount,
    //       user_id: this.getuser_id,
    //       trainer_id: this.trainer.trainer_id,
    //       currency: order.currency,
    //       name: "Workout Tracker",
    //       description: "Trainer Subscription Payment",
    //       order_id: order.id,

    //       handler: async (response) => {
    //         const verifyRes = await axios.post(
    //           "http://localhost:8080/api/payment/verify",
    //           {
    //             razorpay_order_id: response.razorpay_order_id,
    //             razorpay_payment_id: response.razorpay_payment_id,
    //             razorpay_signature: response.razorpay_signature,
    //           }
    //         );

    //         if (verifyRes.data === "Payment Verified") {
    //           this.$router.push("/paycomplete");
    //         } else {
    //           alert("❌ Payment verification failed");
    //         }
    //       },

    //       theme: {
    //         color: "#3399cc",
    //       },
    //     };

    //     const rzp = new Razorpay(options);
    //     rzp.open();
    //   } catch (error) {
    //     console.error("Payment Error:", error);
    //   }
    // }
    ,
    gotoPreviousPage() {
      this.$router.push("/selectTrainer");
    },
    async assigntrainer() {
      try {
        const payload = {
          user_id: this.getuser_id,
          trainer_id: this.$route.query.trainer_id,
        };
        const result = await this.$store.dispatch(
          "User/assigntrainer",
          payload
        );
        if (result.success) {
          alert("Trainer assigned")
          this.$router.push("/userdetails");
        } else {
          console.error("Error assigning trainer:", result.error);
        }
      } catch (error) {
        console.error("Error assigning:", error);
      }
    },
  },
  mounted() {
    this.viewTrainer();

    // Attach click event for Pay Now
    setTimeout(() => {
      // const payBtn = document.getElementById("paynow");
      // if (payBtn) {
      //   payBtn.addEventListener("click", this.payNow);
      // }
    }, 100); // Ensure DOM is loaded
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #292929;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
}
.backbutton {
  width: 100%;
}
#backbtn {
  width: 100px;
  height: 30px;
  background-color: white;
  border-radius: 4px;
  font-weight: bolder;
}
.skipbtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
#skipbtn {
  width: 150px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  font-weight: bolder;
}

.box {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.profileimg {
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: inset 0 -4px 10px rgba(0, 0, 0, 0.2);
}

.profileimg v-icon {
  margin-bottom: 12px;
  font-size: 96px !important;
}

.profileimg h1 {
  margin: 0;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 1px;
}

.about {
  padding: 24px 32px;
  background-color: #fafafa;
  font-size: 1.1rem;
  color: #444;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  min-height: 100px;
}

.info {
  padding: 24px 32px;
  background-color: #fff;
  font-size: 1rem;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 400;
}

.info p {
  margin: 0;
  line-height: 1.4;
}

.button {
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}

.rate {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
}

.rate v-icon {
  color: #2a9d8f;
  font-size: 28px !important;
}

#paynow {
  padding: 12px 32px;
  background-color: #2a9d8f;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 36px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(42, 157, 143, 0.4);
}

#paynow:hover {
  background-color: #23867a;
  box-shadow: 0 6px 18px rgba(35, 134, 122, 0.6);
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn.cancel {
  background: #ccc;
}

.btn.confirm {
  background: #4caf50;
  color: white;
}

@media (max-width: 520px) {
  .box {
    max-width: 100%;
    border-radius: 12px;
  }
  .profileimg {
    height: 140px;
  }
  .profileimg v-icon {
    font-size: 80px !important;
  }
  .profileimg h1 {
    font-size: 24px;
  }
  .about,
  .info,
  .button {
    padding: 20px;
  }
  #paynow {
    width: 100%;
  }
  .button {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
