<template>
  <div class="container">
    <div class="title">
      <h1>REPORT</h1>
    </div>
    <div class="reports">
      <div class="section1">
        <p>TOTAL WORKOUTS DONE</p>
        <h1>{{ user.totalworkouts }}</h1>
      </div>
      <div class="section1">
        <p>Pending Workouts</p>
        <h1>{{ user.pendingworkouts }}</h1>
      </div>
    </div>
    <div class="section2">
      <div class="height">
        <p>Height</p>
        <h1>{{ user.height }} cm</h1>
      </div>
      <div class="weight">
        <p>Weight : {{ user.weight }} kg</p>
        <router-link to="/updateweight" style="text-decoration: none; color: black;text-align: center;"
          >
          <v-icon size="70px">mdi-chevron-right</v-icon>
        <p style="font-size: 25px;">update</p></router-link>
        
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
      heightMarks: Array.from({ length: 251 }, (_, i) => i), // Height range: 0 to 250
      weightMarks: Array.from({ length: 251 }, (_, i) => i), // Weight range: 0 to 250
      selectedHeightMark: 150,
      selectedWeightMark: 50,
      user: {
        bmi: "",
        name: "",
        totalworkouts: "",
        pendingworkouts: "",
        height: "",
        weight: "",
      },
    };
  },

  methods: {
    updateSelectedHeight() {
      this.$nextTick(() => {
        const middleLinePosition =
          this.$refs.middleLineHeight.getBoundingClientRect().top;
        let closestMark = null;
        let minDistance = Infinity;

        this.heightMarks.forEach((mark, index) => {
          const markElement =
            this.$refs.scrollBoxHeight.children[0].children[index];
          const markPosition = markElement.getBoundingClientRect();
          const markCenter = markPosition.top + markElement.offsetHeight / 2;
          const distanceToMiddle = Math.abs(markCenter - middleLinePosition);

          if (distanceToMiddle < minDistance) {
            minDistance = distanceToMiddle;
            closestMark = mark;
          }
        });

        this.selectedHeightMark = closestMark;
      });
    },
    updateSelectedWeight() {
      this.$nextTick(() => {
        const middleLinePosition =
          this.$refs.middleLineWeight.getBoundingClientRect().left;
        let closestMark = null;
        let minDistance = Infinity;

        this.weightMarks.forEach((mark, index) => {
          const markElement =
            this.$refs.scrollBoxWeight.children[0].children[index];
          const markPosition = markElement.getBoundingClientRect();
          const markCenter = markPosition.left + markElement.offsetWidth / 2;
          const distanceToMiddle = Math.abs(markCenter - middleLinePosition);

          if (distanceToMiddle < minDistance) {
            minDistance = distanceToMiddle;
            closestMark = mark;
          }
        });

        this.selectedWeightMark = closestMark;
      });
    },
    calculateBMI() {
      if (this.selectedHeightMark > 0 && this.selectedWeightMark > 0) {
        const heightInMeters = this.selectedHeightMark / 100;
        return (
          this.selectedWeightMark /
          (heightInMeters * heightInMeters)
        ).toFixed(2);
      }
      return 0;
    },
    BMICategory() {
      const bmi = parseFloat(this.calculateBMI()); // Convert to number
      if (bmi < 18.5) return "Underweight";
      if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
      if (bmi >= 25 && bmi < 29.9) return "Overweight";
      return "Obese";
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
    async viewtotalworkouts() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch(
          "User/viewtotalworkouts",
          payload
        );
        if (result.success) {
          this.user.totalworkouts = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
    async viewPendingworkouts() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch(
          "User/viewPendingworkouts",
          payload
        );
        if (result.success) {
          this.user.pendingworkouts = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainers:", error);
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.scrollBoxHeight && this.$refs.scrollBoxWeight) {
          // Center the height scroll initially
          this.$refs.scrollBoxHeight.scrollTop =
            this.$refs.scrollBoxHeight.scrollHeight / 2 -
            this.$refs.scrollBoxHeight.offsetHeight / 2;

          // Center the weight scroll initially
          this.$refs.scrollBoxWeight.scrollLeft =
            this.$refs.scrollBoxWeight.scrollWidth / 6 -
            this.$refs.scrollBoxWeight.offsetWidth / 4;

          // Update the selected marks
          this.updateSelectedHeight();
          this.updateSelectedWeight();
        } else {
          console.error("Scrollbox refs are not available.");
        }
      }, 100); // Add slight delay to ensure DOM is ready
    });

    this.viewBmi();
    this.viewtotalworkouts();
    this.viewPendingworkouts();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  width: 80%;
  height: 75px;
  background-color: rgb(155, 155, 155);
  border-radius: 50px;
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
}
.reports {
  width: 97%;
  height: auto;
  display: flex;
  justify-content: space-around;
}
.section1 {
  margin-top: 120px;
  width: 48%;
  height: 150px;
  background-color: #d2cf01;
  /* margin-bottom: 20px; */

  border-radius: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* box-shadow: 0px 8px 16px 0px #00000033; */
}

.section1 p {
  font-size: xx-large;
  font-weight: bold;
}
.section2 {
  width: 97%;
  height: auto;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.section2 h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.section2 .height {
  width: 48%;
  height: 150px;
  background-color: #d2d2d2;
  /* margin-bottom: 20px; */

  border-radius: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.section2 .weight {
  width: 48%;
  height: 150px;
  background-color: #c3c4c4;
  /* margin-bottom: 20px; */

  border-radius: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.weight p {
  width: 80%;
  height: 100%;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
