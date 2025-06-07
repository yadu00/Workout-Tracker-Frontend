<template>
  <div class="box">
    <div class="card">
      <div class="heading">
        <h1>Share Your Feedback</h1>
      </div>
      <div class="content">
        <h1>Rate Your Experience</h1>
        <div class="stars">
          <span
            v-for="n in 5"
            :key="n"
            @click="selectRating(n)"
            @mouseover="hoverRating = n"
            @mouseleave="hoverRating = 0"
            class="star"
            :class="{ filled: n <= (hoverRating || selectedRating) }"
          >
            ★
          </span>
        </div>
      </div>
      <div class="submit">
        <button id="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRating: 0,
      hoverRating: 0,
    };
  },
  methods: {
    selectRating(rating) {
      this.selectedRating = rating;
    },
    submitRating() {
      if (this.selectedRating === 0) {
        alert("Please select a rating before submitting.");
      } else {
        alert(`You rated: ${this.selectedRating} star(s)`);
        
      }
    },
  },
};
</script>


<style scoped>
.box {
  width: 95%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 40%;
  height: 60%;
  background-color: rgb(199, 199, 201);
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 5px;
}
.heading {
  width: 100%;
  height: 20%;
  background-color: rgb(232, 232, 232);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: rgb(0, 0, 0);
}
.content {
  width: 100%;
  height: 60%;
  background-color: rgb(16, 182, 41);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(191, 191, 191);
  flex-direction: column;
}
.submit {
  width: 100%;
  height: 20%;
  background-color: rgb(18, 75, 50);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgb(232, 232, 232);
}
#submit {
  width: 40%;
  height: 50%;
  background-color: rgb(37, 246, 0);
  color: black;
  border-radius: 5px;
}
.stars {
  display: flex;
  gap: 10px;
}
.star {
  font-size: 40px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}
.star.filled {
  color: gold;
}

</style>
