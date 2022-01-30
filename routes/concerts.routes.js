const express = require('express');
const router = express.Router();
const db = require('../db');
//const { v4: uuidv4 } = require('uuid');

//GET all
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

//GET by id
router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(client => client.id == req.params.id));
});

//POST new element
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = db.concerts.length + 1;
  const client = {id: id, performer: performer, genre: genre, price: price, day: day, image: image};
  if(performer && genre && price && day && image) {
    db.concerts.push(client);
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  };

});

//DELETE by id
router.route('/concerts/:id').delete((req, res) => {
  const client = db.concerts.find(client => client.id == req.params.id)
  db.concerts.splice(db.concerts.indexOf(client), 1);
  res.json({message: 'OK'});
});

//PUT modify element by id
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const client = db.concerts.find(client => client.id == req.params.id);
  const id = db.concerts.indexOf(client);
  if(performer && genre && price && day && image) {
    db.concerts[id] = {id: req.params.id, performer: performer, genre: genre, price: price, day: day, image: image};
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  }

});

module.exports = router;
