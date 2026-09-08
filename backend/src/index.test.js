const request = require('supertest');
const app = require('./index');

describe('Backend API Tests', () => {
    describe('Health Check', () => {
        test('GET /health should return OK status', async () => {
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body.service).toBe('food-delivery-backend');
            expect(response.body.timestamp).toBeDefined();
        });
    });

    describe('Database Connection', () => {
        test('GET /db-test should return connection status (or error)', async () => {
            const response = await request(app).get('/db-test');
            // The endpoint should respond, either with 200 (connected) or 500 (error)
            expect(response.statusCode).toBeDefined();
            // If connected, it should have db_status
            if (response.statusCode === 200) {
                expect(response.body.db_status).toBe('Connected');
                expect(response.body.current_time).toBeDefined();
            } else {
                // If not connected, it should have an error message
                expect(response.statusCode).toBe(500);
                expect(response.body.db_status).toBe('Error');
                expect(response.body.error).toBeDefined();
            }
        });
    });

    describe('Error Handling', () => {
        test('GET /nonexistent should return 404', async () => {
            const response = await request(app).get('/nonexistent');
            expect(response.statusCode).toBe(404);
        });
    });
});