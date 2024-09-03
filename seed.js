const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Show = require('./models/Show');
const Booking = require('./models/Booking');

const movies = [
  {
    title: 'Inception',
    description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
    duration: 148,
    genre: 'Sci-Fi',
    releaseDate: new Date('2010-07-16'),
    director: 'Christopher Nolan',
    posterUrl: 'https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg'
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    duration: 142,
    genre: 'Drama',
    releaseDate: new Date('1994-09-23'),
    director: 'Frank Darabont',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/20f2GThu22hp5MgCA4dg3bZ3gTS.jpg'
  },
  // Add more movies here
];

const shows = [
  {
    movie: null, // We'll set this after creating movies
    startTime: new Date('2024-10-01T18:00:00'),
    endTime: new Date('2024-10-01T20:28:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4','A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-10-01T20:00:00'),
    endTime: new Date('2024-10-01T22:22:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  }
  // Add more shows here
];

const numberOfBookings = shows.length;

async function seedDatabase() {
  try {
    // Connect to MongoDB
    require('dotenv').config();
    const MONGODB_URL = process.env.MONGODB_URL;
    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PASS = process.env.MONGODB_PASS;

    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}`;
    await mongoose.connect(url, clientOptions);

    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});
    await Booking.deleteMany({});

    // Seed movies
    const createdMovies = await Movie.insertMany(movies);

    // Seed shows
    shows.forEach((show, index) => {
      show.movie = createdMovies[index % createdMovies.length]._id;
    });
    const createdShows = await Show.insertMany(shows);

    // Seed bookings
    let show, email, seats;
    for(let i = 0; i < numberOfBookings; i++) {
      show = createdShows.pop();
      email = `user${i+1}@example.com`;
      // pick a slice of 1-4 seats from the available seats
      seats = show.availableSeats.slice(0, Math.floor(Math.random() * 4) + 1);
      await Booking.createBooking(show, email, seats);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
