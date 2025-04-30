<template>
    <div>
      <div class="text-center mb-4">
        <div>Current Weight: {{ currentWeight }} kg</div>
        <div>Target Weight: {{ targetWeight }} kg</div>
      </div>
  
      <!-- Sparkline -->
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
  
      <!-- Fake X-Axis -->
      <div class="d-flex justify-space-between mt-2 px-4" style="font-size: 12px; color: gray;">
        <div>{{ currentWeight }}kg</div>
        <div>{{ middleWeight }}kg</div>
        <div>{{ targetWeight }}kg</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      currentWeight: 85,
      targetWeight: 70,
    }),
    computed: {
      weightValues() {
        const steps = 10
        const diff = (this.targetWeight - this.currentWeight) / steps
        return Array.from({ length: steps + 1 }, (_, i) => this.currentWeight + i * diff)
      },
      middleWeight() {
        return Math.round((this.currentWeight + this.targetWeight) / 2)
      }
    }
  }
  </script>
  