const accountSid = 'ACb293030513abf9a16262c01ff0ef494e';
const authToken = '4af8f2918eafa75e5966d253b9686083';
const client = require('twilio')(accountSid, authToken);


const orderObjectToXML = (order) => {
  let orderString = "Customer ordered ";
  order.forEach((elm, index, array) => {
    orderString = orderString + elm['quantity'] + " " + elm['dish'] + " ";
  });
  let xmlbuilder = require('xmlbuilder');
  return xml = xmlbuilder.create('Reponse')
    .ele('Say', {'voice': 'woman'}, orderString)
    .end({ pretty: true});
};
console.log(orderObjectToXML([{dish: "pizza", quantity: 3}, {dish: "cake", quantity: 1}]));

module.exports = {
  callOwner: function() {
    client.messages.create({
      to: "+15017122661",
      from: "+12368388913",
      //url: "http://demo.twilio.com/docs/voice.xml"
    }, function(err, responseData) {
      console.log(responseData.from);
    });
  }
};
