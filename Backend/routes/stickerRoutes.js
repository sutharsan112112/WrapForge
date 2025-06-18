import express from 'express';
import {
  createSticker,
  getStickers,
  updateSticker,
  deleteSticker
} from '../controllers /stickerController.js';
import { authmiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin or partner can access these
router.post('/', authmiddleware, createSticker);
router.get('/', authmiddleware, getStickers);
router.put('/:id', authmiddleware, updateSticker);
router.delete('/:id', authmiddleware, deleteSticker);

export default router;