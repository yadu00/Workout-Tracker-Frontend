<template>
  <div>
    <div class="text-center mb-4">
      <div>Current Weight: {{ currentWeight }} kg</div>
      <div>Target Weight: {{ targetWeight.toFixed(1) }} kg</div>
    </div>

    <v-sparkline
      :model-value="weightValues"
      :line-width="4"
      :padding="16"
      :smooth="true"
      :gradient="['#42b3f4', '#1feaea']"
      type="trend"
      auto-draw
      style="height: 100px"
    />

    <div class="d-flex justify-space-between mt-2 px-4" style="font-size: 12px; color: gray;">
      <div>{{ currentWeight }}kg</div>
      <div>{{ middleWeight }}kg</div>
      <div>{{ targetWeight.toFixed(1) }}kg</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      bmi: {
        weight: 0,
        height: 0,
      },
    };
  },
  computed: {
    currentWeight() {
      return this.bmi.weight || 0;
    },
    targetWeight() {
      const heightM = this.bmi.height / 100;
      const maxHealthyWeight = 25 * heightM * heightM;
      return this.currentWeight > maxHealthyWeight
        ? maxHealthyWeight
        : this.currentWeight;
    },
    weightValues() {
      const steps = 10;
      const diff = (this.targetWeight - this.currentWeight) / steps;
      return Array.from({ length: steps + 1 }, (_, i) =>
        Math.round((this.currentWeight + i * diff) * 10) / 10
      );
    },
    middleWeight() {
      return Math.round((this.currentWeight + this.targetWeight) / 2);
    },
    ...mapGetters(["getuser_id"]),
  },
  methods: {
    async viewBmi() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/viewBmi", payload);
        if (result.success) {
          this.bmi = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading BMI data:", error);
      }
    },
  },
  mounted() {
    this.viewBmi();
  },
};
</script>
