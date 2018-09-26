function createMail(obj) {

    return mailOptions = {
        from: '"Programmer" <programmerofkhi@gmail.com>', // sender address
        to: obj.email, // reciver adress
        subject: 'System Signup', // Subject line
        text: 'Hello There', // plain text body
        html:
            `<div>
                <h3>Hello ${obj.firstName} ! </h3>
                <br/>
                <h5>Thank You For Signing Up in Pearllancer <br/> Please Confirm Your email By  Clicking on the link Below.
                adress </h5>
                <a href="http://localhost:3000/confirmFreelancer/${obj.signUptoken}">http://www.pearlancer.com/comfirm/${obj.signUptoken}<a/>
            </div>` // html body
    };
};

function createMailBuyer(obj) {
    return mailOptions = {
        from: '"Programmer" <programmerofkhi@gmail.com>', // sender address
        to: obj.email, // reciver adress
        subject: 'System Signup', // Subject line
        text: 'Hello There', // plain text body
        html:
            `<div>
                <h3>Hello ${obj.firstName} ! </h3>
                <br/>
                <h5>Thank You For Signing Up in Pearllancer <br/> Please Confirm Your email By  Clicking on the link Below.
                adress </h5>
                <a href="http://localhost:3000/confirmBuyer/${obj.signUptoken}">http://www.pearlancer.com/comfirm/${obj.signUptoken}<a/>
            </div>` // html body
    };
}

module.exports = { createMail,createMailBuyer }