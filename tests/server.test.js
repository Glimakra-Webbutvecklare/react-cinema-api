const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Connect to a test database before running tests
    require('dotenv').config();
    const MONGODB_URL = process.env.MONGODB_URL;
    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PASS = process.env.MONGODB_PASS;
    const TEST_MONGODB_URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}`;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

    await mongoose.connect(TEST_MONGODB_URL, clientOptions);
  });

  afterAll(async () => {
    // Disconnect from the test database after all tests are done
    await mongoose.connection.close();
    // close app listener
    server.close();
  });

  describe('Movie Routes', () => {
    it('GET /api/v1/movies should return all movies', async () => {
      const res = await request(app).get('/api/v1/movies');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/v1/movies/:id should return 404 for non-existent movie', async () => {
      const nonExistentId = '5f5e7f5c9d3e2a1b1c9d8e7f';
      const res = await request(app).get(`/api/v1/movies/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
    });


  });

  describe('Show Routes', () => {
    it('GET /api/v1/shows should return all shows', async () => {
      const res = await request(app).get('/api/v1/shows');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/v1/shows/movie/:id should return shows for a specific movie', async () => {
      const movies = await request(app).get('/api/v1/movies');
      const movieId = movies.body[0]._id;
      const res = await request(app).get(`/api/v1/shows/movie/${movieId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      res.body.forEach(show => expect(show.movie._id).toBe(movieId));
    });
  });

  describe('Booking Routes', () => {
    it('GET /api/v1/bookings should return all bookings', async () => {
      const res = await request(app).get('/api/v1/bookings');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Add more tests for other booking routes (POST, PUT, DELETE)
    // Booking a show
    it('should book a show', async () => {
      // Create a test booking by first finding a show
      const shows = await request(app).get('/api/v1/shows');

      // pick random movie from the list
      const randomShow = shows.body[Math.floor(Math.random() * shows.body.length)];

      // pick random seats from the available seats
      const randomSeats = randomShow.availableSeats.slice(0, 2);

      const bookingData = {
        show: randomShow._id,
        email: 'test@example.com',
        seats: randomSeats,
      };

      const res = await request(app).post('/api/v1/bookings').send(bookingData);

      expect(res.statusCode).toBe(201);
    });
  });

  describe('Rate Limiting', () => {
    it('should limit requests to 100 per 15 minutes', async () => {
      for (let i = 0; i < 100; i++) {
        await request(app).get('/api/v1/movies');
      }
      const res = await request(app).get('/api/v1/movies');
      expect(res.statusCode).toBe(429);
    });
  });

  describe('Error Handling', () => {
    it('should return 500 for server errors', async () => {
      // Simulate a server error
      jest.spyOn(console, 'error').mockImplementation(() => {});
      // Add the error route for testing
      app.get('/api/v1/error', (req, res, next) => {
        throw new Error('Test error');
      });

      // unset '/' route for testing
      app.get('/', (req, res) => {
        res.send('Hello World!');
      });
      
      const res = await request(app).get('/api/v1/error')
                                    .set('Accept', 'application/json');

      console.log(res);
      expect(res.body.message).toBe('Something broke!');
      expect(res.statusCode).toBe(500);
    });
  });

});
