import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import VehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import stickerRoutes from './routes/stickerRoutes.js';

dotenv.config();
connectDB();

const app = express(); // Move this above app.get

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/vehicles', VehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/contact", contactRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use("/api/sticker", stickerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});