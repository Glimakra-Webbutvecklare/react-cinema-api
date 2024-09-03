const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find().populate('show');
    res.send(bookings);
};

// Get one Booking
exports.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('show');
    res.send(booking);
};

// Create a new booking
exports.createBooking =  async (req, res) => {
    // Use static method to create a new booking
    const {show, email, seats, totalPrice} = req.body;
    
    // validate re.body
    if (!show || !email || !seats || !totalPrice) {
        return res.status(400).send('Missing required fields');
    }

    const booking = await Booking.createBooking(show, email, seats, totalPrice);

    res.status(201).send(booking);
};

// delete a booking
exports.deleteBooking = async (req, res) => {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    res.send(booking);
};

// update a booking
exports.updateBooking = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(booking);
};