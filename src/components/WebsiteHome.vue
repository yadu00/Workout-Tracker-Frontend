<template>
  <div class="container">

    <div class="nav">
        <div class="logo">
            <img :src="require('@/assets/img/logo.png')" alt="" style="width: 70px;height: 70px;margin-right: 10px;">
            <h1>FitTrack</h1>
        </div>
        <div class="links">
           <div class="link">
                <h2>HOME</h2>
           </div>
           <div class="link">
                <h2>ABOUT US</h2>
           </div>
           <div class="link">
                <h2>CONTACT US</h2>
           </div>
           
        </div>
        <div class="loginBtn">
                <router-link to="/userlogin"><button id="login">LOGIN</button></router-link>
           </div>
    </div>
    <div class="section1">
        <div class="one">
                    <h1>Train Smart. Train Strong.</h1>
                    <h3>we blend science-backed fitness with top-tier equipment and expert coaching to help you achieve real results. Whether you're a beginner or a pro, we’ve got the perfect workout for you.</h3>
                    <router-link to="/signup"><button id="getstarted">GET STARTED</button></router-link>
        </div>
        <div class="two">

        </div>
    </div>
    <div class="section2">
        <div class="head">
            <h1>OUR PROGRAMS</h1>
        </div>
        <div class="cards">
            <div class="card">
            <h1>Strength Training</h1>
            <h4>our strength training programs are designed to help you gain muscle, increase endurance, and boost overall performance.</h4>
            <h5>View More<v-icon>mdi-arrow-right</v-icon></h5>
        </div>
            <div class="card">
                <h1>Weight Loss</h1>
                <h4> our Weight Loss Training programs are designed to help you burn fat, boost metabolism, and build a healthier, fitter you!</h4>
                <h5>View More<v-icon>mdi-arrow-right</v-icon></h5>
            </div>

            <div class="card">
                <h1>Cardio</h1>
                <h4> we offer high-energy cardio training programs designed to keep you moving, sweating, and achieving your fitness goals.</h4>
                <h5>View More<v-icon>mdi-arrow-right</v-icon></h5>
            </div>
            <div class="card">
                <h1>Muscle Gain</h1>
                <h4> our Muscle Gain Training programs are designed to help you increase lean mass, boost strength, and enhance overall performance.</h4>
                <h5>View More<v-icon>mdi-arrow-right</v-icon></h5>
            </div>
        </div>
    </div>
    <div class="section3">
        <div class="head">
            <h1>OUR TRAINERS</h1>
        </div>
        <div class="trainercards">
                <div class="trainercard">

                </div>
                <div class="trainercard">
                    
                </div>
                <div class="trainercard">
                    
                </div>
                <div class="trainercard">
                    
                </div>
            </div>
    </div>
    <div class="section4">
        <div class="head">
            <h1>Turn Your Passion Into a Career! Become a Trainer Today.</h1>
        </div>
        <div class="contents">
            <h4>Are you ready to inspire, motivate, and transform lives? We’re looking for passionate fitness enthusiasts to join our team of expert trainers. Whether you're just starting or already certified, we’ll help you take your career to the next level!</h4>
            <router-link to="/trainerlogin"><button>JOIN US</button></router-link>
        </div>
    </div>
    <div class="section5">
        <div class="social">
            <v-icon size="60px">mdi-instagram</v-icon>
            <v-icon size="60px">mdi-github</v-icon>
            <v-icon size="60px">mdi-linkedin</v-icon>
            <v-icon size="60px">mdi-facebook</v-icon>
        </div>
        <!-- contact us
        <div class="services">
            
            Email<v-icon size="40px">mdi-email</v-icon>
            Phone<v-icon size="40px">mdi-phone</v-icon>
        </div> -->

    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Rubik+Doodle+Shadow&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');
.container{
    width: 100%;
    height: auto;
    background-color: rgb(13, 12, 12);

}
*{
    font-family: "Open Sans", sans-serif;
}
.nav{
    width: 100%;
    height: 75px;
    background-color: rgba(37, 37, 37, 0.834);
    display: flex;
    position: fixed;
    z-index: 999;
    backdrop-filter: blur(10px);
}
.nav h1{
    color: white;
}
.logo{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.links{
    width: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.link{
    color: rgb(171, 171, 171);
    
}
.link:hover{
     color: rgb(68, 255, 0);
}
.loginBtn{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#login{
    width:100px ;
    height: 50px;
    background-color: rgb(162, 255, 0);
    border-radius: 25px;
    font-size: larger;
    font-weight: bold;
    color: #282828;
}
#login:hover{
    background-color: #595959;
    color: rgb(162, 255, 0);

}
.section1{
    width: 100%; 
    height: 700px;
    padding-top:100px ;
    color: white;
    padding-left: 100px;
    /* background-color: rgb(162, 255, 0); */
    background-image: url(/src/assets/img/newbg.PNG);
    background-size: cover;
}
.section2{
    width: 100%; 
    height: 500px;
    color:rgb(184, 184, 184);
    /* background-color: rgb(162, 255, 0); */
}
.section1 h1{
    color:rgb(255, 255, 255); 
    font-family: "Zen Dots", sans-serif;
    font-size: 50px;
    font-weight: 700;

}
.section2 .head{
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.head{
    font-family: "Revalia", sans-serif;
    background-color: #464646;

}

.cards{
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(12, 11, 11);
    padding-bottom: 20px;
}
.card{
    width: 300px;
    height: 300px;
    background-color: rgb(162, 255, 0);
    margin: 20px;
    border-top-right-radius:50px;
    border-bottom-left-radius:50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    color: rgb(35, 35, 35);
    transition: transform 0.3s ease-in-out;
    
    

}
.card:hover{
    transform: scale(1.1);
    box-shadow: 1px 1px 10px 1px rgb(81, 255, 0);
   
}/* .card h5{
    margin-left: 100px;
} */
.one{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.two{
    width: 40%;
    height: auto;
}
#getstarted{
    width: 200px;
    height: 40px;
    background-color: rgb(209, 209, 209);
    color: rgb(43, 43, 43);
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: transform 0.3s ease-in-out;



}
#getstarted:hover{
    background-color: rgb(162, 255, 0);
    transform: scale(1.1);
    font-weight: bold;
        color: rgb(0, 0, 0);


}
.section3{
    width: 100%;
    height: 500px;
    color: white;
}
.section3 .head{
    width: 100%;
    color: rgb(177, 177, 177);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.trainercards{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.trainercard{
    width: 300px;
    height: 400px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0);
    border-radius: 25px;
}
.section4{
    width: 100%;
    height: 300px;
    color: rgb(203, 203, 203);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
.section4 .head{
    width: 100%;
    padding-left: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(158, 158, 158);
}
.section4 .contents{
    width: 80%;
    height: 200px;
    background-color: #62ff00;
    color: #000;
    border-radius: 20px;
    padding: 25px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.contents button{
    width: 200px;
    height: 50px;
    background-color: #000000;
    font-size: x-large;
    color: white;
    border: 2px solid black;
    border-radius: 20px;
    outline: none;
    transition: transform 0.3s ease-in-out;



}
.contents button:hover{
    background-color: rgb(162, 255, 0);
    transform: scale(1.1);
    font-weight: bold;
    color: black;

}

.section5{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: white;
}
.services{
    display: flex;
    flex-direction: column;
    width: 400px;
}



</style>