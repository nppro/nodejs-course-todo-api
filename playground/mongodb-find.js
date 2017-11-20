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

    // db.collection('Todos')
    // .find(
    //     {
    //         "_id":new ObjectID('5a0f9bf2ffe4f3638ba82392')
    //     }
    // )
    // .toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos')
    // .find()
    // .count()
    // .then((count) => {
    //     console.log(`Todos Count: ${count}`);
    //     // console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Nguyen'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    })

    // db.close();
});