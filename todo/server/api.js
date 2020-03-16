//"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(getList) 更新(edit) 删除(delete) **************/
//增加事项
router.post('/api/todo/create',(req,res)=>{
    let newtodo = new models.Todo({
        status : req.body.status,
        content : req.body.content
    });
    // 保存数据进mongoDB
    newtodo.save((err,data) => {
        if (err) {
            res.json({
                code : '1',
                msg : '创建失败'
            });
        } else {
            res.json({
                code : '0',
                msg : '创建成功',
                result : data
            })
        }
    });
})
//删除事项
router.post('/api/todo/delete',(req,res)=>{
    models.Todo.remove({_id:req.body._id},function(err,docs){
        if (err) {
            res.json({
                code: '1',
                msg: '删除失败'
            })
        } else {
            res.json({
                code: '0',
                msg: '删除成功',
                result: {}
            })
        }
    })
})
//查找全部todolist
router.get('/api/todo/getList',(req,res)=>{
    models.Todo.find((err,docs)=>{
        if(err){
            res.json({
                code : '1',
                msg : '查询失败'
            })
        }else{
            res.json({
                code : '0',
                msg : '查询成功',
                result : docs
            })
        }
    })
})
//修改某项
router.post('/api/todo/edit', (req, res) => {
    let condiction = {_id:req.body._id};
    let query = {status:req.body.status}
    models.Todo.update(condiction, query, (err, docs) => {
        if (err) {
            res.json({
                code: '1',
                msg: '修改失败'
            })
        } else {
            res.json({
                code: '0',
                msg: '修改成功',
                result: {}
            })
        }
    })
})


module.exports = router;