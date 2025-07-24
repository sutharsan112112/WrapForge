// middleware/contactMiddleware.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get the token part from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    res.status(403).json({ message: 'Admins only' });
};

export const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header contains a Bearer token
  if (req.headers.authorization?.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with JWT_SECRET

      req.user = decoded; // Attach user data to the request
      next(); // Proceed to the next middleware/controller
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};