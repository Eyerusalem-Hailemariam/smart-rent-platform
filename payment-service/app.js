const express = require('express');
const paymentRoutes = require('./routes/payment.routes');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/payments', paymentRoutes);

module.exports = app;