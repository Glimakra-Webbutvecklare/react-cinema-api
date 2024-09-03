// define show controller
const Show = require('../models/Show');

// Create a new Show
exports.createShow = async (req, res) => {
    const show = new Show(req.body);
    await show.save();
    res.send(show);
};

// Get all Shows
exports.getAllShows = async (req, res) => {
    const shows = await Show.find().populate('movie');
    res.send(shows);
};

// Get a specific Show by id
exports.getShow = async (req, res) => {
    const show = await Show.findById(req.params.id).populate('movie');
    res.send(show);
};

exports.getShowsByMovieId = async (req, res) => {
    const shows = await Show.find({ movie: req.params.id }).populate('movie');
    res.send(shows);
};

// Update a Show
exports.updateShow = async (req, res) => {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(show);
};

// Delete a Show
exports.deleteShow = async (req, res) => {
    await Show.findByIdAndDelete(req.params.id);
    res.send({ message: 'Show deleted' });
};