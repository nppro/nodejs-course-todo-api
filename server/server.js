// add module express, body-parser
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb'); 

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
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
    // console.log(req.body);
});






app.listen(port, () => {
    console.log(`Server run on port ${port}`);
});

module.exports = {app};