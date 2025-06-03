import axios from "axios"
export default{
   


    //view users
     async fetchUsers({ rootGetters }) {
        try {    
          const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewUsers`);
          return { success: true, data: response.data };
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.message || "Failed to fetch users." 
          };
        }
      },

      //view trainers
      async fetchTrainers({ rootGetters }) {
        try {
    
          const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewApprovedTrainers`);
    
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



  //delete user 
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
      console.error("Error fetching User :", error);
      return { success: false, error: error.message || 'An error occurred while deleting user Account.' };
    }
  },

  //delete trainer 
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
      console.error("Error fetching Trainer :", error);
      return { success: false, error: error.message || 'An error occurred while deleting trainer Account.' };
    }
  },



//view trainer signup requests
async fetchTrainerRequests({ rootGetters }) {
  try {

    const response = await axios.get(`${rootGetters.getUrl}/api/admin/viewRequests`);

    if (response.status >= 200 && response.status < 300) {
      console.log("Requests fetched successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to fetch Requests:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to fetch Requests." 
    };
  }
},


//view trainer details from requests
async fetchTrainer({ rootGetters },trainer_id) {
  try {
    const response = await axios.get(`${rootGetters.getUrl}/api/admin/TrainerDetails`,{
      params:{trainer_id}
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Trainer details fetched successfully:", response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Failed to fetch Trainer details:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to fetch Trainer." 
    };
  }
},


//accept request from trainer
async Approve({ rootGetters }, payload) {
  try {

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


//reject request from trainer
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