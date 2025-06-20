import express from 'express';
import { getAllImages } from '../controllers /galleryController.js';

const router = express.Router();

router.get('/', getAllImages);

export default router;