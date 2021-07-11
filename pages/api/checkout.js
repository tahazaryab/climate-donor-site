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

const stripe = new Stripe("sk_test_51IxaV3F5vfOiEA1nxEZHYk3rlQmsL9f5mukXgeRZWVW4oigLXK965RsVKSkuy4GrqFGZ1TkfqLUpSZSpntttU60100grQJJyep");

export default  async (req, res) => {
    await runMiddleware(req, res, cors)
    // const body = JSON.parse(req.body)

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
      mode: 'payment',
      success_url: 'https://localhost:3000/dashboard',
      cancel_url: 'https://localhost:3000/dashboard',
    });
  
    res.json({ id: session.id });
  }