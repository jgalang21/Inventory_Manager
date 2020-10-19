//This class starts up the SQL server

//To start it, go in the command line and type in 'node startServer.js'

function start(){

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'coms-319-047.cs.iastate.edu',
     user: 'team47',
     password: 'team47comsVM@319',
    database: 'project',
    
});

connection.connect(function(err){

 if (err) throw err;
  connection.query("SELECT * FROM user_info WHERE user='manager'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    console.log(result[0].user);
    console.log(result[0].password);
    
  });
});

}

start();