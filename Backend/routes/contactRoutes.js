import express from 'express';
import {isAuthenticated, isAdmin, protect} from '../middleware/contactMiddleware.js';
import { sendMessage, getAllMessages, replyToMessage, updateContactMessage, deleteContactMessage} from '../controllers /contactController.js';

const router = express.Router();

// Example protected contact route
router.post('/contact', isAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;

  return res.json({ message: 'Message received from user: ' + userId });
});


router.post('/', isAuthenticated, sendMessage);

router.get('/', isAuthenticated, isAdmin, getAllMessages); // admin see all
router.post('/:id/reply', isAuthenticated, isAdmin, replyToMessage); 
router.put("/:id", protect, updateContactMessage); 
router.delete('/:id', protect, deleteContactMessage);

export default router;