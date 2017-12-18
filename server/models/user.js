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

// ghi đè lên hàm của mongoose trả về để thiết lập các giá trị muốn trả về cho client là gì
userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    // trả về giá trị 1 object gồm 2 trường là _id và email
    return _.pick(userObject, ['_id', 'email']);
}


userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    // tạo token với private key là nppro7
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'nppro7').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    })
}

// phương thức  tĩnh khi thực hiện tìm và decode token để tìm ra user
userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'nppro7');
    }catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        // hàm trả vè lỗi khi đoạn lỗi được bắt, phải được trả về bằng promise để hàm nhận bên kia có thể hứng được
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access': 'auth'
    })
}

// add model
var userModel = mongoose.model('User',userSchema);

module.exports = {
    User: userModel
};