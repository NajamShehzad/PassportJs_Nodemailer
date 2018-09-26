const express = require('express');
const bodyParser  = require('body-parser');
const  route  = require('./routes/routes');
const passport = require('passport');




/*
* Express Config
*/

const PORT = process.env.PORT || 3000;

const app = express();

//Adding Middleware to Handle Data from Post Request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./passport/passport')(passport);


/*
 * Routing Start From Here
*/


//Index Page Request
app.get('/',route.index);


/**
 * Routes For Freelancer SignUp /SignIn
*/

//SignUp Request for Freelancer
app.post('/signUpFreelancer',route.singnUpFreelancer);
//signIn Route for Freelancer
app.post('/signInFreelancer',route.signInFreelancer);
//To Confirm Freelancer Email Adress
app.get('/confirmFreelancer/:id',route.confirmFreelancer);

//END Freelancer SignUp/SignIn


/**
 * Routes For Buyer SignUp/SignIn
*/

//signUp Route For Buyer
app.post('/signUpBuyer',route.signUpBuyer);
//SignIn Route For buyer
app.post('/signInBuyer',route.signInBuyer);
//To Confirm Buyer Email Adress
app.get("/confirmBuyer/:id",route.confirmBuyer)

//END Buyer SignUp/SignIn


//Secure Route 'Content'
app.get('/content',passport.authenticate('jwt', { session: false }),route.content);



//Server Running on the following PORT
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
    
})