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

function addProductWindow() {
    // Get the popup
    var popup = document.getElementById("myAddProductPopup");
    popup.style.display = "block";

    /* trying to add functionality for adding items
    var popupPrdInfo = document.getElementsByClassName("prodInfo")[0];
    popupPrdInfo.onchange = function() {

    }*/

    var newProduct = new product(1, 1, 1, 1, 1, 1, 1, 1);

    var addProdPopupBtn = document.getElementsByClassName("popupBtn")[0];
    addProdPopupBtn.onclick = function() {
        addRow(newProduct);
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