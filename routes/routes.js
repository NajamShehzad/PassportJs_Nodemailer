const { mongoose } = require('../mongoose/mongoose');
const { Freelancer } = require('../mongoose/model/User');
const { Buyer } = require('../mongoose/model/Buyer');
const nodemailer = require('nodemailer');
const { user, jwtPass } = require('../config');
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');
const { createMail, createMailBuyer } = require('../passport/nodemailer');


const Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user.user,
        pass: user.pass,
    },
});

let mailOptions = {
    from: '"Programmer" <programmerofkhi@gmail.com>', // sender address
    to: 'najambutt195@gmail.com', // list of receivers
    subject: 'Hello G', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};




module.exports = {
    //Index Page (/)
    index: function (req, res) {
        console.log(req.body);
        res.send({ message: 'Message Recived' })

    },
    /**
     * Freelancer SignIn/SignUp 
    */
    //Freelancer Sing Up (/signUpFreelancer)
    singnUpFreelancer: function (req, res) {
        let body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        body.password = Freelancer.passHash(body.password);
        var token = jwt.sign({ email: req.body.email }, jwtPass);
        body.signUptoken = token;
        let user = new Freelancer(body)

        user.save().then(x => {

            Transporter.sendMail(createMail(x), (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            // console.log(x);
            return res.send(x);
        }).catch(x => {
            console.log(x);
            return res.status(403).send(x);
        })
    },
    //Freelancer Sing In (/signInFreelancer)
    signInFreelancer: function (req, res) {

        Freelancer.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).send({ message: "username or Password is not correct" })
            }


            let pass = SHA256(JSON.stringify(req.body.password) + "123456").toString();

            if (user.password !== pass) {
                return res.status(403).send({ message: "username or Password is not correct" })
            }

            if (!user.verify) {
                return res.status(401).send({ message: "Please Confirm Your Email Adress" })
            }
            console.log(user);

            var token = jwt.sign({ user }, jwtPass, {
                expiresIn: 120 // in seconds
            });

            // console.log(user);
            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                res.send({ user, token: 'JWT ' + token })
            }
        });
    },
    //Freelancer Confirm (/confirmFreelancer)
    confirmFreelancer: function (req, res) {
        try {
            decoded = jwt.verify(req.params.id, jwtPass)
            // console.log(decoded);

        } catch (err) {
            return res.status(400).send({ message: 'invalid Token' })
        }
        Freelancer.findOne({ email: decoded.email }).then(x => {
            // console.log(x);
            if (x.verify) {
                return res.status(400).send({ message: "Account Already Verify" })
            }
            x.verify = true;
            Freelancer.findByIdAndUpdate(x._id, { $set: x }, { new: true }).then(x => {
                // console.log(x);
                res.send({ message: "Id Confirm" });

            })
        }).catch(err => {
            return res.status(404).send({ message: err });
        })
    },
    //Freelancer SignIn/SignUp Completed

    /**
     * Buyer SignIn/SignUp 
     */
    //Buyer Sing In (/signInBuyer)
    signUpBuyer: function (req, res) {
        let body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        body.password = Freelancer.passHash(body.password);
        var token = jwt.sign({ email: req.body.email }, jwtPass);
        body.signUptoken = token;
        let buyer = new Buyer(body)
        buyer.save().then(result => {

            Transporter.sendMail(createMailBuyer(result), (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });




            return res.send(result);
        }).catch(err => {
            return res.status(400).send(err)
        })
    },
    //Buyer Sing In (/signInBuyer)
    signInBuyer: function (req, res) {
        Buyer.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).send({ message: "username or Password is not correct" })
            }


            let pass = SHA256(JSON.stringify(req.body.password) + "123456").toString();
            // console.log(user);


            if (user.password !== pass) {
                return res.status(403).send({ message: "username or Password is not correct" })
            }

            if (!user.verify) {
                return res.status(401).send({ message: "Please Confirm Your Email Adress" })
            }
            var token = jwt.sign({ user }, jwtPass, {
                expiresIn: 120 // in seconds
            });

            // console.log(user);
            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                res.send({ user, token: 'JWT ' + token })
            }
        });

    },
    //Buyer Confirm (/confirmBuyer)
    confirmBuyer: function (req, res) {
        try {
            decoded = jwt.verify(req.params.id, jwtPass)
            // console.log(decoded);

        } catch (err) {
            return res.status(402).send({ message: 'invalid Token' })
        }
        Buyer.findOne({ email: decoded.email }).then(x => {
            if (x.verify) {
                return res.status(400).send({ message: "Account Already Verify" })
            }
            x.verify = true;
            Buyer.findByIdAndUpdate(x._id, { $set: x }, { new: true }).then(x => {
                console.log(x);
                res.send({ message: "Id Confirm" });

            })
        }).catch(err => {
            return res.status(404).send({ message: err });
        })
    },
    //Buyer SignIn/SignUp Completed

    //Secure Route (/content)
    content: function (req, res) {
        // console.log(req.user);

        res.send('working');
    },

}