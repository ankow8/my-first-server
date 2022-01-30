const express = require('express');
const router = express.Router();
const db = require('../db');
//const { v4: uuidv4 } = require('uuid');

//GET all
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

//GET by id
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(client => client.id == req.params.id));
});

//POST new element
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = db.seats.length + 1;
  const person = {id: id, day: day, seat: seat, client: client, email: email};
  if(day && seat && client && email) {
    db.seats.push(person);
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  };

});

//DELETE by id
router.route('/seats/:id').delete((req, res) => {
  const client = db.seats.find(client => client.id == req.params.id)
  db.seats.splice(db.seats.indexOf(client), 1);
  res.json({message: 'OK'});
});

//PUT modify element by id
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const person = db.seats.find(person => person.id == req.params.id);
  const id = db.seats.indexOf(person);
  if(day && seat && client && email) {
    db.seats[id] = {id: req.params.id, day: day, seat: seat, client: client, email: email};
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  }

});

module.exports = router;
