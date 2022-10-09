const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
let stripe=require("stripe")
stripe="sk_test_51LqrtKSDl8Bf4BRHVcVxkIVLr28ymqKKjeOMiBTMAxQIO3CglulNfum3x6o8BwpeUbC8bvUGGZduTaxsDN1zIlR200CqpnOYKP";
const app = express();
// - Middlewares
console.log("hello");
console.log(stripe);
// eslint-disable-next-line object-curly-spacing
app.use(cors());
app.use(express.json());
app.post("/payments/create",async(req, res)=>{
    const total = req.query.total;
    console.log("amount ", total);
    const paymentIntent = await stripe.PaymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
exports.api = functions.https.onRequest(app);
// http://localhost:5001/react-http-90296/us-central1/api
