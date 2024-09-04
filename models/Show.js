const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         movie:
 *           type: string
 *           description: The ID of the associated movie
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the show
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the show (calculated automatically)
 *         availableSeats:
 *           type: array
 *           items:
 *             type: string
 *           description: List of available seat numbers
 *         bookedSeats:
 *           type: array
 *           items:
 *             type: string
 *           description: List of booked seat numbers
 *         roomNumber:
 *           type: number
 *           description: The room number for the show
 *         pricePerSeat:
 *           type: number
 *           description: The price per seat for this show
 */
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