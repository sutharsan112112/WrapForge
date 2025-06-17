import Sticker from '../models/Sticker.js';

// Create Sticker
export const createSticker = async (req, res) => {
  res.send('createSticker');
  try {
    const { name, design, vehicleType, price } = req.body;

    const newSticker = new Sticker({ name, design, vehicleType, price });
    await newSticker.save();

    res.status(201).json(newSticker);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sticker' });
  }
};

// Get All Stickers
export const getStickers = async (req, res) => {
  res.send('getStickers');
  try {
    const stickers = await Sticker.find();
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stickers' });
  }
};

// Update Sticker
export const updateSticker = async (req, res) => {
  res.send('updateSticker');
  try {
    const { id } = req.params;
    const updated = await Sticker.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: 'Sticker not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update sticker' });
  }
};

// Delete Sticker
export const deleteSticker = async (req, res) => {
  res.send('deleteSticker');
  try {
    const { id } = req.params;
    const deleted = await Sticker.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Sticker not found' });

    res.status(200).json({ message: 'Sticker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sticker' });
  }
};