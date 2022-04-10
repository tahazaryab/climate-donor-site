const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
      console.log(req.body)
    try {
      const value = JSON.parse(req.body);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            name: "Climate Donor",
            amount: 100 * value.donation,
            currency: "USD",
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/project/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/project/${value.project_id}`, // canceled should go back to project page
      });
      // res.redirect(303, session);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}