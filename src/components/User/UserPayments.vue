<template>
  <div class="payment">
    payments
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getuser_id']),  // Map the getter directly
  },
}
</script>

<style>

</style>