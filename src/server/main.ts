import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import { DatabaseService } from './Database';

const app = express();
const PORT = 4000;

app.use(cors());

//TODO:
// - fix Cannot set headers error
// - add method to insert user to Database.ts
// - add UI component for <Carers />
// - fix not being able to go directly to route via url -- temporarily fixed

(async () => {
  const databaseService = await DatabaseService.create();

  app.get('/usernames', async (_, res) => {
    const usernames = await databaseService.getUsernames();

    res.status(200).json(usernames);
  });

  app.get('/user/:username', async (req, res) => {
    const user = await databaseService.getUser(req.params.username);

    if (_.isNull(user)) {
      res.status(404).send(`Error, resource not found`);
    }

    res.status(200).json(user);
  });

  app.listen(PORT, () => {
    console.log(`jwt-auth listening on port ${PORT}`);
  });
})();
