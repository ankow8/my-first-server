const express = require('express');
const router = express.Router();

const SeatsControllers = require('../controllers/seats.controllers');

//GET all
router.get('/seats', SeatsControllers.getAll);

//GET by id
router.get('/seats/:id', SeatsControllers.getById);

//POST new element
router.post('/seats', SeatsControllers.postNew);

//PUT modify element by id
router.put('/seats/:id', SeatsControllers.putById);

//DELETE by id
router.delete('/seats/:id', SeatsControllers.deleteById);

module.exports = router;
