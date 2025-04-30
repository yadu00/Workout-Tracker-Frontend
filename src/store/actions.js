import axios from "axios"
export default{
    

  //user login
    async loginUser({ commit, rootGetters }, payload) {
        const response = await axios.post(`${rootGetters.getUrl}/api/user/login-user`, payload);
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          commit('setuser_id', response.data.user_id); 
          return true;
        } else {
          console.error("Login failed");
          return false;
        }
      },


    //Admin login
     async loginAdmin({commit,rootGetters},payload){
        const response=await axios.post(`${rootGetters.getUrl}/api/admin/login-admin`,payload);
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          commit('setadmin_id', response.data.admin_id); 
          return true;
        } else {
          console.error("Login failed");
          return false;
        }
      } ,


    //Trainer login
    async loginTrainer({ commit, rootGetters }, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/trainer/login-trainer`, payload);
        if (response.status >= 200 && response.status < 300) {
          commit('settrainer_id', response.data.trainer_id);
          commit('settrainer_data', response.data); // Commit all data
          return response.data; // Return the full response data
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error; // Re-throw to handle in component
      }
    },
}
    





     

              
              

              
              


                




            
            