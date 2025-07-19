import express from 'express';
import {
  createCustomization,
  getCustomizationByVehicleId ,
  getAllCustomizations// ✅ missing import added here
} from '../controllers/customizationController.js';

const router = express.Router();

router.post('/', createCustomization);
router.get('/:vehicleId', getCustomizationByVehicleId);
router.get('/', getAllCustomizations); 
export default router;