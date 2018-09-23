const express = require('express');
const bodyParser  = require('body-parser');
const  route  = require('./routes/routes');



/*
* Express Config
*/

const PORT = process.env.PORT || 3000;

const app = express();

//To Handle Data from Post Request
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



/*
 * Routing String From Here
*/

//Index Page Request
app.get('/',route.index);
//SignUp Request
app.post('/signUp',route.singnUp);








//Server Running on the following PORT
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
    
})