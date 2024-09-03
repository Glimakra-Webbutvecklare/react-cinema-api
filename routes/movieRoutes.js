// Add Booking routes
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Create a new booking
router.post('/', movieController.createMovie);

// Get all movies
router.get('/',  movieController.getAllMovies);

// Get a specific movie
router.get('/:id', movieController.getMovie);

// Update a movie
router.patch('/:id', movieController.updateMovie);

// Delete a movie
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
