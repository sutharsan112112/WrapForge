import mongoose from 'mongoose';

const validateVehicleId = (req, res, next) => {
  const { vehicleId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: 'Invalid vehicle ID' });
  }
  next();
};

const VehicleIdmiddleware = (req, res, next) => {
  const { vehicleId } = req.params;
  if (!vehicleId) {
    return res.status(400).json({ error: 'Vehicle ID is required' });
  }
  
  // Validate the vehicle ID format
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: 'Invalid vehicle ID format' });
  }

  // Proceed to the next middleware or route handler
  next();
};

export { validateVehicleId, VehicleIdmiddleware };