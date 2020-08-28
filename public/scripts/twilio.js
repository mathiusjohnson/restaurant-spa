
const sendSMS = function() {
  $
    .post('/api/sms/send')
    .then((resp) => resp.sendSMS);
};

$(document).ready(function() {


  $(document).on('click', '.place-order', function(event) {
    console.log("this is inside twilio.js");

    event.preventDefault();
    sendSMS();
  });
});
