const mongoose = require('mongoose');
const { isLowercase } = require('validator');
const validator = require(validator);

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, 'Please Tell Us Your Name']
    },
    abhaId : {
        type : String,
        unique : true,
        required : true
    },
    role : {
        type : String,
        enum : ["doctor", "admin"],
        default : "doctor",
    },
    email : {
        type : String,
        validate : [validator.isEmail, 'This must be an Email'],
        unique : true,
        sparse : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        select : false
    },
    passwordConfirm : {
        type : String, 
        required : true,
        validate : {
            validator : function(el) {
                return el === this.password;
            }
        },
        message : 'Please Confirm your Password',
        select : false
    },
    abhaToken : {
        type : String,
        required : [true, 'There must exist a Token']
    },
    refreshToken : String,
    tokenExpiry : Date,
    loginType : {
        type : String,
        enum : ['custom', 'abha'],
        default : 'custom'
    }

},
{
    timestamps :true
});

module.exports = mongoose.model("User", userSchema);

