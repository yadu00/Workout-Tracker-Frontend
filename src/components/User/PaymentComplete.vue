<template>
  <div class="thank-you-container">
    <v-icon size="80" color="green">mdi-check-circle</v-icon>
    <h1>Payment Successful!</h1>
    <p>Thank you for your payment. Your subscription is now active.</p>
    <router-link to="/userHome">
      <v-btn color="primary" class="mt-4">Go to Dashboard</v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   computed: {
    ...mapGetters(["getuser_id"]),
    user_id() {
      return this.getuser_id;
    },
  },

};
</script>

<style scoped>
.thank-you-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}
</style>
