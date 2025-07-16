import Stripe from 'stripe';
import Payment from '../models/payment.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST: Create Payment Intent (For handling payments)
export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;  // amount should be in cents (e.g., $100 = 10000 cents)

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Create a new payment record in MongoDB (Optional)
    const newPayment = new Payment({
      amount: amount / 100, // convert back to dollars for storage
      paymentMethod: 'Credit Card',
      transactionId: paymentIntent.id,
    });

    await newPayment.save();

    // Send the client secret back to the frontend
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating payment intent', error: error.message });
  }
};

// GET: Get Payment by ID (optional)
export const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving payment', error: error.message });
  }
};

// PUT: Update Payment Status (optional)
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status could be 'Completed', 'Failed'

  try {
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    await payment.save();

    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    res.status(400).json({ message: 'Error updating payment', error: error.message });
  }
};