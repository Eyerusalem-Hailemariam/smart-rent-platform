import request from 'supertest';
import app from '../app'; 
import mongoose from 'mongoose';
import User from '../models/user.model';

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
        .post('api/auth/register')
        .send({email : 'test@example.com', password: '123456'})

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email');

    })

    it('should login a user', async() => {
        const res = await request(app)
        .post('api/auth/login')
        .send({email : 'test@example.com', password: '123456'})

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('token');

    })
});