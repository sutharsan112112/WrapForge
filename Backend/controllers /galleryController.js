import Gallery from '../models/Gallery.js';

export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};
