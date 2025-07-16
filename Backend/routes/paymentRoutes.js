import express from 'express';
import { createPaymentIntent, getPaymentById, updatePaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

// POST: Create Payment Intent
router.post('/create-payment-intent', createPaymentIntent);

// GET: Get a payment by ID
router.get('/:id', getPaymentById);

// PUT: Update Payment Status
router.put('/:id', updatePaymentStatus);

export default router;
