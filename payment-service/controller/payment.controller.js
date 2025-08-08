//paymentcontroller
const Payment = require('../models/payment.model');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async(req, res) => {

    const {amount, currency = 'usd', userId} = req.body;

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


module.exports = {
    createPayment,
    getPayment
};