import express from 'express';
import cors from 'cors';
import { getUsers } from './api';

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/users', async (req, res) => {
  const users = await getUsers();

  res.status(200).send(JSON.stringify(users, null, 2));
});

app.listen(PORT, () => {
  console.log(`jwt-auth listening on port ${PORT}`);
});
