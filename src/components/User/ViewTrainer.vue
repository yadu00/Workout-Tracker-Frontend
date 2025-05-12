<template>
  <div class="container">
    <div class="heading">
      <h1>Trainer</h1>
    </div>
    <div class="trainer-card">
      <img :src="require('@/assets/img/profile.png')" alt="" />
      <h3>{{ trainer.name }}</h3>
      <p>Certification: {{ trainer.certification }}</p>
      <p>Experience: {{ trainer.experienceYears }}</p>
      <p>Mobile No:</p>
      <p>Email</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trainer: {
        name: "",
        certification: "",
        experienceYears: "",
      }
    };
  },
  computed: {
    ...mapGetters(["getuser_id"]), // Map the getter directly
  },
  methods: {
    async viewTrainer() {
      try {
        const payload = {
          user_id: this.getuser_id,
        };
        const result = await this.$store.dispatch("User/viewtrainer", payload);
        if (result.success) {
          this.trainer = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Trainer:", error);
      }
    },
  },
  mounted() {
    this.viewTrainer();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
}
.trainer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: #bababae3;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.753);
  padding: 15px;
  margin-bottom: 15px;
  color: rgb(0, 0, 0);
}
.trainer-card img {
  width: 250px;
  height: 250px;
}

.trainer-card h3 {
  margin: 0;
  font-size: 18px;
}

.trainer-card p {
  margin: 5px 0;
  color: #000000;
  font-size: larger;
}
</style>
