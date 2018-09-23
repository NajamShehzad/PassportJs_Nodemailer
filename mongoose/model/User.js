const mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new  mongoose.Schema({
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

let User = mongoose.model('user', userSchema);

module.exports = {User}