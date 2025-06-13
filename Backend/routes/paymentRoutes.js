import express from 'express';
import { verifylogin } from '../middleware/paymentMiddleware';
import { handlePayment } from './controller/paymentController.js';

   const router = express.Router();

   router.post('/', verifylogin, hendlepayment);

   export default router;