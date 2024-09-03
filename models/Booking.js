const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
    email: String,
    seats: [String], // Array of seat numbers
    bookingTime: { type: Date, default: Date.now },
    totalPrice: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

// default export
module.exports = Booking;