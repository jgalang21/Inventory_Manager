

class product {
  productName;
  quantity;
  costPerItem;
  weightPerItem;
  productType;
  brand;
  productID;
  location;

  constructor(productName, quantity, costPerItem, weightPerItem,
    productType, brand, productID, location) {
    this.productName = productName;
    this.quantity = quantity;
    this.costPerItem = costPerItem;
    this.weightPerItem = weightPerItem;
    this.productType = productType;
    this.brand = brand;
    this.productID = productID;
    this.location = location;
  }

  getProductInfo(i) {
    switch (i) {
      case 0:
        return this.productName;
      case 1:
        return this.quantity;
      case 2:
        return this.costPerItem;
      case 3:
        return this.weightPerItem;
      case 4:
        return this.productType;
      case 5:
        return this.brand;
      case 6:
        return this.productID;
      case 7:
        return this.location;

    }
  }
}

function checkIfEmpty() {
  var isEmpty = false;

  var name = document.getElementById("addPopPrdName").value;
  var quantity = document.getElementById("popupQuantity").value;
  var cost = document.getElementById("popupCostPerItem").value;
  var weight = document.getElementById("popupWeightPerItem").value;
  var type = document.getElementById("popupProductType").value;
  var brand = document.getElementById("popupBrand").value;
  var id = document.getElementById("popupProductID").value;
  var location = document.getElementById("popupLocation").value;

  if (name == "") {
    alert("Name of the item can not be empty");
    isEmpty = true;
  }
  else if (quantity == "") {
    alert("Quantity of the item can not be empty");
    isEmpty = true;
  }
  else if (cost == "") {
    alert("Cost of the item can not be empty");
    isEmpty = true;
  }
  else if (weight == "") {
    alert("Weight of the item can not be empty");
    isEmpty = true;
  }
  else if (type == "") {
    alert("Type of the item can not be empty");
    isEmpty = true;
  }
  else if (brand == "") {
    alert("Brand of the item can not be empty");
    isEmpty = true;
  }
  else if (id == "") {
    alert("Id of the item can not be empty");
    isEmpty = true;
  }
  else if (location == "") {
    alert("Location of the item can not be empty");
    isEmpty = true;
  }
  return isEmpty;

}

window.onload = function loadInventoryTable() {

  // HERE IS THE "GET REQUEST", it gives a listing of all the products in the data object
  // in the database AFTER you add an item in the CHROME browser console
  axios.get("http://localhost:8080/getProducts")
    .then(function (resp) {
      console.log(resp.data);
      processProducts(resp.data);
    }).catch(error => console.error(error));;

}

function processProducts(data) {
  var products = data;

  products.data.forEach(element => {
    var newProd = new product(element.pname, element.quantity, element.cost,
      element.weight, element.type, element.brand, element.pid, element.location);
    addRow(newProd);
  });

}

function addProductWindow() {
  // Get the popup
  var popup = document.getElementById("myAddProductPopup");
  popup.style.display = "block";

  var newProduct = new product(1, 1, 1, 1, 1, 1, 1, 1);

  var addProdPopupBtn = popup.getElementsByClassName("popupBtn")[0];
  addProdPopupBtn.onclick = function () {

    newProduct.productName = document.getElementById("addPopPrdName").value;
    newProduct.quantity = document.getElementById("popupQuantity").value;
    newProduct.costPerItem = document.getElementById("popupCostPerItem").value;
    newProduct.weightPerItem = document.getElementById("popupWeightPerItem").value;
    newProduct.productType = document.getElementById("popupProductType").value;
    newProduct.brand = document.getElementById("popupBrand").value;
    newProduct.productID = document.getElementById("popupProductID").value;
    newProduct.location = document.getElementById("popupLocation").value;

    axios.post("http://localhost:8080/addProduct",
      newProduct
    ).then(console.log('Product added.')).catch(error => console.error(error));

    if (!checkIfEmpty()) {
      addRow(newProduct);
      //this just simply clears the field after every item is added, just for making things clear
      document.getElementById("addPopPrdName").value = '';
      document.getElementById("popupQuantity").value = '';
      document.getElementById("popupCostPerItem").value = '';
      document.getElementById("popupWeightPerItem").value = '';
      document.getElementById("popupProductType").value = '';
      document.getElementById("popupBrand").value = '';
      document.getElementById("popupProductID").value = '';
      document.getElementById("popupLocation").value = '';
    }
  }

  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function () {
    popup.style.display = "none";
  }
}

function rmvProductWindow() {
  //Get the popup
  var popup = document.getElementById("myRmvProductPopup");
  popup.style.display = "block";

  var rmvProdPopupBtn = popup.getElementsByClassName("popupBtn")[0];
  rmvProdPopupBtn.onclick = function () {
    var prodName = document.getElementById("rmvPopPrdName").value;
    removeRow(prodName);
  }

  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function () {
    popup.style.display = "none";
  }
}

function addRow(newProduct) {
  var inventoryTable = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];
  var newRow = inventoryTable.insertRow();
  for (var i = 0; i < 8; i++) {
    var newCell = newRow.insertCell(i);
    var newText = document.createTextNode(newProduct.getProductInfo(i));
    newCell.appendChild(newText);
  }
  var popup = document.getElementById("myAddProductPopup");
  popup.style.display = "none";
}

function removeRow(prod) {
  var inventoryTable = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];

  var prodFound = false;
  for (var i = 0; i < inventoryTable.rows.length; i++) {
    if (inventoryTable.rows[i].getElementsByTagName('td')[0].innerText == prod) {
      prodFound = true;
      
      console.log(prod);
      
      axios.post("http://localhost:8080/deleteProduct",
      prod
    ).then(console.log('Product deleted.')).catch(error => console.error(error));
      
      
      inventoryTable.deleteRow(i);
      document.getElementById("rmvPopPrdName").value = '';
      break;
    }
  }

  if (!prodFound) {
    alert("Product not found, try again!");
  }
  else {
    var popup = document.getElementById("myRmvProductPopup");
    popup.style.display = "none";
  }

}

function sortInventory(n, isNum) {
  var rows, switching, i, comp1, comp2, shouldSwitch, dir, switchcount = 0;
  var inventoryTable = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];
  switching = true;
  //sorting direction: ascending
  dir = "asc";

  while (switching) {
    switching = false;
    rows = inventoryTable.rows;
    //Loop through all inventory rows
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      //Get elements to compare: current row the next
      comp1 = rows[i].getElementsByTagName("td")[n];
      comp2 = rows[i + 1].getElementsByTagName("td")[n];

      /*if column is number based get numbers
      * then check if the two rows should switch places,
      * based on the direction
      * */
      if (isNum) {
        if (dir == "asc") {
          if (Number(comp1.innerText.toLowerCase()) > Number(comp2.innerText.toLowerCase())) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(comp1.innerText.toLowerCase()) < Number(comp2.innerText.toLowerCase())) {
            shouldSwitch = true;
            break;
          }
        }
      }
      else {
        if (dir == "asc") {
          if (comp1.innerText.toLowerCase() > comp2.innerText.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (comp1.innerText.toLowerCase() < comp2.innerText.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      //Switch rows
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function editItem(product) {
  var table = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];
  var rindex = 0;
  var cindex = 0;

  for(var i = 0; i < table.rows.length; i++)
  {
      for(var j = 0; j < table.rows[i].cells.length; j++)
      {
        table.rows[i].cells[j].onclick = function()
        {
          rindex = this.parentElement.rowIndex;
          cindex = this.cellIndex;
        }
      }

  }

  var popup = document.getElementById("myEditProductPopup");
  popup.style.display = "block";

  var editProdPopupBtn = popup.getElementsByClassName("popupBtn")[0];
  editProdPopupBtn.onclick = function () {

    var newText1 = document.createTextNode(document.getElementById("addPopPrdName").value);
    var newText2 = document.createTextNode(document.getElementById("popupQuantity").value);
    var newText3 = document.createTextNode(document.getElementById("popupCostPerItem").value);
    var newText4 = document.createTextNode(document.getElementById("popupWeightPerItem").value);
    var newText5 = document.createTextNode(document.getElementById("popupProductType").value);
    var newText6 = document.createTextNode(document.getElementById("popupBrand").value);
    var newText7 = document.createTextNode(document.getElementById("popupProductID").value);
    var newText8 = document.createTextNode(document.getElementById("popupLocation").value);

    table.rows[rindex].cells[0].appendChild(newText1);
    table.rows[rindex].cells[1].appendChild(newText2);
    table.rows[rindex].cells[2].appendChild(newText3);
    table.rows[rindex].cells[3].appendChild(newText4);
    table.rows[rindex].cells[4].appendChild(newText5);
    table.rows[rindex].cells[5].appendChild(newText6);
    table.rows[rindex].cells[6].appendChild(newText7);
    table.rows[rindex].cells[7].appendChild(newText8);

  }

  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function () {
    popup.style.display = "none";
  }



}
