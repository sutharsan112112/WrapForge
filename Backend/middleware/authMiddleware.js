import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = await User.findById(decoded.id).select('-password'); // Attach user info to the request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the controller
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' }); // Access denied for non-admin users
  }
};

// Role-based access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

export const userOrPartner = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'partner')) {
    next();
  } else {
    res.status(403).json({ message: 'User or Partner access required' });
  }
};