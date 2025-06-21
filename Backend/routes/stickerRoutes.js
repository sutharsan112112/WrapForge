import express from 'express';
import {
  createSticker,
  getAllStickers,
  updateSticker,
  deleteSticker
} from '../controllers /stickerController.js';
import { protect, isAdminOrPartner } from '../middleware/stickerMiddleware.js'
const router = express.Router();

router.post('/', protect, isAdminOrPartner, createSticker);
router.get('/', protect, getAllStickers);
router.put('/:id', protect, isAdminOrPartner, updateSticker);
router.delete('/:id', protect, isAdminOrPartner, deleteSticker);

export default router;
