function createMail(obj) {
    
    return mailOptions = {
        from: '"Programmer" <programmerofkhi@gmail.com>', // sender address
        to: obj.email, // list of receivers
        subject: 'System Signup', // Subject line
        text: 'Hello There', // plain text body
        html:
            `<div>
                <h3>Hello ${obj.firstName} ! </h3>
                <br/>
                <h5>Thank You For Signing Up in Pearllancer <br/> Please Confirm Your email
                adress </h5>
                <a href="http://localhost:3000/confirm/${obj.signUptoken}">${obj.signUptoken}<a/>
            </div>` // html body
    };
};

module.exports = { createMail }