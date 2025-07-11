import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import VehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import stickerRoutes from './routes/stickerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
import path from 'path';

dotenv.config();
connectDB();

const app = express(); // Move this above app.get
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json()); 
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sticker", stickerRoutes);
app.use('/api/service', serviceRoutes);
// app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});