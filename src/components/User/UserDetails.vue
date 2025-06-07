<template>
  <div class="container">
    <div class="box">
      <h1>Pay Now</h1>
      <div class="button">
        <div class="rate">
          <v-icon>mdi-currency-inr</v-icon
          ><span style="font-size: 30px; font-weight: bolder">{{
            trainer.salary
          }}</span
          >/month
        </div>
        <button id="paynow" @click="dialog=true">Pay Now</button>
      </div>
      <button id="skip" @click="gotodashBoard">Skip</button>

    </div>
   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

/* global Razorpay */
export default {
  computed: {
    ...mapGetters(["getuser_id"]), 
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

  methods: {
    async viewTrainer() {
      try {
        const payload = { user_id: this.getuser_id };
        const result = await this.$store.dispatch("User/viewtrainer", payload);
        if (result.success) {
          this.trainer = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainer:", error);
      }
    },

    async payNow() {
      try {
        // 1. Create Razorpay Order
        const response = await fetch(
          "http://localhost:8080/api/payment/create-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: this.getuser_id,
              trainer_id: this.trainer.trainer_id,
              amount: this.trainer.salary, // Razorpay amount is in paise
              currency: "INR",
              receipt: `receipt_${Date.now()}`,
            }),
          }
        );
        const order = await response.json();

        // 2. Launch Razorpay Checkout
        const options = {
          key: "rzp_test_HuHUxlqNnkmZ76", // Replace with your Razorpay key
          amount: order.amount,
          user_id: this.getuser_id,
          trainer_id: this.trainer.trainer_id,
          currency: order.currency,
          name: "Workout Tracker",
          description: "Trainer Subscription Payment",
          order_id: order.id,

          handler: async (response) => {
            const verifyRes = await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data === "Payment Verified") {
              this.$router.push("/paycomplete");
            } else {
              alert("❌ Payment verification failed");
            }
          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment Error:", error);
      }
    },
    gotodashBoard() {
      this.$router.push("/userHome");
    },
    
  },
  mounted() {
    this.viewTrainer();

    // Attach click event for Pay Now
    setTimeout(() => {
      const payBtn = document.getElementById("paynow");
      if (payBtn) {
        payBtn.addEventListener("click", this.payNow);
      }
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


.skipbtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
}


.box {
  width: 100%;
  max-width: 480px;
  background: #56565619;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    color: white;

}


.button {
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* background: #1e1e1e27; */
  border-top: 1px solid #eee;
  color: white;
}

.rate {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fafafa;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100px;
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




#skip{
  background: #2020c9;
  color: white;
  height: 40px;
  width: 100px;
  border-radius: 20px;
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
