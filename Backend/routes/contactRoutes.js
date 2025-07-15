import express from 'express';
import {protect, isAdmin} from '../middleware/contactMiddleware.js';
import { sendMessage, getAllMessages, replyToMessage, updateContactMessage, deleteContactMessage} from '../controllers /contactController.js';

const router = express.Router();

// // Example protected contact route
// router.post('/contact', isAuthenticated, (req, res) => {
//   const userId = req.user.id;
//   const { message } = req.body;

//   return res.json({ message: 'Message received from user: ' + userId });
// });


router.post('/', protect, sendMessage); // Only authenticated users can send messages

// // Protect routes with isAuthenticated middleware
// router.post('/', protect, sendMessage); // Send message route
// router.get('/',  getAllMessages); // Get all messages for admin
// router.put('/:id',  updateContactMessage); // Update contact message
// router.delete('/:id',  deleteContactMessage); // Delete contact message


export default router;