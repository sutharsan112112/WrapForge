import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ➤ POST request to create a Stripe Checkout session
router.post('/create-checkout-session', protect, createCheckoutSession);

export default router;