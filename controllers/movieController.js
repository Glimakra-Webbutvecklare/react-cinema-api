// define movie controller
const Movie = require('../models/Movie');

// Create a new movie
exports.createMovie = async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.send(movie);
};

// Get all movies
exports.getAllMovies = async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
};

// Get a specific movie by id
exports.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({message: 'Movie not found'});
    res.send(movie);
};

// Update a movie
exports.updateMovie = async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({message: 'Movie not found'});
    res.send(movie);
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).json({message: 'Movie not found'});
    res.send({ message: 'Movie deleted' });
};
