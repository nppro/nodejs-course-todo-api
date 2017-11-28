// add module express, body-parser
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to api todo design by Phuoc');
});

app.get('/todos', (req, res) => {
    Todo.find({'completedAt': {$gt:0}})
    .then((doc, err) => {
        if(err)
            res.send(err);
        res.send(doc);
    })
    
})

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    })
    // console.log(req.body);
})


app.listen(5000, () => {
    console.log('Server run on port 5000');
})