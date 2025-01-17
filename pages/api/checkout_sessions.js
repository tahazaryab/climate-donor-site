const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const value = JSON.parse(req.body);
      let name = "";
      if("donator" in value){
        name = value.donator;
      } else{
        name = "Anonymous";
      }
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            name: value.project_title,
            amount: 100 * value.donation,
            currency: "USD",
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          'name' : name,
          'project_id' : value.project_id,
          'project_title' : value.project_title,
          'email' : value.email
        },
        payment_intent_data:
          {
            receipt_email: value.email,
            metadata: {
              'name' : name,
              'project_id' : value.project_id,
              'project_title' : value.project_title,
              'email' : value.email
            },
          },
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