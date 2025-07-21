import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSubscription = async (req, res) => {
  console.log("Subscription route hit");
  try {
    const { email, billingType } = req.body;

    // Create customer
    const customer = await stripe.customers.create({ email });

    const priceId =
      billingType === "monthly"
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_YEARLY_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `https://yourdomain.com/success`,
      cancel_url: `https://yourdomain.com/cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Subscription error:", error.message);
    res.status(500).json({ message: "Subscription failed", error: error.message });
  }
};