const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config(); 

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Auth service is running on http://localhost:${PORT}/api/auth/register`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
