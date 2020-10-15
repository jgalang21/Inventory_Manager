// TODO THIS CLASS WILL CONTAIN MORE DATABASE LOGIC SOON

function redirect(){
  		//wait 2 seconds prior before going to the next page.
        setTimeout(function(){
            window.location.href = 'inventoryManager.html';}
            , 2000);

}

// function verify(){
//   var x = document.getElementById('first').value;
//   console.log(x);

//   var mysql = require('mysql');

//   var con = mysql.createConnection({
//     host: 'coms-319-047.cs.iastate.edu',
//     user: 'team47',
//     password: 'team47comsVM@319',
//     database: 'MyProject',
    
//   });

//   con.connect(function(err){
//     if(!err) {
//         console.log("Database is connected ... ");
//     } else {
//         console.log("Error connecting database ... ");
//     }
//   });

// }

// verify();
