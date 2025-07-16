import Stripe from 'stripe';
import Payment from '../models/payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentController {
  // Create Stripe checkout session
  static async createCheckoutSession(req, res) {
    try {
      const { amount, userEmail } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'WrapForge App Subscription',
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: userEmail,
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      await Payment.create({
        userId: req.user._id,
        email: userEmail,
        amount,
        stripeSessionId: session.id,
        paymentStatus: 'pending',
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all payments
  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.find().populate('userId', 'name email');
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payments.' });
    }
  }

  // Update payment status
  static async updatePaymentStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const payment = await Payment.findById(id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });

      payment.paymentStatus = status;
      await payment.save();

      res.status(200).json({ message: 'Payment status updated', payment });
    } catch (error) {
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  }

  // Delete a payment
  static async deletePayment(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Payment.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ message: 'Payment not found' });

      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Delete failed', error: error.message });
    }
  }
}

export default PaymentController;