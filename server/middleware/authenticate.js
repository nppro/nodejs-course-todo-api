var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        // nếu có tồn tài user trong hệ thống thì có lưu lại user đó từ requset gửi lên
    
        req.user = user; // lưu biến user vào trong request
        req.token = token; // lưu biến token vào trong request
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};