const request = require('supertest');
const app = require('./index');

describe('Backend API Tests', () => {
    // ========================================
    // HEALTH CHECK TESTS
    // ========================================
    describe('Health Check', () => {
        test('GET /health should return OK status', async () => {
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body.service).toBe('food-delivery-backend');
            expect(response.body.timestamp).toBeDefined();
        });
    });

    // ========================================
    // DATABASE TESTS
    // ========================================
    describe('Database Connection', () => {
        test('GET /db-test should return connection status', async () => {
            const response = await request(app).get('/db-test');
            expect(response.statusCode).toBe(200);
            expect(response.body.db_status).toBeDefined();
        });
    });

    // ========================================
    // ERROR HANDLING TESTS
    // ========================================
    describe('Error Handling', () => {
        test('GET /nonexistent should return 404', async () => {
            const response = await request(app).get('/nonexistent');
            expect(response.statusCode).toBe(404);
        });
    });
});