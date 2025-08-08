const Payment = require('../models/payment.model');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


const createPayment = async(req, res) => {

    const {amount, currency = 'usd'} = req.body;

    try{
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata : {userId},
      });

      const payment = new Payment({
        userId, 
        amount,
        currency,
        paymentIntentId : paymentIntent.id,
        status : paymentIntent.status,
      });

      await payment.save();

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment._id,
       });
    }catch(err){
        console.error('Error creating payment:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
} 

const getPayment = async(req, res) => {
    try{
        const payment  = await Payment.findById(req.params.id);
       if (!payment) {
           return res.status(404).json({ message: 'Payment not found' });
       }
       res.status(200).json(payment);
    }catch(err){
        console.error('Error fetching payment:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleWebhook =  async(req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    }catch(err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if(event.type === 'payment_intent.succeeded'){
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent.id);

        Payment.findOneAndUpdate(
            {paymentIntentId: paymentIntent.id},
            { status : 'succeeded'}
        ).exec();
    }
    else if(event.type === 'payment_intent.payment_failed'){
        const paymentIntent = event.data.object;

        console.log('PaymentIntnet failed:', paymentIntent.id);

        Payment.findOneAndUpdate(
            { paymentIntentId: paymentIntent.id },
            { status: 'failed' }
        ).exec();
    }

    res.json({ received: true});
}



module.exports = {
    createPayment,
    getPayment,
    handleWebhook
};