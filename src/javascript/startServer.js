//This class starts up the SQL server

//To start it, go in the command line and type in 'node startServer.js'


var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'coms-319-047.cs.iastate.edu',
    user: 'team47',
    password: 'team47comsVM@319',
    database: 'MyProject',
    
});

con.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
});