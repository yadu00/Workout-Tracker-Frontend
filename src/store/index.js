import { createStore } from "vuex";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";
import rootMutations from "./mutations.js";
import AdminModule from "./Modules/Admin/index.js";
import UserModule from "./Modules/User/index.js";
import TrainerModule from "./Modules/Trainer/index.js";

// Create Vuex store
const store = createStore({
  modules: {
    Admin: AdminModule,
    Trainer: TrainerModule,
    User: UserModule,
  },
  state() {
    return {
      base_url: "http://localhost:8080",
      auth: {  // Ensure auth object is initialized
        user_id: sessionStorage.getItem("user_id") || "",
        admin_id: sessionStorage.getItem("admin_id") || "",
        trainer_id: sessionStorage.getItem("trainer_id") || "",
       
      },
    };
  },
  
    
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
