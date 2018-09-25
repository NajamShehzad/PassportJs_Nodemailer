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
//SignUp Request
app.post('/signUp',route.singnUp);
//signIn Route
app.post('/signIn',route.signIn);
//Secure Content
app.get('/content',passport.authenticate('jwt', { session: false }),route.content);
//To Confirm your Email Adress
app.get('/confirm/:id',route.confirm)






//Server Running on the following PORT
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
    
})