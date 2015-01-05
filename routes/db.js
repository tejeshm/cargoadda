/**
 * Created by neo on 4/12/14.
 */
var express = require('express');
var router = express.Router();
//db connection
var mysql = require('mysql');
//db connection
var connection = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : 'secret',
        database : 'nodejs'
    }
);

connection.connect();
/* GET home page. */
//router.get('/db', function(req, res) {
  //  connection.query('SELECT * FROM customer', function(err, rows){
    //    res.render('name', {name : rows});
   // });
//});





module.exports = router;