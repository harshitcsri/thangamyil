const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const qs = require('qs');

const app = express();
const port = 3000;

const subdomain = 'pdi-xoogle';
const shared_key = '9b3k8q1As6kYNKhcm5CdKCEEWY2SKr3Hup0qLMlDRVnOYNp2';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/api/console-payload', (req, res) => {
  console.log("API hit");
  // Authenticate the user
  const posts = [
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
  ]

  const timestamp = Math.round(new Date().getTime() / 1000)
  const jtinumber = (timestamp / 100) * 53
  const jti = Math.round(jtinumber)

  const userToken = req.body.user_token; // Get user_token from the request body
  console.log("API hit 2",userToken);
  const username = posts.find((user) => user.user_token === userToken);

  if (!username) {
    return res.status(401).json({ error: 'User not found' });
  }

  const user = {
    name: username.nombre,
    email: username.email,
    iat: timestamp,
    jti: jti,
  }

  const accessToken = jwt.encode(user, shared_key)
  console.log("API hit 3",accessToken);
  res.json({ jwt: accessToken })
});


//   let data = qs.stringify({
//     'user_token': '15566587459485' 
//   });



//   let hardCodedPayload = {
//       "email": "harshitcsrivastava@gmail.com",
//       "name": "Harshit Srivastava",
//       "phone": 9453841101,
//       "tags": [
//           "test"
//       ],
//       "role": "user",
//       iat: (new Date().getTime() / 1000),
//       jti: uuid.v4(),
//   }

//   const token = jwt.encode(hardCodedPayload, shared_key);
//   console.log("Token:", token);

//   res.status(200).send(`${token}`);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
