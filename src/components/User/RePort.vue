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
        <p>BMI</p>
        <h1>{{ user.bmi }}</h1>
      </div>
    </div>
    <div class="section2">
      <div class="height">
         <p>Height</p>
        <h1>{{ user.bmi }}</h1>
      </div>
      <div class="weight">
         <p>Weight</p>
        <h1>{{ user.bmi }}</h1>
      </div>

    </div>
    <div class="section3">
      <h1>UPDATE BMI</h1>
      <div class="scroll-container">
        <div class="height">
          <div class="vertical-scroll-container">
            <div ref="middleLineHeight" class="center-line vertical"></div>
            <div
              ref="scrollBoxHeight"
              class="scroll-box vertical"
              @scroll="updateSelectedHeight"
            >
              <div class="marks-list">
                <div
                  v-for="(mark, index) in heightMarks"
                  :key="index"
                  :class="{
                    'mark-item': true,
                    highlighted: mark === selectedHeightMark,
                  }"
                  class="mark-item"
                >
                  {{ mark }}
                </div>
              </div>
            </div>
          </div>

          <!-- Display selected height -->
          <div class="selected-mark-display">
            Height: {{ selectedHeightMark }}
          </div>
        </div>
        <div class="weight">
          <!-- Horizontal scroll for weight -->
          <div class="horizontal-scroll-container">
            <div ref="middleLineWeight" class="center-line horizontal"></div>
            <div
              ref="scrollBoxWeight"
              class="scroll-box horizontal"
              @scroll="updateSelectedWeight"
            >
              <div class="marks-list horizontal">
                <div
                  v-for="(mark, index) in weightMarks"
                  :key="index"
                  :class="{
                    'mark-item1': true,
                    highlighted: mark === selectedWeightMark,
                  }"
                  class="mark-item1"
                >
                  {{ mark }}
                </div>
              </div>
            </div>
          </div>

          <!-- Display selected weight -->
          <div class="selected-mark-display">
            Weight: {{ selectedWeightMark }}
          </div>
        </div>
        <div class="cards three">
          <h1>BMI</h1>
          <div class="bmi-display">
            <h4>Your BMI: {{ calculateBMI() }}</h4>
            <h4>{{ BMICategory() }}</h4>
          </div>
          <button id="bmi-save-btn" @click="addBmi">Save</button>
        </div>
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
  height: 100px;
  background-color: black;
  border-radius: 20px;
  margin-bottom: 20px;
  color: white;
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
  background-color: #dedede;
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
.section2 .height{
   width: 48%;
  height: 150px;
  background-color: #dedede;
  /* margin-bottom: 20px; */

  border-radius: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.section2 .weight{
   width: 48%;
  height: 150px;
  background-color: #dedede;
  /* margin-bottom: 20px; */

  border-radius: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.scroll-container {
  height: 390px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  /* background-color: rgb(0, 0, 0); */
  padding: 50px 50px;
  align-items: center;
  justify-content: space-around;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  box-shadow: 0px 8px 16px 0px #00000033;
}
.height {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.weight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

/* Vertical Scrollbox (Height) */
.vertical-scroll-container {
  position: relative;
  width: 100px;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #dedede;
  box-shadow: 0px 8px 16px 0px #00000033;
}

.scroll-box.vertical {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-box.vertical::-webkit-scrollbar {
  display: none;
}

.center-line.vertical {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 10;
}

.marks-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.mark-item {
  font-size: 14px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  color: #757575;
  transition: transform 0.5s ease;
}

.mark-item::after {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  background-color: #000000;
  margin-left: 10px;
}

.highlighted {
  font-weight: bold;
  color: #ff1900;
  transform: scale(1.1) !important;
  transition: transform 0.5s ease !important;
}

.selected-mark-display {
  font-size: 15px;
  margin-top: 10px;
  font-weight: bold;
  color: #000000;
}

/* Horizontal Scrollbox (Weight) */
.horizontal-scroll-container {
  position: relative;
  width: 300px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #dedede;
  box-shadow: 0px 8px 16px 0px #00000033;
}

.scroll-box.horizontal {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  position: relative;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-box.horizontal::-webkit-scrollbar {
  display: none;
}

.center-line.horizontal {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  z-index: 10;
  transform: translateX(-50%);
}
.marks-list.horizontal {
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* Ensure scrolling starts from the left */
  align-items: center;
  gap: 10px;
  width: max-content; /* Ensures the width is based on content size */
}

.mark-item1 {
  font-size: 18px;
  width: 30px; /* Adjust width for horizontal layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #757575;
  transition: transform 0.5s ease;
  margin-top: 30px;
}

.mark-item1::after {
  content: "";
  display: block;
  width: 2px;
  height: 40px;
  margin-left: 10px;
}
.cards {
  height: 290px;
  width: 400px;
  display: flex;
  /* border-radius: 20px; */
  background-color: #dedede;
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
</style>
