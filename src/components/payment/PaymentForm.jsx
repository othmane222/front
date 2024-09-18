import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css'; // Create this CSS file for custom styles

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#32325d',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#e5424d',
      color: '#e5424d',
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: 1000, // amount in cents
          id,
        });

        if (response.data.success) {
          console.log('Payment successful');
          setSuccess(true);
        } else {
          console.log('Payment failed');
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        console.log('Payment failed:', error);
        setError('Payment failed. Please try again.');
      }
    } else {
      console.log('Payment failed:', error.message);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="payment-form-container">
      {!success ? (
        <form onSubmit={handleSubmit} className="payment-form">
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          {error && <div className="payment-error">{error}</div>}
          <button disabled={loading} className="pay-button">
            {loading ? 'Processing...' : 'Pay $10.00'}
          </button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Thank you for your payment!</h2>
          <p>Your transaction was successful.</p>
        </div>
      )}
    </div>
  );
}
