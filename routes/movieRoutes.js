// Add Booking routes
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Create a new movie
 *     tags:
 *       - Movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.post('/', movieController.createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Retrieve a list of movies from the database
 *     tags:
 *       - Movie
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', movieController.getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a specific movie
 *     description: Retrieve a movie by its ID
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.get('/:id', movieController.getMovie);

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Update a movie
 *     description: Update a movie's details by its ID
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.patch('/:id', movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     description: Delete a movie by its ID
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Movie not found
 */
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
