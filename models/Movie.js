const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    duration: Number, // duration in minutes
    rating: String,
    imgSrc: String
});

const Movie = mongoose.model('Movie', movieSchema);

// default export
module.exports = Movie;