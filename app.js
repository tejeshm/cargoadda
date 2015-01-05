var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');

var index_routes = require('./routes/index');
var auth_routes = require('./routes/auth');
var db = require('./routes/db');

var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore({
        host:'127.0.0.1',
        port:6380,
        prefix:'sess',
        ttl: 30
    }),
    secret: 'SEKR37'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/styles",express.static(__dirname + "/styles"));
app.use(favicon());
app.use(flash());
app.use('/', index_routes);
app.use('/', auth_routes);
app.use('/', db);

/*
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/


module.exports = app;