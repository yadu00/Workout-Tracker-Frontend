// getters.js
export default {
        getUrl: (state) => state.base_url,
        getuser_id: (state) => state.auth.user_id, // Access user_id from auth
        getadmin_id: (state) => state.auth.admin_id,
        gettrainer_id: (state) => state.auth.trainer_id,
        gettrainer_status: (state) => state.auth.trainer_status, // Add this
      };
      