//this class is a NodeJS server that uses express for our API routes

const express = require('express');
const mysql = require('mysql');
const bp = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8080;


app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());

//test route to ensure the frontend is connected
app.get('/', function (request, response) {

   response.status(200).json({ "message": "working" })
});


//this route will grab *all* the prodcuts from the database
app.get('/getProducts', function (request, response) {

   var connection = mysql.createConnection({
      host: 'coms-319-047.cs.iastate.edu',
      user: 'team47',
      password: 'team47comsVM@319',
      database: 'project',

   });

   const product = request.body;
   console.log(product); //output the request (can comment out for debugging)

   connection.connect(function (err) {
      if (err) throw err;
      connection.query("SELECT * FROM products", function (err, result, fields) { //SQL query is here
         if (err) throw err;
         console.log(result);
         response.status(200).json({ "data": result });

      });
   });



});


app.post('/addProduct', function (request, response) {

   var connection = mysql.createConnection({
      host: 'coms-319-047.cs.iastate.edu',
      user: 'team47',
      password: 'team47comsVM@319',
      database: 'project',

   });


   const product = request.body;
   console.log(product);

   response.status(200).json({ "data": product });

   connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected to the server!");
      var sql = "INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; //the '?'s denote a certain field for the SQL database
      connection.query(sql, [product.productName, product.quantity,
      product.costPerItem, product.weightPerItem, product.productType,
      product.brand, product.productID, product.location], function (err, result) {
         if (err) throw err;
         console.log("Record inserted successfully!");
      });
   });

});


app.post('/deleteProduct', function (request, response) {

   var connection = mysql.createConnection({
      host: 'coms-319-047.cs.iastate.edu',
      user: 'team47',
      password: 'team47comsVM@319',
      database: 'project',

   });

   const product = request.body;
   let str = JSON.stringify(product);
   //not the most "optimal way" of deleting a product, but i couldn't figure out axios.delete 

   str = str.replace('{', ''); 
   str = str.replace('}', '');
   str = str.replace('\'', '');
   str = str.replace(/["']/g, '');
   str = str.replace(':', '');
  


   response.status(200).json({ "data": product });

   connection.connect(function (err) {
      if (err) throw err;
      //console.log("Connected to the server!");
      var sql = "DELETE FROM products WHERE pname=?"; //delete from the products table based on a certain name
    
      connection.query(sql, [str], function (err, result) {
         if (err) throw err;
         console.log("Record deleted successfully!");
      });
   });

});


app.listen(port, () => (console.log(`Server running on port ${port}`))); //this is important, it tell you what port your server is running on. by default it should be http://localhost:8080
module.exports = app;