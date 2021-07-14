import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
          req.body.id
        );
        res.json({session: session})
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err.message,
      });
    }
  }
