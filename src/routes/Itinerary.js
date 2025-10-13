import express from "express";
import {
  createItinerary,
  getItineraries,
  getItinerary,
  updateItinerary,
  deleteItinerary,
} from "../controllers/itineraryController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { cache } from "../middleware/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /itineraries:
 *   post:
 *     summary: Create a new itinerary
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itinerary'
 *     responses:
 *       201:
 *         description: Itinerary created successfully
 */
router.post("/", protect, createItinerary);

/**
 * @swagger
 * /itineraries:
 *   get:
 *     summary: Get all itineraries
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of itineraries
 */
router.get("/", protect, getItineraries);

/**
 * @swagger
 * /itineraries/{id}:
 *   get:
 *     summary: Get a single itinerary by ID
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Itinerary found
 *       404:
 *         description: Itinerary not found
 */
router.get("/:id", protect, getItinerary);

/**
 * @swagger
 * /itineraries/{id}:
 *   put:
 *     summary: Update an itinerary by ID
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itinerary'
 *     responses:
 *       200:
 *         description: Itinerary updated successfully
 *       404:
 *         description: Itinerary not found
 */
router.put("/:id", protect, updateItinerary);

/**
 * @swagger
 * /itineraries/{id}:
 *   delete:
 *     summary: Delete an itinerary by ID
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Itinerary deleted successfully
 *       404:
 *         description: Itinerary not found
 */
router.delete("/:id", protect, deleteItinerary);

/**
 * @swagger
 * /itineraries/check/all:
 *   get:
 *     summary: Get all itineraries checking
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of itineraries
 */
router.get("/check/all", protect, getItineraries);

export default router;
