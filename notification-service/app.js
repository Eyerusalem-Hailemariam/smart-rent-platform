const express = require('express');
const notificationRoutes = require('./routes/notifications.routes.js');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

module.exports = app;