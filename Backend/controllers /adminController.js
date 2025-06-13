// routes/adminRoutes.js
import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dummy DB
const items = [];

router.get('/items', isAuthenticated, isAdmin, (req, res) => {
    res.json({ items });
});

router.post('/items', isAuthenticated, isAdmin, (req, res) => {
    const item = { id: items.length + 1, ...req.body };
    items.push(item);
    res.status(201).json({ message: 'Item created', item });
});

router.put('/items/:id', isAuthenticated, isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    items[index] = { ...items[index], ...req.body };
    res.json({ message: 'Item updated', item: items[index] });
});

router.delete('/items/:id', isAuthenticated, isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
});

export default router;