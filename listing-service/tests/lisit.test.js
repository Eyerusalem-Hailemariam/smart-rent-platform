require('dotenv').config();
jest.setTimeout(20000);

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Listing = require('../models/listing.model');

let created_list;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});
beforeEach(async () => {
    await Listing.deleteMany({});
    
    const listing = await Listing.create({
        title: 'Test Listing',
        type: 'home',
        description: 'This is a test listing',
        price: 100,
        location: 'Test Location',
        image: 'http://example.com/image.jpg',
        ownerId: '60c72b2f9b1d4c001c8e4f1a'
    });

    created_list = listing._id;
});
describe('Listing API', () => {
    it('should create a listing', async () => {
        const res = await request(app)
            .post('/api/listings/')
            .send({
                title: 'Another Listing',
                type: 'car',
                description: 'Another test listing',
                price: 120,
                location: 'Addis Ababa',
                image: 'http://example.com/car.jpg',
                ownerId: '60c72b2f9b1d4c001c8e4f1a'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('listing');
        expect(res.body.listing).toHaveProperty('_id');
    });

    it('should get all listing', async () => {
        console.log('Created listing ID:', created_list);
        const res = await request(app)
            .get('/api/listings/');
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('title');
    });

    it('should get filtered listings', async () => {
        const res = await request(app)
            .get('/api/listings?type=home&location=Test%20Location&minprice=50&maxprice=150');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('type', 'home');

    });

    it('should update a listing', async () => {
        const res = await request(app)
            .put(`/api/listings/${created_list}`)
            .send({
                title: 'Updated Listing',
                type: 'home',
                description: 'This is an updated test listing',
                price: 150,
                location: 'Updated Location',
                image: 'http://example.com/updated_image.jpg',
                ownerId: '60c72b2f9b1d4c001c8e4f1a'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('listing');
        expect(res.body.listing).toHaveProperty('title', 'Updated Listing');
    });

    it('should delete a listing', async () => {
        const res = await request(app)
            .delete(`/api/listings/${created_list}`)
            .send({ ownerId: '60c72b2f9b1d4c001c8e4f1a' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Listing deleted successfully');
    });
});
