const mongoose = require('mongoose');
const validator = require('validator');
const {SHA256} = require('crypto-js');



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not Email`
        }
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    memberSince: {
        type: Number,
        default: Date.now()
    }
})


userSchema.statics.passHash = (pass) => {

    pass = SHA256(JSON.stringify(pass) + "123456").toString();
    return pass

}

let User = mongoose.model('user', userSchema);

module.exports = { User }