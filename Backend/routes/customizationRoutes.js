import express from 'express';
import {
  createCustomization,
  getCustomizationByVehicleId // ✅ missing import added here
} from '../controllers/customizationController.js';

const router = express.Router();

router.post('/', createCustomization);
router.get('/:vehicleId', getCustomizationByVehicleId);

export default router;