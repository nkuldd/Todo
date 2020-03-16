const api = require('./api'); 
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')//处理post数据
const express = require('express');//使用express框架
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(express.static(path.resolve(__dirname, '../dist')))
// SPA 抓取index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
// 监听8088端口 node server
app.listen(8088);
console.log('success listen…………');

