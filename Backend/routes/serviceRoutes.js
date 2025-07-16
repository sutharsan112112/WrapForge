// import express from 'express';
// import { 
//     getAllServices, 
//     createService, 
//     updateService, 
//     deleteService 
// } from '../controllers/serviceController.js';
// import isAdminOrPartner from '../middleware/serviceMiddleware.js';
// import { protect } from '../middleware/authMiddleware.js';
// import upload from '../middleware/multerMiddleware.js'; // Multer config

// const router = express.Router();

// // Public route to fetch services
// router.get('/', getAllServices);

// // Protected routes
// router.post('/', protect, isAdminOrPartner, upload.single('image'), createService);
// router.put('/:id', protect, isAdminOrPartner, upload.single('image'), updateService);
// router.delete('/:id', protect, isAdminOrPartner, deleteService);

// export default router;


import express from 'express';
import { 
  getAllServices, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import isAdminOrPartner from '../middleware/serviceMiddleware.js';
import upload from '../middleware/multerMiddleware.js'; // Import multer

const router = express.Router();

// Public route to get all services
router.get('/', getAllServices);

// Protected route to create a service (requires authentication and authorization)
router.post('/', protect, isAdminOrPartner, upload.single('image'), createService); // Use upload.single() for file handling
router.put('/:id', protect, isAdminOrPartner, upload.single('image'), updateService);
router.delete('/:id', protect, isAdminOrPartner, deleteService);

export default router;
