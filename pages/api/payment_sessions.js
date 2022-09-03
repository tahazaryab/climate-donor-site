import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      const val = req.body;
      console.log(val);

      // retrieve stripe price id from firebase
      const db = firebase.firestore();
      const projectRef = firebase.firestore().collection("projects").doc(val.projectId);
      const snapshot = await projectRef.get();
    
      if (snapshot.exists) {
        console.log(snapshot.data());
      } else {
        console.log("project not found")
      }

      const stripe_id = snapshot.data().stripe_price_id;
      console.log(stripe_id);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: stripe_id,
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: {
          metadata: {
            projectId: val.projectId,
          },
        },

        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?cancelled=true`,
      });

      res.redirect(303, session.url);

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}