import { buffer } from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Must set bodyParser to false since Stripe requires the raw request body
export const config = {
    api: {
      bodyParser: false,
    },
  };  

const handler = async (req, res) => {

    if (req.method === "POST") {

      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"];
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      console.log('✅ Successful Event', event.id);
  
      res.json({ received: true });
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
  
  export default handler;