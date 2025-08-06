require('dotenv').config();
jest.setTimeout(20000); 

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user.model');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth API', () => {
    
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'tesser', email: 'te@example.com', password: '123456' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email');
    });

    it('should login a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: '123456' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: '123456' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toHaveProperty('_id');
        expect(res.body.user).toHaveProperty('email');
        expect(res.body.user).toHaveProperty('token');
    });
});
