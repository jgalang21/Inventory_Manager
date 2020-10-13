// TODO THIS CLASS WILL CONTAIN MORE DATABASE LOGIC SOON

function redirect(){
  		//wait 2 seconds prior before going to the next page.
        setTimeout(function(){
            window.location.href = 'inventoryManager.html';}
            , 2000);

}

function verify(){

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "coms-319-047.cs.iastate.edu",
    user: "root",
    password: "comsVM@319"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

}
