class product {
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
        switch(i) {
            case 0 :
                return this.productName;
            case 1 :
                return this.quantity;
            case 2 :
                return this.costPerItem;
            case 3 :
                return this.weightPerItem;
            case 4 :
                return this.productType;
            case 5 :
                return this.brand;
            case 6 :
                return this.productID;
            case 7 :
                return this.location;

        }
    }
}

function checkIfEmpty() {
    var isEmpty = false,

    name = document.getElementById("popupPrdName").value,
    quantity = document.getElementById("popupQuantity").value,
    cost = document.getElementById("popupCostPerItem").value,
    weight = document.getElementById("popupWeightPerItem").value,
    type = document.getElementById("popupProductType").value,
    brand = document.getElementById("popupBrand").value,
    id = document.getElementById("popupProductID").value,
    location = document.getElementById("popupLocation").value;

    if(name == ""){
      alert("Name of the item can not be empty");
      isEmpty = true;
    }
    else if(quantity == ""){
      alert("Quantity of the item can not be empty")
      isEmpty = true;
    }
    else if(cost == ""){
      alert("Cost of the item can not be empty")
      isEmpty = true;
    }
    else if(weight == ""){
      alert("Weight of the item can not be empty")
      isEmpty = true;
    }
    else if(type == ""){
      alert("Type of the item can not be empty")
      isEmpty = true;
    }
    else if(brand == ""){
      alert("Brand of the item can not be empty")
      isEmpty = true;
    }
    else if(id == ""){
      alert("Id of the item can not be empty")
      isEmpty = true;
    }
    else if(location == ""){
      alert("Location of the item can not be empty")
      isEmpty = true;
    }
    return isEmpty;

}

function addProductWindow() {
    // Get the popup
    var popup = document.getElementById("myAddProductPopup");
    popup.style.display = "block";

    var newProduct = new product(1, 1, 1, 1, 1, 1, 1, 1);

    var addProdPopupBtn = document.getElementsByClassName("popupBtn")[0];
    addProdPopupBtn.onclick = function() {


      newProduct.productName = document.getElementById("popupPrdName").value;
      newProduct.quantity = document.getElementById("popupQuantity").value;
      newProduct.costPerItem = document.getElementById("popupCostPerItem").value;
      newProduct.weightPerItem = document.getElementById("popupWeightPerItem").value;
      newProduct.productType = document.getElementById("popupProductType").value;
      newProduct.brand = document.getElementById("popupBrand").value;
      newProduct.productID = document.getElementById("popupProductID").value;
      newProduct.location = document.getElementById("popupLocation").value;

      if(!checkIfEmpty()) {
        addRow(newProduct);

      }

      //this just simply clears the field after every item is added, just for making things clear
      document.getElementById("popupPrdName").value = '';
      document.getElementById("popupQuantity").value ='';
      document.getElementById("popupCostPerItem").value = '';
      document.getElementById("popupWeightPerItem").value = '';
      document.getElementById("popupProductType").value = '';
      document.getElementById("popupBrand").value = '';
      document.getElementById("popupProductID").value = '';
      document.getElementById("popupLocation").value = '';

    }

    // Get the <span> element that closes the popup
    var spanClose = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the popup
    spanClose.onclick = function() {
        popup.style.display = "none";
    }
}

function addRow(newProduct) {
    var inventoryTable = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];
    var newRow = inventoryTable.insertRow();
    for(var i = 0; i < 8; i++) {
        var newCell = newRow.insertCell(i);
        var newText  = document.createTextNode(newProduct.getProductInfo(i));
        newCell.appendChild(newText);
    }
    var popup = document.getElementById("myAddProductPopup");
    popup.style.display = "none";
}

function removeRow() {
    var inventoryTable = document.getElementById('myInventoryTable').getElementsByTagName('tbody')[0];
    inventoryTable.deleteRow(inventoryTable.rows.length - 1);
}
