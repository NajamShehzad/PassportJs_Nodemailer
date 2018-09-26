const mongoose = require('mongoose');
const validator = require('validator');
const {SHA256} = require('crypto-js');
const _ = require('lodash')



const buyerSchema = new mongoose.Schema({
    accountType:{
        type:String,
        default:"Buyer"
    },
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
    },
    balance:{
        default:0
    }
})

buyerSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email','firstName','accountType']);
};

buyerSchema.statics.passHash = (pass) => {

    pass = SHA256(JSON.stringify(pass) + "123456").toString();
    return pass

}

let Buyer = mongoose.model('buyer', buyerSchema);

module.exports = { Buyer }