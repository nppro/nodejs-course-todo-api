var {mongoose} = require('../db/mongoose');

// create schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// add model
var userModel = mongoose.model('User',userSchema);

module.exports = {
    User: userModel
};