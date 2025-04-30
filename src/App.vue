<template>
  <v-app>
    <v-main :class="{ 'no-padding': $route.path === '/login' }">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
}
</script>
