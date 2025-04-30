import axios from "axios"
export default{


  //trainer registration
  async signupTrainer({ rootGetters }, payload) {
    try {

      const response = await axios.post(`${rootGetters.getUrl}/api/trainer/add-trainer`, payload);

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


  //view assigned users
  async fetchUsers({ rootGetters },trainer_id) {
    try {
      console.log("Fetching users...");

      const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewAssignedUsers`,{
        params: { trainer_id }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Users fetched successfully:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error("Failed to fetch users:", error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to fetch users." 
      };
    }
  },



  async goToScheduleWorkout( user_id) {
    try {
      this.$router.push({ name: "ScheduleWorkout", params: { user_id } });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  },



  //profile view
  async fetchTrainerProfile({ rootGetters },trainer_id) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/trainer/ViewProfile`,{
      params: { trainer_id }
    });
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      console.error("Error fetching User Profile:", error);
      return { success: false, error: error.message || 'An error occurred while fetching user Profile.' };
    }
  },


  //delete account
  async deletetrainer({ rootGetters },trainer_id) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/trainer/DeleteProfile`,{
      params: { trainer_id }
    });
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      console.error("Error fetching User Profile:", error);
      return { success: false, error: error.message || 'An error occurred while deleting user Profile.' };
    }
  },


  //view created exercises
  async fetchExercises({ rootGetters }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewWorkout`, {
        params: payload, // Use payload instead of separate parameters
      });
  
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Unexpected response status" };
      }
    } catch (error) {
      console.error("Error fetching Exercise:", error);
      return { success: false, error: error.message || "An error occurred while fetching Exercise." };
    }
  },  


  //create exercises
  async addExercise({ rootGetters }, payload) {
    try {
      const { trainer_id, user_id, ...workoutModel } = payload; // Extract values
      const response = await axios.post(
        `${rootGetters.getUrl}/api/trainer/schedule-workouts?trainer_id=${trainer_id}&user_id=${user_id}`,
        workoutModel // Send workoutModel in the request body
      );
  
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      console.error("Error Adding Exercises:", error);
      return { success: false, error: error.message || 'An error occurred while Adding Exercises.' };
    }
  },  



  async addfocusarea({ rootGetters },payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/trainer/addExcercises`,payload);
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      console.error("Error Adding Focusarea:", error);
      return { success: false, error: error.message || 'An error occurred while Adding focus area.' };
    }
  },



  async uploadExercise({ rootGetters }, payload) {
    try {

      const response = await axios.post(`${rootGetters.getUrl}/api/trainer/addExcercises`, payload);

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



  async fetchExercise({ rootGetters }, trainer_id) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewExercises`, {
        params: { trainer_id } // Explicitly set trainerId as a parameter
      });
  
      console.log("API Response:", response.data); // Debugging log
  
      if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
        return { success: true, data: response.data };
      } else {
        console.error("Unexpected API response format:", response.data);
        return { success: false, error: "Unexpected response format" };
      }
    } catch (error) {
      console.error("Error fetching Exercise:", error);
      return { success: false, error: error.message || "An error occurred while fetching Exercise." };
    }
  },  



async listExercise({ rootGetters }, trainer_id) {
  try {
    const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewExercises`, {
      params: { trainer_id } // Explicitly set trainerId as a parameter
    });

    console.log("API Response:", response.data); // Debugging log

    if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
      return { success: true, data: response.data };
    } else {
      console.error("Unexpected API response format:", response.data);
      return { success: false, error: "Unexpected response format" };
    }
  } catch (error) {
    console.error("Error fetching Exercise:", error);
    return { success: false, error: error.message || "An error occurred while fetching Exercise." };
  }
},



async fetchWorkout({ rootGetters }, payload) {
  try {
    const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewWorkout`, {
      params: {
        user_id: payload.user_id,
        weekdayId: payload.weekdayId, // Ensure the date format is correct (YYYY-MM-DD)
      },
    });

    console.log("API Response:", response.data); // Debugging log

    if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
      return { success: true, data: response.data };
    } else {
      console.error("Unexpected API response format:", response.data);
      return { success: false, error: "Unexpected response format" };
    }
  } catch (error) {
    console.error("Error fetching Exercise:", error);
    return { success: false, error: error.message || "An error occurred while fetching Exercise." };
  }
},

// async addworkouts({ rootGetters }, payload) {
//   try {
//     const response = await axios.post(`${rootGetters.getUrl}/api/trainer/schedule-workouts`, {
//       params: {
//         trainer_id: payload.trainer_id,
//         user_id: payload.user_id,
//        // Ensure the date format is correct (YYYY-MM-DD)
//       },
//     });

//     console.log("API Response:", response.data); // Debugging log

//     if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
//       return { success: true, data: response.data };
//     } else {
//       console.error("Unexpected API response format:", response.data);
//       return { success: false, error: "Unexpected response format" };
//     }
//   } catch (error) {
//     console.error("Error fetching Exercise:", error);
//     return { success: false, error: error.message || "An error occurred while fetching Exercise." };
//   }
// },



async addworkouts({ rootGetters }, payload) {
  try {

    const response = await axios.post(`${rootGetters.getUrl}/api/trainer/schedule-workouts`, payload);

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


async loadExercise({ rootGetters },payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewExercises` ,{
        params: {
          trainer_id: payload.trainer_id,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      console.error("Error fetching specializations:", error);
      return { success: false, error: error.message || 'An error occurred while fetching specializations.' };
    }
  },


  //dlete trainer account 
    async deleteAccount({ rootGetters },trainer_id) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/trainer/DeleteProfile`,{
        params: { trainer_id }
      });
        if (response.status >= 200 && response.status < 300) {
          return { success: true, data: response.data }; 
        } else {
          return { success: false, error: 'Unexpected response status' };
        }
      } catch (error) {
        console.error("Error fetching User Profile:", error);
        return { success: false, error: error.message || 'An error occurred while deleting user Profile.' };
      }
    },


    async addWeekDay({ rootGetters }, payload) {
      try {
    
        const response = await axios.post(`${rootGetters.getUrl}/api/trainer/addweekdays`, payload);
    
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

    async loadWeekdays({ rootGetters },payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/trainer/getweekday` ,{
          params: {
            user_id: payload.user_id,

          },
        });
        if (response.status >= 200 && response.status < 300) {
          return { success: true, data: response.data }; 
        } else {
          return { success: false, error: 'Unexpected response status' };
        }
      } catch (error) {
        console.error("Error fetching specializations:", error);
        return { success: false, error: error.message || 'An error occurred while fetching specializations.' };
      }
    },


    async fetchspecialisation({ rootGetters }) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/trainer/viewSpecialisation`);
    
        console.log("API Response:", response.data); // Debugging log
    
        if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
          return { success: true, data: response.data };
        } else {
          console.error("Unexpected API response format:", response.data);
          return { success: false, error: "Unexpected response format" };
        }
      } catch (error) {
        console.error("Error fetching Specialisation:", error);
        return { success: false, error: error.message || "An error occurred while fetching Specialisation." };
      }
    },  



    async about({ rootGetters }, payload) {
      try {
    
        const response = await axios.put(`${rootGetters.getUrl}/api/trainer/description`,null,{
        params: payload, // Use payload instead of separate parameters
      });
    
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
    async showabout({ rootGetters },trainer_id) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/trainer/showdescription`, {
          params: { trainer_id: trainer_id }  // Send the trainer_id as a query parameter
        });
    
    
        if (response.status >= 200 && response.status < 300) {
          return { success: true, data: response.data };
        } else {
          return { success: false, error: "Unexpected response format" };
        }
      } catch (error) {
        console.error("Error fetching about:", error);
        return { success: false, error: error.message || "An error occurred while fetching about." };
      }
    },  


  
}