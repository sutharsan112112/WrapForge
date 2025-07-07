import express from 'express';
import  isAdmin  from '../middleware/adminMiddleware.js';
import {
  getItems, createItem, updateItem, deleteItem,
  getUsers, updateUser, deleteUser,
  getPartners, updatePartner, deletePartner
} from '../controllers /adminController.js'
const router = express.Router();
0
// Item routes
router.get('/items', isAdmin, getItems);
router.post('/items', isAdmin, createItem);
router.put('/items/:id', isAdmin, updateItem);
router.delete('/items/:id', isAdmin, deleteItem);

// User routes
router.get('/users', isAdmin, getUsers);
router.put('/users/:id', isAdmin, updateUser);
router.delete('/users/:id', isAdmin, deleteUser);

// Partner routes
router.get('/partners', isAdmin, getPartners);
router.put('/partners/:id', isAdmin, updatePartner);
router.delete('/partners/:id', isAdmin, deletePartner);

export default router;