const isAdmin = (req, res, next) => {
    try {
        // Example: req.user is set by your auth middleware (after verifying JWT)
        if (req.user && req.user.isAdmin) {
            next(); // User is admin → proceed to controller
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
 
    } catch (error) {
        res.status(500).json({ error: 'Server error in admin middleware.' });
    }
};

export default isAdmin;