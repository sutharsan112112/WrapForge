import express from 'express';
import {isAuthenticated, isAdmin, protect} from '../middleware/contactMiddleware.js';
import { sendMessage, getAllMessages, replyToMessage, updateContactMessage } from '../controllers /contactController.js';

const router = express.Router();

router.post('/', isAuthenticated, sendMessage); // user/partner send
router.get('/', isAuthenticated, isAdmin, getAllMessages); // admin see all
router.post('/:id/reply', isAuthenticated, isAdmin, replyToMessage); // admin reply
router.put("/:id", protect, updateContactMessage); // user/partner update own message

export default router;