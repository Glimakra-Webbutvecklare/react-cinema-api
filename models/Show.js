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

// automatically calculates the endTime based on the startTime and the movie's duration
showSchema.pre('save', async function(next) {
    if (this.isModified('startTime') || this.isModified('movie')) {
        const Movie = mongoose.model('Movie');
        const movie = await Movie.findById(this.movie);
        if (movie) {
            this.endTime = new Date(this.startTime.getTime() + movie.duration * 60000);
        }
    }
    next();
});

const Show = mongoose.model('Show', showSchema);

// default export
module.exports = Show;