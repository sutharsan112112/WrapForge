import Sticker from '../models/Sticker.js';

// Create sticker
export const createSticker = async (req, res) => {
  try {
    const { name, design, imageUrl } = req.body;
    const newSticker = new Sticker({ name, design, imageUrl });
    await newSticker.save();
    res.status(201).json({ message: 'Sticker created successfully', sticker: newSticker });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sticker', error });
  }
};

// Get all stickers
export const getAllStickers = async (req, res) => {
  try {
    const stickers = await Sticker.find();
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stickers', error });
  }
};

// Update sticker
export const updateSticker = async (req, res) => {
  try {
    const updatedSticker = await Sticker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSticker) {
      return res.status(404).json({ message: 'Sticker not found' });
    }
    res.status(200).json({ message: 'Sticker updated', sticker: updatedSticker });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update sticker', error });
  }
};

// Delete sticker
export const deleteSticker = async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);
    if (!deletedSticker) {
      return res.status(404).json({ message: 'Sticker not found' });
    }
    res.status(200).json({ message: 'Sticker deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sticker', error });
  }
};