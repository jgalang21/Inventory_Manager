var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var connection = mysql.createConnection({
    host: 'coms-319-047.cs.iastate.edu',
     user: 'team47',
     password: 'team47comsVM@319',
    database: 'project',
    
});

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

 app.get('/', function(request, response) {

    response.sendFile(path.join(__dirname, '/../html/index.html'));
  
 });


// for action
app.post('/login', function(request, response) {
    var username = request.body.first;
    var password = request.body.pass;
    if (username && password) {
// check if user exists
        connection.query("SELECT * FROM user_info WHERE user='?'", [username], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/dashboard', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});


app.listen(3000);