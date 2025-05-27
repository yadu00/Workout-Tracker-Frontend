import { createRouter, createWebHistory } from "vue-router";
import UserHome from "./components/User/UserHome.vue";
import AdminHome from "./components/Admin/AdminHome.vue";
import TrainerHome from "./components/Trainer/TrainerHome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./components/WebsiteHome.vue") },

    { path: "/userlogin",component: () => import("./components/User/UserLogin.vue"),},

    { path: "/signup",component: () => import("./components/User/UserSignup.vue"),},

    { path: "/ForgotPassword",component: () => import("./components/User/ForgotPassword.vue"),},

    { path: "/adminlogin", component: () => import("./components/Admin/AdminLogin.vue"),},

    { path: "/Trainerlogin",component: () => import("./components/Trainer/TrainerLogin.vue"),},
    
    { path: "/Trainersignup",component: () => import("./components/Trainer/TrainerSignup.vue"),},

    { path: "/welcome",component: () => import("./components/User/WelcomePage.vue"),},

    { path: "/userdetails",component: () => import("./components/User/UserDetails.vue"),},

    { path: "/selectTrainer",component: () => import("./components/User/SelectTrainer.vue"),},

   

    { path: "/hw",component: () => import("./components/User/HeightWeight.vue"),},
        
    { path: "/temp",component: () => import("./components/Trainer/TemperoryHome.vue"),},

    { path: '/bmi',  component: () => import('./components/User/BmiPage.vue'), },

    { path: '/chart',  component: () => import('./components/User/ChartView.vue'), },

    { path: '/pay',  component: () => import('./components/User/PayMent.vue'), },



    {
      path: "/userHome",
      component: UserHome,
      children: [

        {
          path: "/profile",
          component: () => import("@/components/User/UserProfile.vue"),
        },
        {
          path: "/payments",
          component: () => import("@/components/User/UserPayments.vue"),
        },
        
        {
          path: "/report",
          component: () => import("@/components/User/RePort.vue"),
        },
        {
          path: "/viewworkouts",
          component: () => import("./components/User/ViewWorkouts.vue"),
        },
        {
          path: "/viewexercises",
          component: () => import("./components/User/ViewExercises.vue"),
        },
        {
          path: "/viewTrainer",
          component: () => import("./components/User/ViewTrainer.vue"),
        },
        {
          path: "/updateweight",
          component: () => import("./components/User/UpdateWeight.vue"),
        },
        {
          path: "/addrating",
          component: () => import("./components/User/TrainerRating.vue"),
        },
      ],
    },

    {
      path: "/adminDashboard",
      component: AdminHome,
      children: [
        {
          path: "/adminHome",
          component: () => import("@/components/Admin/AdminDashboard.vue"),
        },
        {
          path: "/viewUsers",
          component: () => import("@/components/Admin/ViewUsers.vue"),
        },
        {
          path: "/viewTrainers",
          component: () => import("@/components/Admin/ViewTrainers.vue"),
        },
        {
          path: "/PayMents",
          component: () => import("@/components/Admin/PayMents.vue"),
        },
        
      ],
    },

    {
      path: "/trainerHome",
      component: TrainerHome,
      children: [
        {
          path: "/AddExcercise",
          component: () => import("@/components/Trainer/AddExcercises.vue"),
        },
        {
          path: "/TrainerViewUsers",
          component: () => import("@/components/Trainer/TrainerDashboard.vue"),
        },
        {
          path: "/TrainerPayments",
          component: () => import("@/components/Trainer/PayMents.vue"),
        },
        {
          path: "/ScheduleWorkouts",
          component: () => import("@/components/Trainer/ViewClents.vue"),
        },
        {
          path: "/TrainerProfile",
          component: () => import("@/components/Trainer/TrainerProfile.vue"),
        },
        { path: "/view",component: () => import("./components/Trainer/ScheduleWeek.vue"),},

        { path: "/sch",component: () => import("./components/Trainer/ScheduleWorkout.vue"),},
        
      ],
    },
  ],
});
export default router;
