import express from 'express';
import { 
    getAllServices, 
    createService, 
    updateService, 
    deleteService 
} from '../controllers/serviceController.js';
import isAdminOrPartner from '../middleware/serviceMiddleware.js';
import upload from '../middleware/multerMiddleware.js'; // Multer config

const router = express.Router();

// Public route to fetch services
router.get('/', getAllServices);

// Protected routes
router.post('/', isAdminOrPartner, upload.single('image'), createService);
router.put('/:id', isAdminOrPartner, upload.single('image'), updateService);
router.delete('/:id', isAdminOrPartner, deleteService);

export default router;