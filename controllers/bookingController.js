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
    // Check if the show is available
    const show = await Show.findById(req.body.show);
    if (!show) {
	return res.status(404).send('Show not found');
    }
    
    // Check if available seats
    if ((show.currentSeatsBooked + req.body.seats.length) >= show.maxSeatsBooked) {
	return res.status(400).send('Show is not available');
    }

    // Update show
    show.currentSeatsBooked += req.body.seats.length;
    await show.save();
    
    const booking = new Booking(req.body);
    await booking.save();

    res.send(booking);
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