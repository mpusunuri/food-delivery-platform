const request = require('supertest');
const app = require('./index');

describe('API Tests', () => {
    test('GET /health should return OK', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('OK');
        expect(response.body.service).toBe('food-delivery-backend');
    });
});
