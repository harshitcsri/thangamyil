const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const helmet = require('helmet');

const app = express();
const port = 3000;

//const shared_key = '9b3k8q1As6kYNKhcm5CdKCEEWY2SKr3Hup0qLMlDRVnOYNp2'; // mobile sdk shared key 

const shared_key = 'xCEXrpPRlGnBWnQhtysMocu1z1VyZsotvSqGWBkWsVg7lMwG'; // mobile sdk shared key

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Set X-Frame-Options to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Set HSTS (HTTP Strict Transport Security) to enforce secure connections to the server
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true, // Apply HSTS to all subdomains
  preload: true
}));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  {
    user_token: '12345',
    nombre: 'Jose Altuve',
    email: 'mejiasoscar1990@gmail.com',
  },
  {
    user_token: '67890',
    nombre: 'Joseito',
    email: 'jose@example.com',
  },
  {
    user_token: '1990',
    nombre: 'Oriana',
    email: 'oriana@example.com',
  },
];

app.post('/api/console-payload', (req, res) => {
  const userToken = req.body.user_token; // Get user_token from the request body
  console.log("User Token Received:", userToken);

  const userRecord = users.find((user) => user.user_token === userToken);

  if (!userRecord) {
    console.error('User not found for token:', userToken);
    return res.status(401).json({ error: 'User not found' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const jti = Math.round((timestamp / 100) * 53);

  const userPayload = {
    name: userRecord.nombre,
    email: userRecord.email,
    iat: timestamp,
    jti: jti,
  };

  const accessToken = jwt.encode(userPayload, shared_key);
  console.log("Token Created:", accessToken);
  
  res.json({ jwt: accessToken });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jwt-simple');
// const app = express();
// const port = 3000;

// const shared_key = '9b3k8q1As6kYNKhcm5CdKCEEWY2SKr3Hup0qLMlDRVnOYNp2'; // mobile sdk shared key 
// app.use(express.urlencoded({ extended: true }))
// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// app.post('/api/console-payload', (req, res) => {

//   // Authenticate the user
//   const posts = [
//     {
//       user_token: '12345',
//       nombre: 'Jose Altuve',
//       email: 'mejiasoscar1990@gmail.com',
//     },
//     {
//       user_token: '67890',
//       nombre: 'Joseito',
//       email: 'jose@example.com',
//     },
//     {
//       user_token: '1990',
//       nombre: 'Oriana',
//       email: 'oriana@example.com',
//     },
//   ]

//   const timestamp = Math.round(new Date().getTime() / 1000)
//   const jtinumber = (timestamp / 100) * 53
//   const jti = Math.round(jtinumber)

//   const userToken = req.body.user_token; // Get user_token from the request body
//   console.log("User Token Received", userToken);
//   const username = posts.find((user) => user.user_token === userToken);

//   if (!username) {
//     return res.status(401).json({ error: 'User not found' });
//   }

//   const user = {
//     name: username.nombre,
//     email: username.email,
//     iat: timestamp,
//     jti: jti,
//   }

//   const accessToken = jwt.encode(user, shared_key)
//   console.log("Token Created", accessToken);
//   res.json({ jwt: accessToken })
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
