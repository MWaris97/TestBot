const sid = process.env['SID']
const token = process.env['KEY']
var express = require('express')

var app = express();
const bodyParser = require('body-parser');

const client = require('twilio')(sid, token);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.post('/test', (req, res) => {
  const twiml = new MessagingResponse();
  let message = req.body.Body;

  if (message.includes('Hi'))
    twiml.message("Hello!")
  else if (message.includes('How are you'))
    twiml.message("I am fine, how are you ?")
  else
    twiml.message("I dont know what to do :|")
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

app.listen(8080, () => {
  console.log("App is running")
})