const express = require('express');
const sql = require('mysql');
const bp = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8080;

app.use(bp.urlencoded({extended : true}));
app.use(bp.json());
app.use(cors());

app.get('/', function(request, response) {

    response.status(200).json({"message": "ty ethan"})
 });

 app.post('/addProduct', function(request, response){

    const product = request.body;
    console.log(product);
    console.log(product.productName);
    response.status(200).json({"data": product});
    


 });

 app.listen(port, () =>(console.log(`server running on port ${port}`)));
 module.exports = app;