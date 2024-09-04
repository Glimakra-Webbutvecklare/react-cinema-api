const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find().populate('show');
    res.send(bookings);
};

// Get one Booking
exports.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('show');
    if (!booking) {
        return res.status(404).json({message: 'Bbooking not found.'});
    }
    res.send(booking);
};

// Create a new booking
exports.createBooking =  async (req, res) => {
    // Use static method to create a new booking
    const {show, email, seats} = req.body;
    
    // validate re.body
    if (!show || !email || !seats) {
        return res.status(400).json({ message: 'Missing required fields' } );
    }

    try {
        const booking = await Booking.createBooking(show, email, seats);
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete a booking
exports.deleteBooking = async (req, res) => {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    if (!booking) {
        return res.status(404).json({message: 'Bbooking not found.'});
    }
    res.send(booking);
};

// update a booking
exports.updateBooking = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
        return res.status(404).json({message: 'Bbooking not found.'});
    }
    res.send(booking);
};