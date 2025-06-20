import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;