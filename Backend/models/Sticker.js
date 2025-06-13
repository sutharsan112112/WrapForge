import mongoose from 'mongoose';

const stickerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  imageUrl: String,
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
});

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker;