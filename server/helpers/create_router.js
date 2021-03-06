const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {

  const router = express.Router();

  // View All
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => {
        res.json(docs)
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  // View One
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne({ _id: ObjectID(id) })
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  // Delete Entry
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .deleteOne({ _id: ObjectID(id) })
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err})
    });
  });

  // Create New Entry
  router.post('/', (req, res) => {
    console.log('route being hit', req.body);
    const newStock = req.body;
    collection
    .insertOne(newStock)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  // Update an Entry
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: updatedData },
      { returnOriginal: false }
    )
    .then((result) => {
      res.json(result.value)
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err})
    });
  });

  return router;
}

module.exports = createRouter;
