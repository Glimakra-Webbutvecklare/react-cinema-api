const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
    customerName: String,
    seats: [String], // Array of seat numbers
    currentNumberOfSeats: Number,
    maxNumberOfSeats: Number,
    bookingTime: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// default export
module.exports = Booking;