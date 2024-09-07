const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Trust the reverse proxy
app.set('trust proxy', 1);


// Add logger for all requests
// Logg both from console and to access.log file
app.use(morgan('dev'));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', {stream: accessLogStream} ));

// Add environment variables from .env
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

if (!MONGODB_URL || !MONGODB_USER || !MONGODB_PASS) {
	console.error('Missing environment variables. Please set MONGODB_URL, MONGODB_USER, and MONGODB_PASS.');
	process.exit(1);
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500 // limit each IP to 100 requests per windowMs
  });

// Connect to MongoDB
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}`;
mongoose.connect(url, clientOptions)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

// Setup routes
app.use('/api/v1/movies', limiter, require('./routes/movieRoutes'));
app.use('/api/v1/shows', limiter, require('./routes/showRoutes'));
app.use('/api/v1/bookings', limiter, require('./routes/bookingRoutes'));

// Add the error route for testing
// Uncomment this before running 'npm run test'
// app.get('/api/v1/error', (req, res, next) => {
//   throw new Error('Test error');
// });

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Serve Swagger documentation
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 404 handler for all other routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };;
