// Add Booking routes
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/',  bookingController.getAllBookings);

// Get a specific booking
router.get('/:id', bookingController.getBooking);

// Update a booking
router.patch('/:id', bookingController.updateBooking);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
