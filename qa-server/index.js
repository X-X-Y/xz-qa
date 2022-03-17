const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const md5 = require('md5')
const server = express();

server.use(cors({
    origin:['http://localhost:8080']
}));

server.use(bodyParser.urlencoded({
    extended:false
}));

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:3306,
    database:'xzqa',
    connectionLimit:20
});

// 获取文章分类
server.get('/category', (req, res)=>{
    var sql = 'SELECT id,category_name FROM xzqa_category ORDER BY id';

    pool.query(sql, (err, results)=>{
        if(err) throw err;

        res.send({message:'查询成功', code:200, category:results});
    })
})

// 获取指定分类下文章
server.get('/list', (req, res)=>{
    var cid = req.query.cid;
    var page = parseInt(req.query.page);
    var pagesize = 10;
    var offset = (page-1) * pagesize;
    var rowCount;
    var pageCount;

    // 统计某一个分类的记录总数/总页数
    var sql = 'SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';
    pool.query(sql, [cid], (err, results)=>{
        if(err) throw err;
        rowCount = results[0].count;
        pageCount = Math.ceil(rowCount/pagesize);
    });

    // 记录查找
    var sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT ?,?';
    pool.query(sql, [cid,offset,pagesize], (err, results)=>{
        if(err) throw err;

        res.send({message:'查询成功', code:200, articles:results, pageCount:pageCount});
    });
})

// 获取指定ID的文章信息
server.get('/getArticle', (req, res)=>{
    var id = req.query.id;
    var sql = 'SELECT a.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS a INNER JOIN xzqa_author AS u ON author_id = u.id WHERE a.id = ?';

    pool.query(sql, [id], (err, results)=>{
        if (err) throw err;

        res.send({message:'查询成功',code:200,info:results[0]});
    });
});

// 获取用户发表的文章
server.get('/getArticles', (req, res)=>{
    var cid = req.query.cid;

    var sql = 'SELECT id AS value,subject AS label FROM xzqa_article WHERE author_id=?';

    pool.query(sql, [cid], (err, results)=>{
        if(err) throw err;

        res.send({message:'查询成功', code:'200', articles:results});
    })
})

// 删除文章
server.post('/removeArticles', (req, res)=>{
    var id = req.body.id;

    var sql = 'DELETE FROM xzqa_article WHERE id IN (' + id + ')';
    pool.query(sql, (err, results)=>{
        if(err) throw err;

        res.send({message:'删除成功', code:200});
    })
})

// 用户修改个人资料
server.post('/change', (req, res)=>{
    var nickname = req.body.nickname;
    var password = md5(req.body.password);
    var id = req.body.id;

    var sql = 'UPDATE xzqa_author SET nickname=?,password=? WHERE id=?';
    pool.query(sql, [nickname, password, id], (err, results)=>{
        if(err) throw err;

        res.send({message:'修改成功', code:'200'});
    })
})

// 用户注册
server.post('/register', (req, res)=>{
    var username = req.body.username;
    var password = md5(req.body.password);

    var sql = 'SELECT COUNT(id) AS count FROM xzqa_author WHERE username=?';
    pool.query(sql, [username], (err, results)=>{
        if(err) throw err;

        // 用户已经存在
        if(results[0].count == 1){
            res.send({message:'注册失败', code:201});
        }else if(results[0].count == 0){
            // 用户不存在，可以注册
            sql = 'INSERT xzqa_author(username, password) VALUE(?,?)';
            pool.query(sql, [username, password], (err, results)=>{
                if(err) throw err;

                res.send({message:'注册成功', code:200});
            });
        }
    })
})

// 用户登录
server.post('/login', (req, res)=>{
    var username = req.body.username;
    var password = md5(req.body.password);
    var sql = 'SELECT id,username,nickname,article_number FROM xzqa_author WHERE username=? AND password=?';

    pool.query(sql, [username, password], (err, results)=>{
        if(err) throw err;

        if(results.length == 0){
            res.send({message:'登录失败',code:202});
        }else if(results.length == 1){
            res.send({message:'登录成功',code:200,info:results[0]});
        }
    })
})

server.listen(3001);