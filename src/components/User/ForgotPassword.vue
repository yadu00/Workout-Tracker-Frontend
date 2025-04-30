<template>
    <div class="FPbody">
        <div class="FPContainer">
    <h2>Forgot password</h2>
    <div class="inputs">
        <label for="username">Email</label>
        <input type="text" placeholder="Enter Email">
        <label for="username">New Password</label>
        <input type="text" placeholder="Enter New Password">
        <label for="username">Confirm Password</label>
        <input type="text" placeholder="Confirm New Password">
    </div>
    <button>Reset Password</button>
        </div>
    </div>
  
</template>

<script>
export default {

}
</script>

<style>
.FPbody{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
}
.FPContainer{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 30%;
    height: 60%;
    padding: 20px;
    border-radius:4px ;
    align-items: center;
    background-color: rgb(35, 9, 79);
    color: white;
}

.FPContainer .inputs{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;
  background-color: rgb(35, 9, 79);}



  .FPContainer input[type=text]{
  border: 1px solid black;
  border-radius:4px ;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;

}

button{
    background-color: rgb(3, 238, 34);
    color: rgb(0, 0, 0);
    height: 40px;
    width: 150px;
    border-radius:4px ;
    border: 1px solid black;
    margin-top: 50px;
    
}
</style>