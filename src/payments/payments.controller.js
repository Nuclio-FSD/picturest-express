const stripe = require('stripe')(process.env.SK_TEST_KEY);

const createIntent = async (req, res) => {
    const intent = await stripe.paymentIntents.create({
      amount: 999,
      currency: 'EUR',
      payment_method_types: ['card'],
    });

    console.log('PaymentIntent created ->', intent);
    res.json({ intent: intent.client_secret });
};

const createCharge = async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 1499,
      currency: 'EUR',
    });

    console.log('Charge created ->', charge);
    res.json(charge);
};

const setupIntent = async (req, res) => {
    const intent = await stripe.setupIntents.create({
        payment_method_types: ['card'],
        description: "Picturest test purchase",
        metadata: {'order_id': '6735'}
      });

    console.log('SetupIntent created ->', intent);
    res.json({ intent: intent.client_secret });
};

const webhook = (req, res) => {
    console.log('Webhook received', req.body);
    res.json({ status: 'success' });
};

module.exports = {
    createIntent,
    createCharge,
    setupIntent,
    webhook
  };
  