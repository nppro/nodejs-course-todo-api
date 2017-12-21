var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
};

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
    });
};

// phương thức tìm password đã được mã hoá so sánh với dữ liệu truyền vào từ request login
userSchema.statics.findByCredentials = function (email, password){
    // find email
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            // so sánh giữa password được lấy từ request và password được mã hoá ở database
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    // giá trị true thì trả về user vừa nhận được
                    resolve(user);
                } else{
                    // ngược lại thì trả hàm reject()
                    reject();
                }
            })
        });
    })
};

userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        // user.passwprd
        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
        // user.passwod = hash;
        // next();
    }else{
        next();
    }
    
})

// add model
var userModel = mongoose.model('User',userSchema);

module.exports = {
    User: userModel
};