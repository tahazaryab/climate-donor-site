import firebase from "firebase/app";
import { addStripeId } from "../../../lib/firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

    if (req.method === 'POST') {
       
    const val = JSON.parse(req.body);
    console.log(val);
    
      try {

        // creating stripe product
        const price = await stripe.prices.create({
          currency: "usd",
          custom_unit_amount: {
            enabled: true, // allowing donor to custom select donation amount
          },
          product_data: {
            name: val.title,
          },
        });

        addStripeId(val.projectId, price["id"]);

        res.redirect("/");
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }