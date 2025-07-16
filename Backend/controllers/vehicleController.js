import Vehicle from '../models/Vehicle.js';
import Sticker from '../models/Sticker.js';


// Create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { name, model, year } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newVehicle = new Vehicle({ name, model, year, image });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle' });
  }

};


// Get all vehicles
// export const getAllVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find().select('name model');
//     res.status(200).json(vehicles);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch vehicles' });
//   }
// };
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().select('name model image');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};


// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.vehicleId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};


// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.vehicleId);
    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};