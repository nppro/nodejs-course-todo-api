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

    // delete Many
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
    //     console.log(result);
    // });

    // find Id and delete
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5a0f9adbcdc1e93c749f9c9c")})
    .then((result) => {
        console.log(JSON.stringify(result, undefined, 2))
    })
    

    // db.close();
});