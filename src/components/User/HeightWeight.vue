<template>
  <div class="container1">
    <div class="height">
      <h1>What's your Height</h1>
      <div class="input">
        <v-text-field v-model="height"
          label="Height(Cm)"
          variant="outlined"
          rounded="lg"
        ></v-text-field>
      </div>
    </div>

    <div class="height">
      <h1>What's your current Weight</h1>
      <div class="input">
        <v-text-field v-model="weight"
          label="Weight(Kg)"
          variant="outlined"
          rounded="lg"
        ></v-text-field>
      </div>
    </div>

    <div class="next">
        <button id="nextpage" @click="addBmi();gotobmi()"><v-icon size="70px">mdi-chevron-right</v-icon></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
 data(){
  return{
    height:"",
    weight:"",
  }
 },
    computed: {
      userId() {
        return this.$store.state.auth?.user_id; // Access user_id from Vuex store
      },...mapGetters(['getuser_id']),
    },
   
    methods: {
        gotobmi() {
        
          this.$router.push("/bmi");
       
      },
      async addBmi() {
      try {
        const payload={
          user_id : this.getuser_id,
          height:this.height,
          weight:this.weight
        }
        
        const result = await this.$store.dispatch("User/addBmi",payload);
        
        if (result.success) {
          // alert("Bmi Added successfully!");
        } else {
          alert(`Bmi Adding failed: ${result.error}`);
        }
      } catch (error) {
        alert("Unexpected error. Please check console.");
      }
    },
    }

};
</script>

<style scoped>
.container1 {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.height {
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input{
    height: auto;
    width: 100%;
    margin-top: 20px;
    display: flex;
}
.next{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
   
}

</style>
