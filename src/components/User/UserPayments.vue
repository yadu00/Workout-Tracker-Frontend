<template>
  <div class="container">

    <div class="box1">
      <div class="title">
        <h1>Previous Payment History</h1>
        <div class="button">
                <div class="rate">
                  <v-icon>mdi-currency-inr</v-icon><span style="font-size: 30px;font-weight: bolder;">{{trainer.salary}}</span>/month</div>
        <button id="paynow" @click="gotoPayNow">Pay Now</button>
      </div>
      </div>
      <div class="table">
        <div class="paytitle head">
          <div class="paymenthead">
            <p style="font-weight: bold">Amount</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Payment Date</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Status</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Subscription Start</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">Expiry</p>
          </div>
        </div>
        <div class="paytitle" v-for="(detail) in details"
            :key="detail.id">
          <div class="paymenthead">
            <p style="font-weight: bold">{{detail.amount}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{detail.payment_date.split('T')[0]}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{detail.status}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{detail.subscriptionStart.split('T')[0]}}</p>
          </div>
          <div class="paymenthead">
            <p style="font-weight: bold">{{detail.subscriptionEnd.split('T')[0]}}</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getuser_id']),  // Map the getter directly
  },
  data(){
    return{
      trainer:{
        name: "",
        certification: "",
        experienceYears: "",
        mobile: "",
        email: "",
      },
      details:[]
    }
  },methods: {
    gotoPayNow(){
      this.$router.push('/paynow')
    },
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
  async paymentDetails() {
      try {
        const payload = { user_id: this.getuser_id };
        const result = await this.$store.dispatch(
          "User/fetchpaymentdetails",
          payload
        );
        if (result.success) {
          this.details = result.data;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

  
},
mounted() {
  this.viewTrainer();
  this.paymentDetails();
}
}
</script>
<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background: #292929;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);

}
.box1 {
  width: 100%;
    height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.title{
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.paytitle {
 display: flex;
   color: rgb(159, 159, 159);

  flex-wrap: wrap;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.head{
  background-color: #c3c3c350;
  font-weight: bold;
  border-radius: 10px;
  color: white;
}
.paymenthead{
   flex: 1 1 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paymentbody {
 flex: 1 1 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  width: 100%;
  display: flex;
  
}

.profileimg {
  background: linear-gradient(135deg, #191919 0%, #ff0000 100%);
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
  color: white;
}

.rate {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
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
  background-color: #bbff00;
  color: rgb(0, 0, 0);
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 36px;
  cursor: pointer;
      margin-left: 5px;

  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(42, 157, 143, 0.4);
}

#paynow:hover {
  background-color: #ffd900;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
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
