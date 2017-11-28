var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


// check tính hợp lệ của dữ liệu theo mongoose validatior
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        // khai báo mặc định
        default: false 
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner',
//     completed: true
// });

// newTodo.save().then((doc) => {
//     console.log('Save todo');
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (error) => {
//     console.log('Unable to save todo', error);
// });

// var otherTodo = new Todo({
//     text: 'Feed the dog 3  ',
    
// });

// otherTodo.save().then((doc) => {
//     console.log('save success other todo');
//     console.log(doc);
// }, (error) => {
//     console.log('Unable to save other todo');
// })

//User
// email - require it - trim it - set type - set min length of 1
// password

var User = mongoose.model('User', {
    email: {
        type: String,
        required: [true,'Vui lòng nhập email'],
        trim: true,
        minlength: [1, 'Vui lòng nhập hơn 1 ký tự']
    },
    password: {
        type: String,
        required: true
    }
});

var newUser = new User({
    email:'test@mail.com',
    password: '12345'
});

newUser.save().then((doc)=>{
    console.log('Save to user');
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save user', err);
})
