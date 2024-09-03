// Add Booking routes
const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

// Create a new Show
router.post('/', showController.createShow);

// Get all Shows
router.get('/',  showController.getAllShows);

// Get all Shows by movie id
router.get('/movie/:id', showController.getShowsByMovieId);

// Get a specific Show
router.get('/:id', showController.getShow);

// Update a Show
router.patch('/:id', showController.updateShow);

// Delete a Show
router.delete('/:id', showController.deleteShow);

module.exports = router;
