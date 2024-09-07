const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @swagger
 * /api/analytics/popular-routes:
 *   get:
 *     summary: Get popular routes
 *     description: Retrieve a list of popular routes
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/html:
 *             example: <table><tr><th>Route</th><th>Count</th></tr><tr><td>/movies</td><td>100</td></tr><tr><td>/bookings</td><td>75</td></tr></table>
 */
router.get('/popular-routes', analyticsController.getPopularRoutes);

/**
 * @swagger
 * /api/analytics/ip-requests:
 *   get:
 *     summary: Get IP requests
 *     description: Retrieve a list of IP requests
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/html:
             example: <table><tr><th>IP</th><th>Count</th></tr><tr><td>192.168.1.1</td><td>50</td></tr><tr><td>10.0.0.1</td><td>30</td></tr></table>
 */
router.get('/ip-requests', analyticsController.getIPRequests);

/**
 * @swagger
 * /api/analytics/real-time-logs:
 *   get:
 *     summary: Get real-time logs
 *     description: Retrieve real-time logs
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/html:
             example: <h1>Real-time Logs</h1><ul><li>127.0.0.1 - - [01/May/2023:10:30:00 +0000] "GET /api/v1/movies HTTP/1.1" 200 1234</li><li>192.168.1.2 - - [01/May/2023:10:31:15 +0000] "POST /api/v1/shows HTTP/1.1" 201 567</li></ul>
 */
router.get('/real-time-logs', analyticsController.getRealTimeLogs);

module.exports = router;