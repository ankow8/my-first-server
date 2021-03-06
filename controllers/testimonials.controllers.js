const Testimonial = require('../models/testimonial.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      res.json(tes);
    } else {
      res.status(404).json({message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if(tes) {
      res.json(tes);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.postNew = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTes = new Testimonial({author: author, text: text});
    if(newTes) {
      await newTes.save();
      res.json({message: 'OK'});
    } else {
      res.status(404).json({message: 'Not found...'});
    };
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.putById = async (req, res) => {
  try {
    const { author, text } = req.body;
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.updateOne({_id: req.params.id}, {$set: {author: author, text: text}});
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
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.deleteOne({_id: req.params.id});
      res.json({message: 'OK'});
    } else {
      res.status(404).json({message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};
