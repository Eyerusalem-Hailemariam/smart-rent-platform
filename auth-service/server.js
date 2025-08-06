import app from './app.js';
import mongoosed from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

mongoose.conect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Auth service is running on port ${PORT}`);
    })
}).catch((error) => {
    console.error('MongoDB connection error:', error);
})