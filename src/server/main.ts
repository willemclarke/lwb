import express from 'express';
import cors from 'cors';
import { UserService, fetchRawData } from './userSservice';

const app = express();
const PORT = 4000;

app.use(cors());

(async () => {
  const data = await fetchRawData();
  const userService = new UserService(data);

  app.get('/usernames', async (_, res) => {
    const usernames = userService.getUsernames();

    res.send(JSON.stringify(usernames, null, 2));
  });

  app.get('/user/:username', async (req, res) => {
    console.log('req.params.username: ', req.params.username);
    const user = userService.getUser(req.params.username);

    res.send(JSON.stringify(user, null, 2));
  });

  // app.get('/users', async (req, res) => {
  //   const users = userService.getUsers();

  //   res.send(JSON.stringify(users, null, 2));
  // });

  app.listen(PORT, () => {
    console.log(`jwt-auth listening on port ${PORT}`);
  });
})();
