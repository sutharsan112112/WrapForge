import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js'; // ✅ Fixed
import {
  sendMessage,
  getAllMessages,
  replyToMessage,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/contactController.js';

const router = express.Router();

// 📩 Public or protected contact routes
router.get('/', getAllMessages); // GET /api/contact
router.post('/', protect, sendMessage); // POST /api/contact (send message)

// Optional: Uncomment and fix these if needed
// router.put('/:id', updateContactMessage); // PUT /api/contact/:id
// router.delete('/:id', deleteContactMessage); // DELETE /api/contact/:id

export default router;
