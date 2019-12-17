require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const api_key = process.env.API_KEY;


// run bot:
// setupTG();

function setupTG() {
  var tg = require('./tg');
  //fix from https://github.com/yagop/node-telegram-bot-api/issues/540
  process.env.NTBA_FIX_319 = 1;

  tg.run_bot(api_key);
}
//

const app = setupExpress();

const database = setupDB();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

function setupDB() {
  const database = new Datastore('database.db');
  database.loadDatabase();
  return database;
}

function setupExpress() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Starting server at ${port}: http://localhost:${port}`);
  });
  app.use(express.static('public'));
  app.use(express.json({ limit: '1mb' }));


  app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
  });

  return app;
}

