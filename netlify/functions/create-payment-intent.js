require("dotenv").config(); //import env and configure it with our environment variables

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //import stripe and give it our secret key from the env

exports.handler = async (event) => {
  console.log("event path:::::: ", event.path);
  let paymentIntent;
  try {
    const { amount } = JSON.parse(event.body);

    paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
  } catch (error) {
    console.log("Serverless function error::::::::::::::::::::: ", error);
    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ paymentIntent }),
  };
};
