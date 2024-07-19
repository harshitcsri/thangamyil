const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const uuid = require('uuid');

const app = express();
const port = 3000;

const subdomain = 'pdi-xoogle';
const shared_key = '9b3k8q1As6kYNKhcm5CdKCEEWY2SKr3Hup0qLMlDRVnOYNp2';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/api/console-payload', (req, res) => {
  const payload = req.body;
  console.log(payload);

  const token = jwt.encode(payload, shared_key);
  console.log("Token:", token);

  res.status(200).send(token);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
