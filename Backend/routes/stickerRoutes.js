import express from 'express';
import {
  getAllStickers,
  createSticker,
  updateSticker,
  deleteSticker
} from '../controllers/stickerController.js';

import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to get all stickers
router.get('/', getAllStickers);

// Admin-only routes
router.post('/', verifyAdmin, createSticker);
router.put('/:id', verifyAdmin, updateSticker);
router.delete('/:id', verifyAdmin, deleteSticker);

export default router;