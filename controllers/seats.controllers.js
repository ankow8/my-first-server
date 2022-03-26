const Seat = require('../models/seat.models');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id)
    if(seat) {
      res.json(seat);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.postNew = async (req, res) => {
  try {
    const cleanDay = sanitize(req.body.day);
    const cleanSeat = sanitize(req.body.seat);
    const cleanClient = sanitize(req.body.client);
    const cleanEmail = sanitize(req.body.email);
    const newSeat = new Seat({day: cleanDay, seat: cleanSeat, client: cleanClient, email: cleanEmail});
    await newSeat.save();
    res.json({message: 'OK'});
  }  catch(err) {
    res.status(500).json({message: err});
  }
  /*if(db.seats.some(item => (item.day == day && item.seat == seat))) {
    res.status(409).json({ message: 'The slot is already taken...' });
  } else if(day && seat && client && email) {
    db.seats.push(person);
    req.io.emit('seatsUpdated', db.seats);
  } else {
    res.status(404).json({message: 'Not found...'});
  };*/
};

exports.putById = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const modifySeat = await Seat.findById(req.params.id);
    if(modifySeat) {
      await Seat.updateOne({_id: req.params.id}, {$set: {day: day, seat: seat, client: client, email: email}});
      res.json({message: 'OK'});
    } else {
      res.status(404).json({message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.deleteById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne(seat);
      res.json({message: 'OK'});
    } else {
      res.status(404).json({message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};
