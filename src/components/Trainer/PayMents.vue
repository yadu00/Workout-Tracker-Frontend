<template>
  <div class="div">
    iii
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['gettrainer_id']),  // Map the getter directly
  },
}
</script>

<style scoped>

</style>