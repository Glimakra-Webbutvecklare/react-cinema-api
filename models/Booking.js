const mongoose = require('mongoose');
const Show = require('./Show');

const bookingSchema = new mongoose.Schema({
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
    email: String,
    seats: [String], // Array of seat numbers
    bookingTime: { type: Date, default: Date.now },
    totalPrice: Number,
});

// Create a function for creating a booking
// it must check if the show is available
// and if the seats are available
// and if the seats are not already booked
bookingSchema.statics.createBooking = async function(showId, email, seats) {
    // Find the show and update in one atomic operation
    const updatedShow = await Show.findOneAndUpdate(
        {
            _id: showId,
            availableSeats: { $all: seats },
            bookedSeats: { $nin: seats }
        },
        {
            $pull: { availableSeats: { $in: seats } },
            $push: { bookedSeats: { $each: seats } }
        },
        { new: true, runValidators: true }
    );

    if (!updatedShow) {
        throw new Error('Show not found or seats not available');
    }

    // Create the booking
    const booking = new Booking({
        show: updatedShow,
        email,
        seats,
        totalPrice: seats.length * updatedShow.pricePerSeat,
    });

    console.log(booking);
    await booking.save();

    return booking;
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;