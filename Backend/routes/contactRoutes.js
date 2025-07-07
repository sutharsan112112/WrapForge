import express from 'express';
import {isAuthenticated, isAdmin, protect} from '../middleware/contactMiddleware.js';
import { sendMessage, getAllMessages, replyToMessage, updateContactMessage, deleteContactMessage} from '../controllers /contactController.js';

const router = express.Router();

router.post('/contact', isAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;

  // Save or process contact message
  return res.json({ message: 'Message received from user: ' + userId });
}); 
router.get('/', isAuthenticated, isAdmin, getAllMessages); // admin see all
router.post('/:id/reply', isAuthenticated, isAdmin, replyToMessage); // admin reply
router.put("/:id", protect, updateContactMessage); // user/partner update own message
router.delete('/:id', protect, deleteContactMessage);

export default router;