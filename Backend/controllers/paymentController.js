import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { productName, description, price } = req.body;
    const userId = req.user._id;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.user.email,
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: {
            name: productName,
            description,
          },
        },
        quantity: 1,
      }],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        userId,
        type: "generic"
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Payment session creation failed", error });
  }
};
