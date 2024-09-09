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
  {
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    duration: 175,
    genre: 'Crime',
    releaseDate: new Date('1972-03-24'),
    director: 'Francis Ford Coppola',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    duration: 152,
    genre: 'Action',
    releaseDate: new Date('2008-07-18'),
    director: 'Christopher Nolan',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    duration: 154,
    genre: 'Crime',
    releaseDate: new Date('1994-10-14'),
    director: 'Quentin Tarantino',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
  }
];

const shows = [
  {
    movie: null, // We'll set this after creating movies
    startTime: new Date('2024-09-27T18:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4','A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-09-28T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-09-29T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-09-30T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-10-02T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 1,
  },
  {
    movie: null,
    startTime: new Date('2024-10-03T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 2,
  },
  {
    movie: null,
    startTime: new Date('2024-10-04T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 2,
  },
  {
    movie: null,
    startTime: new Date('2024-10-05T20:00:00'),
    availableSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    bookedSeats: [],
    roomNumber: 2,
  }
  
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
    const createdShows = [];
    for (let i = 0; i < shows.length; i++) {
      const show = new Show(shows[i]);
      show.movie = createdMovies[i % createdMovies.length]._id;
      await show.save();
      createdShows.push(show);
    }

    // Seed bookings
    let show, email, seats;
    for(let i = 0; i < numberOfBookings; i++) {
      show = createdShows.pop();
      email = `user${i+1}@example.com`;
      // pick a slice of 1-4 seats from the available seats
      seats = show.availableSeats.slice(0, Math.floor(Math.random() * 4) + 1);
      await Booking.createBooking(show, email, seats);
    }

    const apiKey = new ApiKey({ key: 'WUD2024-DEMO_API_KEY' });
    await apiKey.save();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
