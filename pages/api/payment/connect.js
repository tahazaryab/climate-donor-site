import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    try {
      const account = await stripe.accounts.create({type: "standard"});
      req.session.accountID = account.id;
  
      const origin = `${req.headers.origin}`;
      const accountLinkURL = await generateAccountLink(account.id, origin);
      res.send({ url: accountLinkURL });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err.message,
      });
    }
  }


function generateAccountLink(accountID, origin) {
    return stripe.accountLinks
      .create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `https://github.com/`,
        return_url: `https://github.com/`,
      })
      .then((link) => link.url);
}