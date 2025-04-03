/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51R91gmGgeCXkvRipT9jgwE7a1AWaLzYs6iirVylGhB1gEgRhm4J890hBiHf5wJVKA4Ugue27MpxTu7OzoSxEs40h00kc1djLP4"
);
const CheckoutForm = ({ amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const isCardEmpty = () => {
    if (!elements) return true;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return true;

    return cardElement._empty;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log("PaymentMethod:", paymentMethod);
    if (isCardEmpty()) {
      alert("Please enter your card details");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const amountInCents = Math.round(amount * 100);
      console.log("Sending amount:", amountInCents);

      const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInCents,
        }),
      });

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Payment details are missing.");
        return;
      }

      setProcessing(true);
      setError(null);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const result = await response.json();
      console.log("Success response:", result);

      const { clientSecret } = result;
      if (result) {
        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {},
            },
          });
          console.log("PaymentIntent:", paymentIntent);
        alert("Payment successful! Redirecting to ...");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error("Full error:", err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border-1 border-gray-300  bg-opacity-500 p-6 mt-20 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-white ">Payment Details</h2>
      <h3 className="text-base text-red-500 mb-4">For 1 hour You Pay 1.2$</h3>
      <h4 className="text-base mb-4" > Use this Number Card (stil On the test Mode): 4242424242424242424242</h4>
      <div className="mb-4 ">
        <CardElement
          className="border-2 border-gray-300 rounded-lg p-2"
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "white",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          disabled={true}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const Payment = ({ amount = 10.0, onSuccess, onClose }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onClose={onClose} />
    </Elements>
  );
};

export default Payment;
