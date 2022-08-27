import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import PaymentForm from "./payment-form.component";

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const amount = useSelector(selectCartTotal);

  // function that calls the backend with payment info
  const makeStripePayment = async () => {
    console.log("getting client secret...");
    try {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
          }),
        }
      ).then((res) => {
        console.log(res);
        return res.json();
      });

      const {
        paymentIntent: { client_secret },
      } = response;

      console.log("client_secret ", client_secret);
      setClientSecret(client_secret);
    } catch (error) {
      console.error("error in getting client secret ", error);
    }
  };

  useEffect(() => {
    makeStripePayment();
  }, []);
  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    )
  );
};

export default StripePayment;
