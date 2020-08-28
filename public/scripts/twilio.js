const sendSMS = function() {
  $
    .post('/api/sms/send')
    .then((resp) => resp.sendSMS);
};

$(document).ready(function() {
  //On click listener for add to cart,
  $('.order-cart').on('click', '.place-order', function(event) {
    event.preventDefault();
    sendSMS();
  });
});
