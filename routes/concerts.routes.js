const express = require('express');
const router = express.Router();

const ConcertsControllers = require('../controllers/concerts.controllers');

//GET all
router.get('/concerts', ConcertsControllers.getAll);

//GET by id
router.get('/concerts/:id', ConcertsControllers.getById);

//POST new element
router.post('/concerts', ConcertsControllers.postNew);

//PUT modify element by id
router.put('/concerts/:id', ConcertsControllers.putById);

//DELETE by id
router.delete('/concerts/:id', ConcertsControllers.deleteById);

module.exports = router;
