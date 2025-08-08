//to handle api request
const express = require('express');
const notificationRoutes = require('./routes/notifications.route.js');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

module.exports = app;