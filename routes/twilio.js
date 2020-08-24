const accountSid = 'ACb293030513abf9a16262c01ff0ef494e';
const authToken = 'd88a7629e933defbdf39d7812271fcc5';
const client = require('twilio')(accountSid, authToken);
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs? Also hi Serah it\'s Mathius hahahahah',
    from: '+14132254219',
    to: '+12368388913'
  })
  .then(message => console.log(message.sid));
