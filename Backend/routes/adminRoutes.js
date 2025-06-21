import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
const router = express.Router();

// Dummy in-memory data
const items = [];

// GET all items (Admin only)
router.get('/items', protect, authorizeRoles('admin'), (req, res) => {
    res.json({ items });
});

// POST create a new item (Admin only)
router.post('/items', protect, authorizeRoles('admin'), (req, res) => {
    const newItem = {
        id: items.length + 1,
        ...req.body
    };
    items.push(newItem);
    res.status(201).json({ message: 'Item created', item: newItem });
});

// PUT update an item (Admin only)
router.put('/items/:id', protect, authorizeRoles('admin'), (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items[index] = {
        ...items[index],
        ...req.body
    };

    res.json({ message: 'Item updated', item: items[index] });
});

// DELETE an item (Admin only)
router.delete('/items/:id', protect, authorizeRoles('admin'), (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
});
// ...existing code...
export default router;