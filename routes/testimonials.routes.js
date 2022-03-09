const express = require('express');
const router = express.Router();

const TestimonialsControllers = require('../controllers/testimonials.controllers');

//GET all
router.get('/testimonials', TestimonialsControllers.getAll);

//GET by id
router.get('/testimonials/:id', TestimonialsControllers.getById);

//GET random
router.get('/testimonials/random', TestimonialsControllers.getRandom);

//POST new element
router.post('/testimonials', TestimonialsControllers.postNew);

//PUT modify element by id
router.put('/testimonials/:id', TestimonialsControllers.putById);

//DELETE by id
router.delete('/testimonials/:id', TestimonialsControllers.deleteById);

module.exports = router;
