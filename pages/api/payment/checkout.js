import Stripe from "stripe";
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
  })
  
  // Helper method to wait for a middleware to execute before continuing
  // And to throw an error when an error happens in a middleware
  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default  async (req, res) => {
    await runMiddleware(req, res, cors)
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.name,
              },
              unit_amount: req.body.amount * 100 + 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          projectId: req.body.id,
          projectName: req.body.name, 
          amount: req.body.amount,
        },
        mode: 'payment',
        success_url: `${req.headers.origin}/payment/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
    
      res.json({ id: session.id });
    }catch(e){
      return res.status(500).json({ error: e })
    }
  }