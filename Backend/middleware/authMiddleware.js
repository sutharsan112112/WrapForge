import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Stripe from 'stripe';


// 🔐 Protect route: verifies JWT token and loads user info
// middleware/authMiddleware.js

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (req.user && (req.user.role === 'admin' || req.user.role === 'partner')) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied: Only admin or partner allowed' });
      }

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// 🛡️ Admin only access
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admins only.' });
};

// 👥 User or Partner only access
export const isUserOrPartner = (req, res, next) => {
  const { role } = req.user || {};
  if (role === 'user' || role === 'partner') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Users or Partners only.' });
};

// 💳 Stripe payment verification middleware (optional)
export const verifyStripePayment = async (req, res, next) => {
  const { paymentIntentId } = req.body;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      req.payment = paymentIntent;
      return next();
    } else {
      return res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🟩 Set correct JWT_SECRET in .env
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};