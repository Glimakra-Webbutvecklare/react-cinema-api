// Add Booking routes
const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

/**
 * @swagger
 * /shows:
 *   post:
 *     summary: Create a new show
 *     description: Create a new show
 *     tags:
 *       - Show
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Show'
 *     responses:
 *       200:
 *         description: The created show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 */
router.post('/', showController.createShow);

/**
 * @swagger
 * /shows:
 *   get:
 *     summary: Retrieve a list of shows
 *     description: Retrieve a list of shows from the database
 *     tags:
 *       - Show
 *     responses:
 *       200:
 *         description: A list of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */
router.get('/', showController.getAllShows);

/**
 * @swagger
 * /shows/movie/{id}:
 *   get:
 *     summary: Get all shows for a specific movie
 *     description: Retrieve all shows for a movie by its ID
 *     tags:
 *       - Show
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of shows for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */
router.get('/movie/:id', showController.getShowsByMovieId);

/**
 * @swagger
 * /shows/{id}:
 *   get:
 *     summary: Get a specific show
 *     description: Retrieve a show by its ID
 *     tags:
 *       - Show
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the show to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       404:
 *         description: Show not found
 */
router.get('/:id', showController.getShow);

/**
 * @swagger
 * /shows/{id}:
 *   patch:
 *     summary: Update a show
 *     description: Update a show's details by its ID
 *     tags:
 *       - Show
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the show to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Show'
 *     responses:
 *       200:
 *         description: The updated show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       404:
 *         description: Show not found
 */
router.patch('/:id', showController.updateShow);

/**
 * @swagger
 * /shows/{id}:
 *   delete:
 *     summary: Delete a show
 *     description: Delete a show by its ID
 *     tags:
 *       - Show
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the show to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Show deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Show not found
 */
router.delete('/:id', showController.deleteShow);

module.exports = router;