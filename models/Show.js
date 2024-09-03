const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    startTime: Date,
    endTime: Date,
    availableSeats: [ String ],
    bookedSeats: [ String ], 
    roomNumber: Number,
    pricePerSeat: { type: Number, default: 100 },
});

const Show = mongoose.model('Show', showSchema);

// default export
module.exports = Show;