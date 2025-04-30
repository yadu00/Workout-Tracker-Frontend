import axios from "axios"
export default{
   


    //view users
     async fetchUsers({ rootGetters }) {
        try {
          console.log("Fetching users...");
    
          const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewUsers`);
    
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

      //view trainers
      async fetchTrainers({ rootGetters }) {
        try {
          console.log("Fetching Trainers...");
    
          const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewTrainers`);
    
          if (response.status >= 200 && response.status < 300) {
            console.log("Trainers fetched successfully:", response.data);
            return { success: true, data: response.data };
          }
        } catch (error) {
          console.error("Failed to fetch Trainers:", error.response?.data || error.message);
          return { 
            success: false, 
            error: error.response?.data?.message || "Failed to fetch Trainers." 
          };
        }
      },



  //dlete user account 
  async deleteUserAccount({ rootGetters },user_id) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/admin/delete-User`,{
      params: { user_id }
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

  //dlete trainer account 
  async deleteTrainerAccount({ rootGetters },trainer_id) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/admin/delete-Trainer`,{
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



//view trainer signup requests
async fetchTrainerRequests({ rootGetters }) {
  try {
    console.log("Fetching Trainers...");

    const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewRequests`);

    if (response.status >= 200 && response.status < 300) {
      console.log("Trainers fetched successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to fetch Trainers:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to fetch Trainers." 
    };
  }
},

//view trainer
async fetchTrainer({ rootGetters },trainer_id) {
  try {
    console.log("Fetching Trainers...");

    const response = await axios.get(`${rootGetters.getUrl}/api/admin/TrainerDetails`,{
      params:{trainer_id}
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Trainers fetched successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to fetch Trainers:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to fetch Trainer." 
    };
  }
},

async Approve({ rootGetters }, payload) {
  try {
    console.log("Approving Trainer with payload:", payload);

    const response = await axios.put(`${rootGetters.getUrl}/api/admin/ApproveTrainer`,null, {
      
      params: {
        trainer_id: payload.trainer_id,
        statusId: payload.statusId
      }
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Trainer approved successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to approve Trainer:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to approve Trainer." 
    };
  }
},

async Reject({ rootGetters }, payload) {
  try {
    console.log("Rejecting Trainer with payload:",null, { params: {
      trainer_id: payload.trainer_id,
      statusId: payload.statusId
    }});

    const response = await axios.put(`${rootGetters.getUrl}/api/admin/ApproveTrainer`, payload);

    if (response.status >= 200 && response.status < 300) {
      console.log("Trainer rejected successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to reject Trainer:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to reject Trainer." 
    };
  }
},



    }