const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'fooddelivery',
    password: process.env.DB_PASSWORD || 'postgres',
    port: 5432,
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'food-delivery-backend'
    });
});

// Test database connection
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            db_status: 'Connected',
            current_time: result.rows[0].now 
        });
    } catch (err) {
        res.status(500).json({ 
            db_status: 'Error', 
            error: err.message 
        });
    }
});

// Only start server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Backend running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
}

// Export app for testing
module.exports = app;