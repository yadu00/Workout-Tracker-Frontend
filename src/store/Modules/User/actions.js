import axios from "axios";
export default {

  //user registration
  async signupUser({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/user/add-user`,
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("User signed up successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  //add bmi
  async addBmi({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/user/addBmi`,
        null,
        {
          params: {
            user_id: payload.user_id,
            height: payload.height,
            weight: payload.weight,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error Adding Bmi:", error);
      return {
        success: false,
        error: error.message || "An error occurred while Adding Bmi.",
      };
    }
  },



  //view bmi
  async viewBmi({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/viewBmi`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error viewing Bmi:", error);
      return {
        success: false,
        error: error.message || "An error occurred while viewing Bmi.",
      };
    }
  },


  //view trainers
  async selectTrainers({ rootGetters }) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/viewTrainers`
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching trainers.",
      };
    }
  },

  //view specializations
  async loadSpecializations({ rootGetters }) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/admin/viewspecialisations`
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching specializations:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching specializations.",
      };
    }
  },

  //filter trainers according to specializations
  async loadspectrainers({ rootGetters }, specialization_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/viewTrainers/specialization`,
        {
          params: { specialization_id },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching trainers.",
      };
    }
  },

  //assign trainer
  async assigntrainer({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/user/assign`,
        payload
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error Assigning trainer:", error);
      return {
        success: false,
        error: error.message || "An error occurred while Assigning trainer.",
      };
    }
  },

  
//fetch user profile
  async fetchProfile({ rootGetters }, user_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/ViewProfile`,
        {
          params: { user_id },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching User Profile:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching user Profile.",
      };
    }
  },

  //delete user account
  async deleteAccount({ rootGetters }, user_id) {
    try {
      const response = await axios.delete(
        `${rootGetters.getUrl}/api/user/DeleteProfile`,
        {
          params: { user_id },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error deleting User Profile:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while deleting user Profile.",
      };
    }
  },

 
 //fetch workout
  async fetchWorkout({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/viewWorkouts`,
        {
          params: {
            user_id: payload.user_id,
            weekdayId: payload.weekdayId, // Ensure the date format is correct (YYYY-MM-DD)
          },
        }
      );

      console.log("API Response:", response.data); // Debugging log

      if (
        response.status >= 200 &&
        response.status < 300 &&
        Array.isArray(response.data)
      ) {
        return { success: true, data: response.data };
      } else {
        console.error("Unexpected API response format:", response.data);
        return { success: false, error: "Unexpected response format" };
      }
    } catch (error) {
      console.error("Error fetching workout:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching workout.",
      };
    }
  },


  //fetch weekly workout
  async loadWeekdays({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/weeklyworkout`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching weeklyworkout:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching weeklyworkout.",
      };
    }
  },


  //view assigned trainer
  async viewtrainer({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/ViewAssignedTrainer`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching trainer:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching trainer.",
      };
    }
  },


  //update workout status
  async logworkout({ rootGetters }, payload) {
    try {
      const response = await axios.put(
        `${rootGetters.getUrl}/api/user/UpdateWorkoutStatus?user_id=${payload.user_id}&workout_id=${payload.workout_id}`
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating workout status", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "An error occurred while updating workout status",
      };
    }
  },


  //fetch total workouts done
  async viewtotalworkouts({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/totalworkoutsdone`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error viewing total workouts:", error);
      return {
        success: false,
        error: error.message || "Error viewing total workouts:.",
      };
    }
  },
  //fetch total workouts pending
  async viewPendingworkouts({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/totalworkoutspending`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error viewing total workouts:", error);
      return {
        success: false,
        error: error.message || "Error viewing total workouts:.",
      };
    }
  },
  


  //fetch todays workout exercise
  async fetchTodaysWorkout({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/viewtodaysworkouts`,
        {
          params: {
            user_id: payload.user_id,
            workoutdate: payload.workoutdate, 
          },
        }
      );


      if (
        response.status >= 200 &&
        response.status < 300 &&
        Array.isArray(response.data)
      ) {
        return { success: true, data: response.data };
      } else {
        console.error("Unexpected API response format:", response.data);
        return { success: false, error: "Unexpected response format" };
      }
    } catch (error) {
      console.error("Error fetching todays Exercises:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching todays Exercises.",
      };
    }
  },


  //Log Weight
async logweight({ rootGetters }, payload) {
  try {
    const { user_id, ...weightModel } = payload;

    const response = await axios.post(
      `${rootGetters.getUrl}/api/user/logWeight?user_id=${user_id}`,
      weightModel  // this is the body
    );

    if (response.status >= 200 && response.status < 300) {
      console.log("Weight logged successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Error logging weight:", error);
    return { success: false };
  }
},

//fetch weight history
  async weightHistory({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/weightHistory`,
        {
          params: {
            user_id: payload.user_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error viewing total workouts:", error);
      return {
        success: false,
        error: error.message || "Error viewing total workouts:.",
      };
    }
  },



  //post rating
async addRating({ rootGetters }, payload) {
  try {
   

    const response = await axios.post(
      `${rootGetters.getUrl}/api/user/addRating`,
        null,
        {
          params: {
            user_id: payload.user_id,
            rating: payload.rating,
          },
        }
      );

    if (response.status >= 200 && response.status < 300) {
      console.log("rating posted successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Error posting rating:", error);
    return { success: false };
  }
},

//fetch rating 
  async fetchrating({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/user/showRating`,
        {
          params: {
            trainer_id: payload.trainer_id,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error viewing rating", error);
      return {
        success: false,
        error: error.message || "Error viewing rating:.",
      };
    }
  },

};
