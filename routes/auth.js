var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

var queryString = "Select * from user";
var users;
connection.query(queryString,function(error,results)
{
    if(error) {
        throw error;
    } else {
        users = results;
    }
});



// Render the registration page.
router.get('/register', function(req, res) {
  res.render('register', {title: 'Register', error: req.flash('error')[0]});
});


// Register a new user .
router.post('/register', function(req, res) {

    var emailid = req.body.email;
    var passwordd = req.body.password;
    var insertdata = "insert into user (email,password) values ('"+emailid+"', '"+passwordd+"')";
    /*console.log(insertdata);*/
    connection.query(insertdata, function (error, results) {
        if (error) {
                throw error;
        } else {
            res.redirect('/dashboard');
        }
    });
});


router.get('/dashboard', function (req, res) {
  if (!req.user ) {
    return res.redirect('/login');
  }
    else {
      res.render('dashboard', {'user': req.user})
  }
});

router.post('/savepost', function (req,res) {
    var post = req.body.comments;
    var postdb = "insert into post (user_id,message,background) values (id,'"+post+"','hi')";
                "select "
    console.log(postdb);
    connection.query(postdb, function (error, results) {
        if (error) {
            throw error;
        }
    })
});
/*

INSERT INTO painting (a_id, title, state, price)
SELECT a_id, 'Les jongleurs', 'MN', 51
FROM artist WHERE name = 'Renoir';
*/

// Render the login page.
router.get('/login', function(req, res) {
  res.render('login', {title: 'Login', error: req.flash('error')[0]});
});


// Authenticate a user.
router.post(
    '/login',
    passport.authenticate(
        'local',
        {
          successRedirect: '/dashboard',
          failureRedirect: '/error',
          failureFlash: 'Invalid email or password.'
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.email === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

function findById(id, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.id === id) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

// Logout the user, then redirect to the home page.
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});



module.exports = router;