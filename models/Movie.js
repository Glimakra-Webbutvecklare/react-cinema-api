const mongoose = require('mongoose');

/** 
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *           title:
 *             type: string
 *             description: The title of the movie
 *           description:
 *             type: string
 *             description: The description of the movie
 *           genre:
 *             type: string
 *             description: The genre of the movie
 *           releaseDate:
 *             type: string
 *             format: date
 *             description: The release date of the movie
 *           director:
 *             type: string
 *             description: The director of the movie
 *           duration:
 *             type: integer
 *             description: The duration of the movie in minutes
 *           rating:
 *             type: string
 *             description: The rating of the movie
 *           posterUrl:
 *             type: string
 *             description: The URL of the movie poster
 */
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