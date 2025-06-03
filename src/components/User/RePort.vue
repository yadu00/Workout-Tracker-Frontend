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
        <router-link to="/bmi" style="text-decoration: none; color: black;text-align: center;"
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
  min-height: 100vh;
  padding: 20px;
  /* background: #121212; Dark background */
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #eee;
  justify-content: center;
}

.title {
  width: 800px;
  height: 80px;
  margin-left: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 12px rgba(79, 84, 200, 0.5);
 
  transform: translateX(-50%);
}

.reports {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 130px;
}

.section1 {
  flex: 1;
  height: 160px;
  background: #1f1f1f;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  color: #82c91e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  transition: background 0.3s ease;
  cursor: default;
}
.section1:hover {
  background: #2a2a2a;
}

.section1 p {
  font-size: 1.25rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #a8d08d;
}

.section1 h1 {
  font-size: 3.5rem;
  color: #e6f7d4;
}

.section2 {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.section2 .height,
.section2 .weight {
  flex: 1;
  height: 160px;
  border-radius: 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: #222;
  background: #e3e3e3;
  transition: box-shadow 0.3s ease;
}

.section2 .height {
  background: #aa0000;
  color: white;
  box-shadow: 0 4px 20px rgba(74,144,226,0.5);
}

.section2 .height p {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.section2 .height h1 {
  font-size: 2.8rem;
  font-weight: 700;
}

.section2 .weight {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.weight p {
  flex-grow: 1;
  font-size: 2.8rem;
  font-weight: 700;
  background: #d8d8d8;
  color: #333;
  border-radius: 20px 0 0 20px;
  text-align: center;
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}



</style>
