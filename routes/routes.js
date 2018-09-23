const { mongoose } = require('../mongoose/mongoose');
const { User } = require('../mongoose/model/User');
const nodemailer = require('nodemailer');
const {user} =  require('../mailpass');

const Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user.user,
        pass: user.pass,
    },
});

let mailOptions = {
    from: '"Programmer" <programmerofkhi@gmail.com>', // sender address
    to: 'najambutt195@gmail.com, najambutt195@gmail.com', // list of receivers
    subject: 'Hello G', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};




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
        body.password = User.passHash(body.password);

        let user = new User(body)

        user.save().then(x => {

            Transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            console.log(x);
            return res.send(x);
        }).catch(x => {
            console.log(x);
            return res.send(x);
        })
    },
    //signIn
    signIn: function (req, res) {

    }
}