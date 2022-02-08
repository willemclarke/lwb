#### lwb-challenge

- `Stack`: React, TypeScript, React-Query, Chakra-Ui
- `/server` expressjs server for processing incoming get/post/delete requests and uses the methods of the Database class to parse the data and write it to the database.json file
- `/client` handles all aspects of the front-end, hooks to fetch data from express api, UI components to display data
- Only have local setup, so you need to use two separate terminals and respectively run:
  - (`yarn client:dev`) and (`yarn server:dev`)
