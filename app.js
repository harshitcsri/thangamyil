const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var jwt = require('jwt-simple');
var uuid = require('uuid');
var url = require('url');

const app = express();
const port = 3000;

var subdomain = 'pdi-xoogle';

// Middleware to parse JSON bodies
app.use(bodyParser.json());
var shared_key = '9b3k8q1As6kYNKhcm5CdKCEEWY2SKr3Hup0qLMlDRVnOYNp2';
app.post('/api/console-payload', (req, res) => {
  const payload = req.body;
  console.log(payload);

  var token = jwt.encode(payload, shared_key);
  console.log("Token",token);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
