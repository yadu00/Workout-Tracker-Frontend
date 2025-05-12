<template>
  <div class="container">
    <h1>Your Body Mass Index</h1>
    <div class="content">
      <h3>{{ user.bmi }}</h3>
      <p>You Are {{ bmiLevel }}</p>
    </div>
    <div class="nextpage">
      <button id="nextpagebtn" @click="gotoselecttrainer">
        <v-icon size="70px">mdi-chevron-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        bmi: "",
      },
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth?.user_id; // Access user_id from Vuex store
    },
    ...mapGetters(["getuser_id"]),
    bmiLevel() {
      const bmi = parseFloat(this.user.bmi);
      if (isNaN(bmi)) return "Unknown";

      if (bmi < 18.5) return "Underweight";
      else if (bmi < 24.9) return "Normal";
      else if (bmi < 29.9) return "Overweight";
      else return "Obese";
    },
  },
  methods: {
    gotoselecttrainer() {
      this.$router.push("/selectTrainer");
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
  justify-content: center;
  align-items: center;
}
.content {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(53, 53, 53);
  color: white;
  border-radius: 25px;
}
.nextpage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}
#nextpagebtn {
  width: 70px;
  height: 70px;
  border: 1px solid black;
  border-radius: 50px;
}
</style>
