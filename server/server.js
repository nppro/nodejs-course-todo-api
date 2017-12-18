var env = process.env.NODE_ENV || 'development';
console.log('env *****',env);

if(env === 'development'){
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}


// add module express, body-parser
const _ = require('lodash'); 
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb'); 
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 5000;

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // dùng hàm res.redirect để chuyên hướng đường dẫn request tới đường dẫn mong muốn 
    res.redirect('/api-doc');
});

// <----------Todo----------->

app.get('/todos', (req, res) => {
    Todo.find({})
    // Todo.find({'completedAt': {$gt:0}})
    .then((todos, err) => {
        if(err)
            res.status(400).send({
                status: 0,
                description: err
            });
        res.send({
            todos: todos,
            status: 1,
            description: 'Get Ok !'
        });
    });
    
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {
    
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id not valid');
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send({
                description: 'Not found todo'
            })
        }

        res.status(200).send({
            todo: todo,
            status: 1,
            description: 'Find OK!'
        });

    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/todos', (req, res) => {
    console.log(req);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
    // console.log(req.body);
});

// api delete todo
app.delete('/todos/:id', (req, res ) => {
    var id = req.params.id;
    // check valid id object
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id not valid');
    }
// remove todobyid
    Todo.findOneAndRemove(id).then((result) => {
        if(!result)
         //fail return 404
            return res.status(404).send('Todo not found');
        //success return 200
        res.status(200).send({
            todo: result,
            Status : 1,
            Description: 'Delete todo successfull'
        })
    }).catch((e) => {
         // find not found return 400
        return res.status(400).send(e);
    });
   
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    //check id valid 
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id not valid');
    }

    // checking boolean variable completed
    if(_.isBoolean(body.completed) && body.completed){
        // update completedAt cập nhật trường completedAt lúc thời điểm hiện tại
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send('Todo not found');
        }
        res.status(200).send({todo:todo, Status: 1, Description: 'Update OK!'});
    }).catch((e) => {
        res.status(400).send(e);
    })
})

// <----------User----------->
app.post('/users', (req , res) => {
    //check req.body 
    var body = _.pick(req.body, ['email','password']);
    // res.send(req.body);
    var user = new User(body);

    // user.save().then((user) => {
    //     if(!user)
    //         return res.status(404).send('Add user fail');
    //     res.status(200).send({
    //         users: user,
    //         Status: 1,
    //         Description: 'Add user OK!'
    //     });
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


// gỉa thuyết đặt ra là phải có 1 hàm xét token để khỏi phải viết lại nhiều lần ở từng request


app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});


app.listen(port, () => {
    console.log(`Server run on port ${port}`);
});

module.exports = {app};