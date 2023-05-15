import React, { useState, useEffect } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [errorMessage, setErrorMessage] = useState(null);

    const stripe_public_key =  process.env.Stripe_Public;
    
    const handleSubmit = async (event) => {

    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button type="submit" disabled={!stripe || !elements}>  Pay </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </Elements>
    )
}

export default StripePaymentForm