const express = require('express');
const mysql = require('mysql');
const bp = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8080;

var connection = mysql.createConnection({
   host: 'coms-319-047.cs.iastate.edu',
    user: 'team47',
    password: 'team47comsVM@319',
   database: 'project',
   
});


app.use(bp.urlencoded({extended : true}));
app.use(bp.json());
app.use(cors());

app.get('/', function(request, response) {

    response.status(200).json({"message": "ty ethan"})
 });

 app.post('/addProduct', function(request, response){

   var connection = mysql.createConnection({
      host: 'coms-319-047.cs.iastate.edu',
       user: 'team47',
       password: 'team47comsVM@319',
      database: 'project',
      
   });
   

    const product = request.body;
    console.log(product);
    console.log(product.productName);
    response.status(200).json({"data": product});

    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(sql, [product.productName, product.quantity,
      product.costPerItem, product.weightPerItem, product.productType,
      product.brand, product.productID, product.location], function (err, result) {
         if (err) throw err;
         console.log("1 record inserted");
  });
    });
    


 });

 app.listen(port, () =>(console.log(`Server running on port ${port}`)));
 module.exports = app;