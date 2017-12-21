const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$QH7ENY9ApwlfruK6yopbqeJB..vIKT20VvxI1g3jxqVBbO2HYJW6.';

// hàm dùng để so sánh giữa password ban đầu và được mã hóa, nếu trả về true là đúng 
bcrypt.compare('123',hashedPassword, (err, res) => {
    console.log(res);
})
// ý tưởng xây dựng web token như code bên dưới - và cái này đã cũ
// hiện tại sẽ dùng thư viện mới jsonwebtoken


// var message = 'I am user number 7';
// var hash = SHA256(message).toString();

// console.log(`Message ${message}`);
// console.log(`Message ${hash}`);

// var data = {
//     id: 7
// };

// //  ---------tạo token-------
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }


// đoạn code ví dụ quá trình chen ngang dữ liệu và ko khớp với dữ liệu tạo ra
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();



// --------chứng thực token--------
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// console.log(resultHash);

// if(token.hash === resultHash){
//     console.log('Data was not changged');
// }else{
//     console.log('Data was changed. Do not trust');
// }




// ------ sử dụng thư viện jsonwebtoken ---------

// ---vd:
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123phuoc');
// console.log(token);


// var decoded = jwt.verify(token,'123phuoc');
// console.log('decoded', decoded);
// jwt.verify;