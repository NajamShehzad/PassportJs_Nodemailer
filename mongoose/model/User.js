const mongoose = require('mongoose');
const validator = require('validator');
const {SHA256} = require('crypto-js');
const _ = require('lodash')



const userSchema = new mongoose.Schema({
    accountType:{
        type:String,
        default:"Freelancer"
    }
    ,
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
    },
    verify:{
        type:Boolean,
        default:false
    },
    signUptoken:{
        type:String,
        required:true
    }
})

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email','firstName','accountType']);
};

userSchema.statics.passHash = (pass) => {

    pass = SHA256(JSON.stringify(pass) + "123456").toString();
    return pass

}

let Freelancer = mongoose.model('user', userSchema);

module.exports = { Freelancer }