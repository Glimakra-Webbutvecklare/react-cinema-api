const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    releaseDate: Date,
    director: String,
    duration: Number, // duration in minutes
    rating: String,
    posterUrl: String
});

const Movie = mongoose.model('Movie', movieSchema);

// default export
module.exports = Movie;