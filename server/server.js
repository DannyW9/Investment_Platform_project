const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');
const cors = require('cors');

app.use(cors());
app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('portfolio');
    const stocksCollection = db.collection('stocks');
    const stocksRouter = createRouter(stocksCollection);
    app.use('/api/stocks', stocksRouter);
  })

app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port }`);
})
