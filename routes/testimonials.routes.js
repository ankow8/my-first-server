const express = require('express');
const router = express.Router();
const db = require('../db');
//const { v4: uuidv4 } = require('uuid');

//GET all
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

//GET by id
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(client => client.id == req.params.id));
});

//GET random
router.route('/testimonials/random').get((req, res) => {
  const randomNumber = Math.floor(Math.random() * db.testimonials.length + 1);
  res.json(db.testimonials.find(client => client.id == randomNumber));
});

//POST new element
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = db.testimonials.length + 1;
  const client = {id: id, author: author, text: text};
  if(author && text) {
    db.testimonials.push(client);
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  };

});

//PUT modify element by id
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const client = db.testimonials.find(client => client.id == req.params.id);
  const id = db.testimonials.indexOf(client);
  if(author && text) {
    db.testimonials[id] = {id: req.params.id, author: author, text: text};
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  }

});

//DELETE by id
router.route('/testimonials/:id').delete((req, res) => {
  const client = db.testimonials.find(client => client.id == req.params.id)
  db.testimonials.splice(db.testimonials.indexOf(client), 1);
  res.json({message: 'OK'});
});

module.exports = router;
