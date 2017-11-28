const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// truyền biến mongoose ra ngoài
module.exports = {
    mongoose: mongoose
};