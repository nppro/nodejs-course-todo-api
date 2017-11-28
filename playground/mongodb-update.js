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

    // find one and update
    db.collection('Users').findOneAndUpdate(
        // đối số đầu tiên để tìm kiếm
        {_id: new ObjectID("5a0f98bf27c9aa168843f771")},
        // đôi số 2: thực hiện set trường cần cập nhật document
        {
            $set: {
                name: 'Nguyen Phuoc'
            },
            $inc: {
                age: 2
            }
        },
        // các option để trả về 
        {
            // true: trả về giá trị ban đầu của document đó trước khi được update
            // false: trả về document đã đc update
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });
    
    

    // db.close();
});