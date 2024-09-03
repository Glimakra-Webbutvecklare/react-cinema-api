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

    // Add more tests for other movie routes (POST, PUT, DELETE)
  });

  describe('Show Routes', () => {
    it('GET /api/v1/shows should return all shows', async () => {
      const res = await request(app).get('/api/v1/shows');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Add more tests for other show routes (POST, PUT, DELETE)
  });

  describe('Booking Routes', () => {
    it('GET /api/v1/bookings should return all bookings', async () => {
      const res = await request(app).get('/api/v1/bookings');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Add more tests for other booking routes (POST, PUT, DELETE)
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
      app.get('/error', (req, res) => {
        throw new Error('Test error');
      });

      const res = await request(app).get('/error');
      expect(res.statusCode).toBe(500);
      expect(res.text).toBe('Something broke!');
    });
  });
});
