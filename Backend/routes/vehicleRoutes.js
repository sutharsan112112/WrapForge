import express from 'express';
import { getAllVehicles, getStickers } from '../controllers /vehicleController.js';

import { VehicleIdmiddleware } from '../middleware/vehiclemiddleware.js';

const router = express.Router();

// Route to fetch all vehicles
router.get('/', getAllVehicles);

// Route to fetch stickers for a specific vehicle
router.get('/:vehicleId/stickers', VehicleIdmiddleware, getStickers);

export default router;