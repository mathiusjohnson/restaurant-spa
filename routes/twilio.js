const accountSid = 'ACb293030513abf9a16262c01ff0ef494e';
const authToken = 'd88a7629e933defbdf39d7812271fcc5';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+15017122661',
    mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
    to: '+15558675310'
  })
  .then(message => console.log(message.sid));
