<template>
  <div class="container">
    <h1>Users</h1>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>UserId</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteuser(user.user_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p v-else>No users found.</p>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),

    async loadUsers() {
      try {
        const result = await this.$store.dispatch("Admin/fetchUsers");

        if (result.success) {
          this.users = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },

    // async deleteUser(userId) {
    //   if (confirm("Are you sure you want to delete this user?")) {
    //     console.log("Delete user with ID:", userId);
        
    //   }
    // },
    async deleteuser(user_id){
      try{
        const confirmation = confirm("Delete User");
        if (!confirmation) return; 
        const result=await this.$store.dispatch("Admin/deleteUserAccount",user_id);
        if(result.success){
          alert("Account deleted ")
          this.loadUsers();
        }else{
            alert("Error deleting account")
          
        }
      }catch(error){
        console.error("Error loading Profile:", error);
      }
    }
  },
  mounted() {
    this.loadUsers();
  },
};
</script>
  
  <style>
  

.container {
  width: 90%;
  margin: 20px auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #000000;
  color: white;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #cc0000;
}
</style>
