import Sticker from '../models/Sticker.js';
import Vehicle from '../models/Vehicle.js';

// Get all stickers
export const getAllStickers = async (req, res) => {
  try {
    const stickers = await Sticker.find().populate('vehicle', 'name model');
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stickers' });
  }
};

// Create a new sticker
export const createSticker = async (req, res) => {
  try {
    const { name, position, imageUrl, vehicle } = req.body;

    const newSticker = new Sticker({ name, position, imageUrl, vehicle });
    await newSticker.save();

    res.status(201).json(newSticker);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create sticker' });
  }
};

// Update a sticker
export const updateSticker = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSticker = await Sticker.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSticker) return res.status(404).json({ error: 'Sticker not found' });

    res.status(200).json(updatedSticker);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update sticker' });
  }
};

// Delete a sticker
export const deleteSticker = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sticker.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Sticker not found' });

    res.status(200).json({ message: 'Sticker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sticker' });
  }
};