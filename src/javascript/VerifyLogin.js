// TODO THIS CLASS WILL CONTAIN MORE DATABASE LOGIC SOON

function redirect(){

	//wait 2 seconds prior before going to the next page.
        setTimeout(function(){
            window.location.href = 'inventoryManager.html';}
            , 2000);

}

function verify(){

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

		console.log(user);
		console.log(pass);

	    console.log(result[0].user);
	    console.log(result[0].password);
	  });
});




}

