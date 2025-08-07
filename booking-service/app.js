const express = require('express');
const bookRoutes = require('./routes/booking.routes');

const app = express();

app.use(express.json());
app.use('/api/bookings', bookRoutes);


module.exports = app;


