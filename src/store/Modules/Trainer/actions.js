import axios from "axios";
export default {
  //trainer registration
  async signupTrainer({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/trainer/add-trainer`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Trainer signed up successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  //view clients
  async viewClients({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewClients`,
        {
          params: { trainer_id },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("clients fetched successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error(
        " Failed to fetch clients:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch clients.",
      };
    }
  },

  async goToScheduleWorkout(user_id) {
    try {
      this.$router.push({ name: "ScheduleWorkout", params: { user_id } });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  },

  //fetch trainer profile
  async fetchTrainerProfile({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/ViewProfile`,
        {
          params: { trainer_id },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching trainer Profile:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching trainer Profile.",
      };
    }
  },

  //add exercise
  async uploadExercise({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/trainer/addExcercises`,
         payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Exercise added successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  //view created exercise
  async fetchExercise({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewExercises`,
        {
          params: { trainer_id },
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
      console.error("Error fetching Exercise:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching Exercise.",
      };
    }
  },

  //create workout
  async addworkouts({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/trainer/create-workout`,
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("workout added successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  //view scheduled workout
  async fetchWorkout({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewWorkout`,
        {
          params: {
            user_id: payload.user_id,
            workoutdayId: payload.workoutdayId,
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
      console.error("Error fetching workout:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching workout.",
      };
    }
  },

  //fetch created exercise
  async loadExercise({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewExercises`,
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
      console.error("Error fetching exercise:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching exercise.",
      };
    }
  },

  //delete trainer account
  async deleteAccount({ rootGetters }, trainer_id) {
    try {
      const response = await axios.delete(
        `${rootGetters.getUrl}/api/trainer/DeleteProfile`,
        {
          params: { trainer_id },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.message || "An error occurred while deleting trainer Profile.",
      };
    }
  },

 
  //create weekly workout
  async weeklyworkout({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/trainer/schedule-weekly-workout`,
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("weekly workout added successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

 
  //view weekdays
  async loaddaylyworkouts({ rootGetters }, payload) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/getWeeklyWorkouts`,
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
      console.error("Error fetching weekly workout:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching weekly workout.",
      };
    }
  },

  //fetch specialization
  async fetchspecialisation({ rootGetters }) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewSpecialization`
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
      console.error("Error fetching Specialisation:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while fetching Specialisation.",
      };
    }
  },

  //create about
  async about({ rootGetters }, payload) {
    try {
      const response = await axios.put(
        `${rootGetters.getUrl}/api/trainer/createabout`,
        null,
        {
          params: payload,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("about added successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  //view about
  async showabout({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/viewabout`,
        {
          params: { trainer_id: trainer_id },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response format" };
      }
    } catch (error) {
      console.error("Error fetching about:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching about.",
      };
    }
  },

  //delete exercise
  async deleteExercise({ rootGetters }, payload) {
    try {
      const response = await axios.delete(
        `${rootGetters.getUrl}/api/trainer/deleteExercise`,
        {
          params: payload,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "An error occurred while deleting exercise.",
      };
    }
  },


  //delete exercise
  async deleteWorkout({ rootGetters }, payload) {
    try {
      const response = await axios.delete(
        `${rootGetters.getUrl}/api/trainer/DeleteWorkouts`,
        {
          params: payload,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "An error occurred while deleting exercise.",
      };
    }
  },

  //view clients workout not scheduled
  async workoutNotScheduled({ rootGetters }, trainerId) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/unscheduled-users`,
        {
          params: { trainerId },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("clients fetched successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error(
        " Failed to fetch clients:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch clients.",
      };
    }
  },

  async Subscribedclients({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(
        `${rootGetters.getUrl}/api/trainer/payment/status`,
        {
          params: { trainer_id },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("clients fetched successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error(
        " Failed to fetch clients:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch clients.",
      };
    }
  },
};
