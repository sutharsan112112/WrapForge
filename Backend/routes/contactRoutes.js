import express from 'express';
import {
  getAllMessages,
  replyToMessage,
  updateContactMessage,
  deleteContactMessage,
} from '../controllers/contactController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin - Get all messages
router.get('/', protect, isAdmin, getAllMessages);

// Admin - Reply to message by ID
router.post('/reply/:id', protect, isAdmin, replyToMessage);

// User/Partner - Update their own message
router.put('/:id', protect, updateContactMessage);

// Admin - Delete message by ID
router.delete('/:id', protect, isAdmin, deleteContactMessage);

export default router;
