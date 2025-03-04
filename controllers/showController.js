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
    if (!show) return res.status(404).json({message: 'Show not found'});
    res.send(show);
};

exports.getShowsByMovieId = async (req, res) => {
    const shows = await Show.find({ movie: req.params.id }).populate('movie');
    if (!shows) return res.status(404).json({message: 'Shows not found'});
    res.send(shows);
};

// Update a Show
exports.updateShow = async (req, res) => {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!show) return res.status(404).json({message: 'Show not found'});
    res.send(show);
};

// Delete a Show
exports.deleteShow = async (req, res) => {
    await Show.findByIdAndDelete(req.params.id);
    res.json({ message: 'Show deleted' });
};