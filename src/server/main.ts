import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import { DatabaseService } from './Database';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

(async () => {
  const databaseService = await DatabaseService.create();

  app.get('/usernames', async (_, res) => {
    const usernames = await databaseService.getUsernames();

    res.status(200).json(usernames);
  });

  app.get('/user/:username', async (req, res) => {
    const user = await databaseService.getUser(req.params.username);

    if (_.isNull(user)) {
      return res.status(404).send(new Error(`Error, ${req.params.username} doesn't exist`));
    }

    res.status(200).json(user);
  });

  app.post('/:username/favourites', async (req, res) => {
    const username = req.params.username;
    const id = req.body.id;
    await databaseService.insertFavouriteForUser(username, id);

    res.status(200).json(id);
  });

  app.delete('/:username/favourites/:id', async (req, res) => {
    const username = req.params.username;
    const id = req.params.id;
    await databaseService.removeFavouriteForUser(username, id);

    res.status(200).json();
  });

  app.listen(PORT, () => {
    console.log(`jwt-auth listening on port ${PORT}`);
  });
})();
