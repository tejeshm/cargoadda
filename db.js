/**
 * Created by neo on 12/12/14.
 */
var mysql = require('mysql');
//db connection
var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'secret',
        database: 'nodejs'
    }
);

var db = redis.initialize({
    client:'mysql',
    connection:config
});

var queryString = "Select * from customer";
var users;
connection.query(queryString,function(error,results)
{

    var queryString = "Select * from customer";
    connection.query(queryString,function(error,results)
    {
        if(error)
        {
            throw error;
        }
        else
        {
            users = results;
        }
    });
});

module.exports.db = db;