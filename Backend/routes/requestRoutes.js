// routes/requestRoutes.js
import express from 'express';
import { createRequest, getRequestsForPartner } from '../controllers/requestController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// User sends a request to a partner
router.post('/send', verifyToken, createRequest);

// Partner fetches requests sent to them
router.get('/partner', verifyToken, getRequestsForPartner);

export default router;
