import express from 'express';
import PaymentController from '../controllers /paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', authMiddleware, PaymentController.createCheckoutSession);

export default router;