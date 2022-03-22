const express = require('express');
const router = express.Router();

const ConcertsControllers = require('../controllers/concerts.controllers');

//GET all
router.get('/concerts', ConcertsControllers.getAll);

//GET by id
router.get('/concerts/:id', ConcertsControllers.getById);

//GET by performer
router.get('/concerts/performer/:performer', ConcertsControllers.getByPerformer);

// GET by genre
router.get('/concerts/genre/:genre', ConcertsControllers.getByGenre);

//GET by price
router.get('/concerts/price/:price_min/:price_max', ConcertsControllers.getByPrice);

//GET by day
router.get('/concerts/price/day/:day', ConcertsControllers.getByDay);

//POST new element
router.post('/concerts', ConcertsControllers.postNew);

//PUT modify element by id
router.put('/concerts/:id', ConcertsControllers.putById);

//DELETE by id
router.delete('/concerts/:id', ConcertsControllers.deleteById);

module.exports = router;
