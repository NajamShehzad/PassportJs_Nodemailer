const { mongoose } = require('../mongoose/mongoose');
const { User } = require('../mongoose/model/User');



module.exports = {
    //Index Page (/)
    index: function (req, res) {
        console.log(req.body);
        res.send('Message Recived')

    },
    //Sing Up Page (/signUp)
    singnUp: function (req, res) {
        let body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        body.password  = User.passHash(body.password);

        let user = new User(body)

        user.save().then(x => {
            console.log(x);
            return res.send(x);
        }).catch(x => {
            console.log(x);
            return res.send(x);
        })
    },
    //signIn
    signIn:function(req,res){

    }
}