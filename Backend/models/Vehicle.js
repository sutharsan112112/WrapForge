// models/Vehicle.js
import mongoose from 'mongoose';

 class Vehicle {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  stickers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' }]
});

const Vehicles = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;