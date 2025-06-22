import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import VehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import stickerRoutes from './routes/stickerRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
connectDB();

const app = express(); // Move this above app.get

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend port (React + Vite)
  credentials: true
}));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sticker", stickerRoutes);
app.use('/api/gallery', galleryRoutes);
// app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});