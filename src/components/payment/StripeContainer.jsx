import React from 'react'
import {element, Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "../payment/PaymentForm"


const PUBLIC_KEY = "pk_test_51PtJLUEP1jVEybu3hagsAPq7HS6p948Lca3WXaCi6AG7Loqn1MF8t2rvAgK58x5WZOrHrSHyuvPJt9OXtKxLE0ia00rwj8X4fp"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function stripecontainer() {
  return (
   <Elements stripe={stripeTestPromise}>
<PaymentForm />


   </Elements>


  )
}
