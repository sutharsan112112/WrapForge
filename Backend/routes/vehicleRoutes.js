import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers /vehicleController.js';

import { vehicleMiddleware } from '../middleware/vehiclemiddleware.js'

const router = express.Router();

// GET all vehicles
router.get('/', getAllVehicles);

// GET single vehicle
router.get('/:vehicleId', vehicleMiddleware, getVehicleById);

// POST new vehicle
router.post('/', createVehicle);

// PUT update vehicle
router.put('/:vehicleId', vehicleMiddleware, updateVehicle);

// DELETE vehicle
router.delete('/:vehicleId', vehicleMiddleware, deleteVehicle);

export default router;