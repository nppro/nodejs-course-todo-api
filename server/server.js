// add module express, body-parser
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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
    .then((doc, err) => {
        if(err)
            res.send(err);
        res.status(400).send(doc);
    });
    
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




app.listen(5000, () => {
    console.log('Server run on port 5000');
});

module.exports = {app};