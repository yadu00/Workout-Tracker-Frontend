<template>
 <div class="container1">
    <div class="height">
      <h1>Enter Height</h1>
      <div class="input">
        <v-text-field
          v-model="height"
          label="Height(Cm)"
          variant="outlined"
          rounded="lg"
        ></v-text-field>
        </div>
        <h1>Enter Weight</h1>
      <div class="input">
        <v-text-field
          v-model="weight"
          label="Weight(Kg)"
          variant="outlined"
          rounded="lg"
        ></v-text-field>
      
    </div>

    <!-- <div class="height">
      
      </div> -->
      
    </div>
    <div class="checkbmi">
        <button id="checkbmi-btn" @click="calculateBmi">Calculate BMI</button>
      </div>
      <div v-if="bmi" class="result">
        <h2>Your BMI: {{ bmi }}</h2>
        <p>
          Status: <strong>{{ bmiStatus }}</strong>
        </p>
        <button @click="recheck" id="recheck">Recheck</button>


        <button @click="submit" id="submit">Submit</button>

        
      </div>

    <div class="next">
      <button
        id="nextpage"
        @click="
          viewHistory();
        "
      >
        View History<v-icon size="100px">mdi-chevron-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getuser_id"]), 
  },
  data() {
    return {
      height: "",
      weight: "",
      bmi: null,
      bmiStatus: "",
      
      user: {
        bmi: "",
        name: "",
        totalworkouts: "",
        pendingworkouts: "",
        height: "",
        weight: "",
      },
      weights: [],
    };
  },

  methods: {
     recheck() {
      this.height = "";
      this.weight = "";
      this.bmi = null;
      this.bmiStatus = "";
    },

    async viewBmi() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/viewBmi", payload);
        if (result.success) {
          this.user = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },

   

    async submit() {
      try {
        const payload = {
          user_id: this.getuser_id,
          weight: this.weight,
          height:this.height,
          bmi: this.bmi,
        };
        const result = await this.$store.dispatch("User/logBmi", payload);
        if (result.success) {
          alert("new Bmi added");
        } else {
          alert(`failed: ${result.error}`);
        }
      } catch (error) {
        alert("Unexpected error.Please check console.");
      }
    },
    calculateBmi() {
      const height = parseFloat(this.height);
      const weight = parseFloat(this.weight);

      if (!height || !weight || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight.");
        return;
      }

      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      this.bmi = bmi;

      // Determine BMI status
      if (bmi < 18.5) {
        this.bmiStatus = "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        this.bmiStatus = "Normal";
      } else if (bmi >= 25 && bmi < 29.9) {
        this.bmiStatus = "Overweight";
      } else {
        this.bmiStatus = "Obese";
      }
    },
    viewHistory() {
      this.$router.push("/bmiHistory");
    },
  },

  mounted() {
   
    this.viewBmi();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.section3 {
  height: 60%;
  width: 100%;
}
.history {
  height: 10%;
  width: 100%;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-around;
  background-color: #0eb08f;
  align-items: center;
}
p {
  width: 20%;
  text-align: center;
}
h1 {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
.weighthistory {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}


.cards {
  height: 290px;
  width: 400px;
  display: flex;
  /* border-radius: 20px; */
  color: rgb(0, 0, 0);
  flex-direction: column;
  margin-bottom: 10px;
  transition: 1s ease;
  box-shadow: 0px 8px 16px 0px #00000033;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.three {
  height: 200px;
  width: 200px;
  border-radius: 20px;
}
#bmi-save-btn {
  background-color: #0eb08f;
  width: 100px;
  border-radius: 20px;
}


.container1 {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  color: white;
  justify-content: space-between;
  padding-top: 50px;
}
.height {
    margin-top: 100px;

  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  height: auto;
  width: 100%;
  margin-top: 20px;
}
.next {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100px;
  top: 100px;
}

.v-icon:hover {
  color: #00ff26;
  
}
.checkbmi{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
#checkbmi-btn {
  background-color: #00ff26;
  border-radius: 4px;
  width: 150px;
  height: 40px;
  color: #000;
}
#recheck{
   background-color: #565656;
  border-radius: 4px;
  width: 150px;
  height: 40px;
  color: #000;
}
#nextpage {
  border-radius: 20px;
  width: 200px;
  height: 50px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
}
.result{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 10px;
  color: #f0f0f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  transition: transform 0.3s ease-in-out;
  width: 300px;
}
</style>
