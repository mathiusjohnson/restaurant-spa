const sendSMS = function() {
  $
    .post('/api/sms/send')
    .then((resp) => resp.sendSMS);
<<<<<<< HEAD
};$(document).ready(function() {
=======
};

$(document).ready(function() {
>>>>>>> 1890eee985c3d8f10abb79998f959c1f54c63f9a
  //On click listener for add to cart,
  $('.order-cart').on('click', '.place-order', function(event) {
    event.preventDefault();
    sendSMS();
  });
});
