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
import { Box, Button, CircularProgress, Container } from "@mui/material";
import { Payment } from "@mui/icons-material";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import SuccessfulPayment from "../../routes/checkout/successful-payment.route";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) return;
  });

  const [isMakingPayment, setIsMakingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const existingHistoryProducts = useSelector(selectHistoryBoughtItems);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsMakingPayment(true);

    const paymentResult = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (paymentResult.error) {
      console.error("error in submitting payment ", paymentResult.error);
      setIsMakingPayment(false);
      alert("Error ", paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        setIsMakingPayment(false);
        dispatch(
          saveCurrentCartToHistory(cartProducts, existingHistoryProducts)
        );
        dispatch(clearCart());
        navigate("../success");
      }
    }
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
        <Button type="submit">
          {isMakingPayment ? <CircularProgress /> : "Pay now"}
        </Button>
      </form>
    </Container>
  );
};

export default PaymentForm;
