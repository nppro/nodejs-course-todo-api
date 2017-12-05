const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a26480aaa8c3411e0f93e6c';

// hàm find trả về giá trị là 1 mảng chức các phần tử cần tìm
Todo.find({_id:id}).then((todos) => {
    console.log('Todos',todos);
}, (err) => {
    console.log(err);
});


// findOne trả về 1 object khi tìm thấy giá trị đầu vào, ko thấy kết quả trả giá trị null
Todo.findOne({_id:id}).then((todo) => {
    console.log('Todo',todo);
}, (err) => {
    console.log(err);
})

Todo.findById(id).then((todo) => {
    console.log('Todo',todo)
})