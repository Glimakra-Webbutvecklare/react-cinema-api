const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    startTime: Date,
    endTime: Date,
    bookings: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // Array of bookings
    maxSeatsBooked: Number,
    roomNumber: Number
});

const Show = mongoose.model('Show', showSchema);

// default export
module.exports = Show;