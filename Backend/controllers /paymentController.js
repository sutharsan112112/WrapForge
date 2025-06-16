import Stripe from 'stripe';
import Payment from '../models/payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentController {
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
              unit_amount: amount * 100, // converting to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: userEmail,
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      // ✅ Save payment record in MongoDB
      await Payment.create({
        userId: req.user._id,
        email: userEmail,
        amount,
        // stripeSessionId: session.id,
        // paymentStatus: 'pending',
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PaymentController;