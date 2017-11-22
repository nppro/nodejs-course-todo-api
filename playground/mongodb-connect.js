// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


var url = 'mongodb://localhost:27017/TodoApp';
//connect url
MongoClient.connect(url, (err, db) => {
    if(err){
        console.log(err);
        // nếu trường hợp lỗi ta return ra dòng log và đồng thời dừng chương trình ở đoạn này luôn
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into User (name, age, location)
    db.collection('Users').insertOne({
        name: 'Phuoc',
        age: 26,
        location: 'San Jose, USA'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user', err);
        }
        console.log(result.ops);
    })
    
    db.close();
});