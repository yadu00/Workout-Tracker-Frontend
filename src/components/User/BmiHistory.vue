<template>
  <div class="container">
    <div class="heading">
      <h1>BMI History</h1>
    </div>
    <div class="title">
      <div class="names">
        <p style="font-weight: bold">Height</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">Weight</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">BMI</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">Date</p>
      </div>
      
    </div>
    <div class="card" v-for="(b, index) in bmi" :key="index">
      <div class="names">
        <p style="font-weight: bold">{{ b.height }}</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">{{b.weight}}</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">{{ b.bmi }}</p>
      </div>
      <div class="names">
        <p style="font-weight: bold">{{ b.logDate }}</p>
      </div>    
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  data() {
    return {
      bmi: [],
    };
  },
  methods: {
    async bmiHistory() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/bmiHistory", payload);
        if (result.success) {
          this.bmi = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
  },
   mounted() {
       this.bmiHistory();
  },
};
</script>

<style scoped>
.container{
    padding: 20px;
}
.heading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(246, 111, 0, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.names {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.card{
     display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  transition: background 0.3s ease;
  color: #fff;
}


</style>
