import Customization from '../models/customization.js';

export const createCustomization = async (req, res) => {
  try {
    const { vehicleId, stickers } = req.body;

    const customization = new Customization({ vehicleId, stickers });
    await customization.save();

    res.status(201).json(customization);
  } catch (err) {
    console.error('Customization Save Error:', err);
    res.status(500).json({ error: 'Failed to save customization' });
  }
};

export const getCustomizationByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const customization = await Customization.findOne({ vehicleId });

    if (!customization) {
      return res.status(404).json({ message: 'No customization found for this vehicle' });
    }

    res.status(200).json(customization);
  } catch (err) {
    console.error('Fetch Customization Error:', err);
    res.status(500).json({ error: 'Failed to fetch customization' });
  }
};