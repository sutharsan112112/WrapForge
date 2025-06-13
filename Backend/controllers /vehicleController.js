import Vehicle from '../models/Vehicle.js';
import Sticker from '../models/Sticker.js';

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().select('name model');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

// Get stickers for vehicle
export const getStickers = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const stickers = await Sticker.find({ vehicle: vehicleId });
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stickers' });
  }
};
