var {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// model example user
// {
//     email: 'phuoc@emaple.com',
//     password : 'ưdsfsfsdfsfsdf',
//     tokens:[{
//          access: 'auth',
//          token: 'adlfjalsdfjasdfladfj'    
//     }]
// }



// create schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true, // bật tính năng check trùng
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    // trả về giá trị 1 object gồm 2 trường là _id và email
    return _.pick(userObject, ['_id', 'email']);
}


userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'nppro7').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    })
}

// add model
var userModel = mongoose.model('User',userSchema);

module.exports = {
    User: userModel
};