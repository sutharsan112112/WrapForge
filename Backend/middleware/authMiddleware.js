import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Admins only' });
};

export const verifyStripePayment = async (req, res, next) => {
  const { paymentIntentId } = req.body;
  try {
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
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now you can access req.user._id and req.user.email
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};


// export const isUser = (req, res, next) => {
//   if (req.user.role === 'user' || req.user.role === 'partner') {
//     next();
//   } else {
//     return res.status(403).json({ message: 'Access denied: User/Partner only' });
//   }
// };
