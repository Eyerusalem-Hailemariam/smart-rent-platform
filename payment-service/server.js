const app  = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config(); 

const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Payment service is running on http://localhost:${PORT}/api/payments`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });