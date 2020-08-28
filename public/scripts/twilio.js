const sendSMS = function() {
  $
    .post('/api/sms/send')
    .then((resp) => resp.sendSMS);
};

$(document).ready(function() {
  //On click listener for add to cart,
  $("#menu-items-container").on('click', ".order-button", function(event) {
    event.preventDefault();
    addUser();
    const textFieldID = `#numOfItems${event.target.dataset.id}`;
    const itemsToCart = $(textFieldID).val();
    const menuItem = { menuItemId: event.target.dataset.id, quantity: itemsToCart };
    addCart(menuItem);
    $('.order-cart').empty();
    showCart();
    $('.order-cart').on('click', '.place-order', function(event) {
      event.preventDefault();
      sendSMS();
    });
  });
});
