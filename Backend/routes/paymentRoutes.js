import express from 'express';
import PaymentController from '../controllers/paymentController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, isAdmin, PaymentController.createCheckoutSession);
router.get('/', protect, isAdmin, PaymentController.getAllPayments);
router.put('/:id', protect, isAdmin, PaymentController.updatePaymentStatus);
router.delete('/:id', protect, isAdmin, PaymentController.deletePayment);

export default router;