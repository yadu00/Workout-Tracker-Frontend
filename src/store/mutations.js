export default {
  setuser_id(state, payload) {
    state.auth.user_id = payload;
    sessionStorage.setItem("user_id", payload);
  },
  setadmin_id(state, payload) {
    state.auth.admin_id = payload;
    sessionStorage.setItem("admin_id", payload);
  },
  settrainer_id(state, payload) {
    state.auth.trainer_id = payload;
    sessionStorage.setItem("trainer_id", payload);
  },
  settrainer_data(state, payload) {  // Add this new mutation
    state.auth.trainer_status = payload.statusID; // Store statusID
    sessionStorage.setItem("trainer_status", payload.statusID);
    // Store other relevant data as needed
  },
  logout(state) {
    state.auth.user_id = null;
    state.auth.admin_id = null;
    state.auth.trainer_id = null;
    state.auth.trainer_status = null;


    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("admin_id");
    sessionStorage.removeItem("trainer_id");
    sessionStorage.removeItem("trainer_status");

  }
}
