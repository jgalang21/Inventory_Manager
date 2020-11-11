
class productOrder {
  productName;
  quantity;
  first;
  last;
  email;
  phone;
  comments;

  constructor(productName, quantity, first, last,
    email, phone, comments) {
    this.productName = productName;
    this.quantity = quantity;
    this.first = first;
    this.last = last;
    this.email = email;
    this.phone = phone;
    this.comments = comments;
  }

  getProdName() {
    return this.productName;
  }
  getQuant() {
    return this.quantity;
  }

}

function addProductWindow() {
  // Get the popup
  var popup = document.getElementById("myPlaceOrderPopup");
  popup.style.display = "block";

  var popupSubmit = popup.getElementsByClassName("btn-block")[0];
  popupSubmit.onclick = function () {
    if(!checkIfEmpty()) {
      addOrder(new productOrder(document.getElementById("popPrdName").value, 
        document.getElementById("popQuant").value,
        document.getElementById("popFirst").value,
        document.getElementById("popLast").value,
        document.getElementById("popEmail").value,
        document.getElementById("popPhone").value,
        document.getElementById("popComments").value));
        //this just simply clears the field after every item is added, just for making things clear
        document.getElementById("popPrdName").value = '';
        document.getElementById("popQuant").value = '';
        document.getElementById("popFirst").value = '';
        document.getElementById("popLast").value = '';
        document.getElementById("popEmail").value = '';
        document.getElementById("popPhone").value = '';
        document.getElementById("popComments").value = '';
    }
  }
  
  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function() {
      popup.style.display = "none";
  }
}

function viewOrdersWindow() {
  // Get the popup
  var popup = document.getElementById("myViewOrderPopup");
  popup.style.display = "block";

  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function() {
      popup.style.display = "none";
  }
}

function addOrder(newOrder) {
  var orderTable = document.getElementById('myOrderTable').getElementsByTagName('tbody')[0];
  var newRow = orderTable.insertRow();
  
  //Add product name
  var newText = document.createTextNode(newOrder.getProdName());
  newRow.insertCell(0).appendChild(newText);
  //Add product quantity
  newText = document.createTextNode(newOrder.getQuant());
  newRow.insertCell(1).appendChild(newText);
  //Add order status
  newText = document.createTextNode("Ordered");
  newRow.insertCell(2).appendChild(newText);
  //Add random tracking number
  newText = document.createTextNode(Math.floor((Math.random() * 1000000) + 1));
  newRow.insertCell(3).appendChild(newText);
  //Add random order time
  newText = document.createTextNode(Math.floor((Math.random() * 7) + 1) + " Day(s)");
  newRow.insertCell(4).appendChild(newText);

  var popup = document.getElementById("myPlaceOrderPopup");
  popup.style.display = "none";
}

function checkIfEmpty() {
  var isEmpty = false;

  var name = document.getElementById("popPrdName").value;
  var quantity = document.getElementById("popQuant").value;
  var first = document.getElementById("popFirst").value;
  var last = document.getElementById("popLast").value;
  var mail = document.getElementById("popEmail").value;
  var phone = document.getElementById("popPhone").value;

  if (name == "") {
    alert("Name of the item can not be empty");
    isEmpty = true;
  }
  else if (quantity == "") {
    alert("Quantity of the item can not be empty");
    isEmpty = true;
  }
  else if (first == "") {
    alert("First name can not be empty");
    isEmpty = true;
  }
  else if (last == "") {
    alert("Last name can not be empty");
    isEmpty = true;
  }
  else if (mail == "") {
    alert("Email can not be empty");
    isEmpty = true;
  }
  else if (phone == "") {
    alert("Phone number can not be empty");
    isEmpty = true;
  }
  return isEmpty;
}
