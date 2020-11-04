

function addProductWindow() {
  // Get the popup

  var popup = document.getElementById("myPlaceOrderPopup");
  popup.style.display = "block";


  
  // Get the <span> element that closes the popup
  var spanClose = popup.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the popup
  spanClose.onclick = function() {
      popup.style.display = "none";
  }
}
