const client = require('twilio')

module.exports = {
  callOwner: function(){
      client.calls.create({
          to: "+16478867803",
          from: "+16477243888",
          //url: "http://demo.twilio.com/docs/voice.xml"
        }, function(err, responseData) {
          console.log(responseData.from);
      });
  }

  sendSMS: function(){
    client.messages.create({
        to: "+16478867803",
        from: "+16477243888",
        body: "Your food is ready for pickup!",
    }, function(err, message) {
        console.log(message.sid);
    });
  }
}
