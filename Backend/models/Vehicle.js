import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;