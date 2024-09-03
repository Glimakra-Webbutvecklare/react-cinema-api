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
    posterUrl: 'https://example.com/inception-poster.jpg'
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    duration: 142,
    genre: 'Drama',
    releaseDate: new Date('1994-09-23'),
    director: 'Frank Darabont',
    posterUrl: 'https://example.com/shawshank-poster.jpg'
  },
  // Add more movies here
];

const shows = [
  {
    movie: null, // We'll set this after creating movies
    startTime: new Date('2023-05-01T18:00:00'),
    endTime: new Date('2023-05-01T20:28:00'),
    currentSeatsBooked: 50,
    roomNumber: 1,
    maxSeatsBooked: 100
  },
  {
    movie: null,
    startTime: new Date('2023-05-01T20:00:00'),
    endTime: new Date('2023-05-01T22:22:00'),
    currentSeatsBooked: 66,
    roomNumber: 1,
    maxSeatsBooked: 100
  }
  // Add more shows here
];

const bookings = [
  {
    email: 'john.doe@example.com',
    show: null, // We'll set this after creating shows
    seats: ['A1', 'A2'],
    totalPrice: 20,
  },
  {
    email: 'lisa.poe@example.com',
    show: null,
    seats: ['B3', 'B4', 'B5'],
    totalPrice: 30
  },
  // Add more bookings here
];

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
    bookings.forEach((booking, index) => {
      booking.show = createdShows[index % createdShows.length]._id;
    });
    await Booking.insertMany(bookings);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
