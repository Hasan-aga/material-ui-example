import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import {
  selectCartProducts,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cart/cart-action";
import { saveCurrentCartToHistory } from "../../store/history/history.actions";
import { useNavigate } from "react-router-dom";
import { selectHistoryBoughtItems } from "../../store/history/history.selector";
import { Checkmark } from "react-checkmark";
import { Box, Button, Container } from "@mui/material";
import { Payment } from "@mui/icons-material";
import { stripePromise } from "../../utils/stripe/stripe.utils";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!stripe) return;
  });

  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const [isMakingPayment, setIsMakingPayment] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const existingHistoryProducts = useSelector(selectHistoryBoughtItems);
  const navigateTo = useNavigate();

  // function that calls the backend with payment info
  const makeStripePayment = async (amount = 0) => {
    setIsMakingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    setClientSecret(client_secret);
  };

  //get clientSecret from serverless function backend
  useEffect(() => {
    makeStripePayment();
  }, []);

  const paymentHandler = async (e) => {
    console.log("handliiiiiiiiiiiiiiiiiiing");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    makeStripePayment(amount);

    const paymentResult = await stripe.confirmCardPayment(
      clientSecret,
      PaymentElement
    );

    if (paymentResult.error) {
      console.error("error in submitting payment ", paymentResult.error);
      setIsMakingPayment(false);
      alert("Error ", paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        setIsMakingPayment(false);
        setIsPaymentSuccessful(true);
        alert("Payment Successful");
        dispatch(
          saveCurrentCartToHistory(cartProducts, existingHistoryProducts)
        );
        dispatch(clearCart());
      }
    }
  };

  const navigateToGreet = () => {
    setTimeout(() => {
      navigateTo("/greet");
    }, 1000);
  };

  return (
    <Container>
      <form
        style={{
          minWidth: "200px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginBottom: "30px",
        }}
        onSubmit={paymentHandler}
      >
        <h2>Credit card payment:</h2>
        <PaymentElement id="payment-element" />
        <Button type="submit">Pay now</Button>
      </form>
    </Container>
  );
};

export default PaymentForm;
