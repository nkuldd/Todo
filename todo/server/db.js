// Schema生成Model，Model生成Entity
const mongoose = require('mongoose');
// 连接数据库 默认test库
mongoose.connect('mongodb://localhost/test');
// 绑定连接
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
//schema 
const todoSchema = mongoose.Schema({
    status : Boolean,
    content : String
});
//model
const Models = {
    Todo : mongoose.model('Todo',todoSchema)
}

module.exports = Models;
