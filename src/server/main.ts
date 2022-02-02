import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`jwt-auth listening on port ${PORT}`);
});

// # /register (maybe use '/' since landing page will probs be regiser)
//    - takes in a username and pw.  Hashes the pw and saves it in a DB/file/whatever. Sends it back to client

// # /login
//    - takes in username, and pw, looks up user from DB using username, hashes the pw passed in. Compares hashed pw in
//      DB against hashed pw in request. if they match, send them back a signed token.
//      Sign it with a shared secret between server and client

// - On every route, have an authMiddleware that checks the Authorization header has a token in it. Decode the token, check it's valid
