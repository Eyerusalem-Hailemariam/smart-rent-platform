const express = require('express');
const listingRoutes = require('./routes/listing.routes.js');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/api/listings', listingRoutes);

module.exports = app;