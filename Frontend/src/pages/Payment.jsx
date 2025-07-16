import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-from-stripe');  // Your Stripe publishable key

const PaymentForm = () => {
  const [amount, setAmount] = useState(10000); // Amount in cents
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Call the backend to create a payment intent
    const { data } = await axios.post('/payment/create-payment-intent', { amount });

    const { clientSecret } = data;

    // 2. Confirm the payment using Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log('Payment failed:', error);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      alert('Payment successful!');
    }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      {paymentSuccess && <p>Payment Successful!</p>}
    </div>
  );
};

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;