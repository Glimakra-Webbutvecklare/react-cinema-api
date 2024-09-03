const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.use(express.json());

// Add logger for all requests
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
    max: 100 // limit each IP to 100 requests per windowMs
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

// Send readme.md as a response for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/readme.html');
});

// Error route
app.get('/error', (req, res) => {
    throw new Error('Test error');
  });

// 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

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
